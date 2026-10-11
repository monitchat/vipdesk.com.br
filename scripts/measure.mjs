// Medição de laboratório (não substitui dados de campo/CrUX).
// Emula um celular com rede 4G lenta e CPU 4x mais lenta, e coleta LCP, CLS,
// bytes transferidos e erros de console para cada URL informada.
//
// Uso: node scripts/measure.mjs http://localhost:4173/ [outras URLs...]
import { chromium, devices } from '@playwright/test';

const urls = process.argv.slice(2);
if (!urls.length) {
  console.error('Informe ao menos uma URL.');
  process.exit(1);
}

const RUNS = Number(process.env.RUNS || 3);
const median = (xs) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];

const browser = await chromium.launch();
const results = [];
for (const url of urls) {
  const samples = [];
  for (let i = 0; i < RUNS; i++) {
    const context = await browser.newContext({ ...devices['Pixel 7'] });
    const page = await context.newPage();
    const cdp = await context.newCDPSession(page);
    await cdp.send('Network.enable');
    await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
    await cdp.send('Network.emulateNetworkConditions', {
      offline: false,
      latency: 150,
      downloadThroughput: (1.6 * 1024 * 1024) / 8,
      uploadThroughput: (750 * 1024) / 8,
    });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });

    let bytes = 0;
    const failed = [];
    cdp.on('Network.loadingFinished', (e) => { bytes += e.encodedDataLength; });
    page.on('requestfailed', (r) => failed.push(r.url()));
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

    await page.addInitScript(() => {
      window.__lcp = 0;
      window.__cls = 0;
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) window.__lcp = e.startTime;
      }).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
      }).observe({ type: 'layout-shift', buffered: true });
    });

    await page.goto(url, { waitUntil: 'load' });
    await page.waitForTimeout(1500);
    const m = await page.evaluate(() => ({
      lcp: window.__lcp,
      cls: window.__cls,
      fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime ?? 0,
      domNodes: document.getElementsByTagName('*').length,
    }));
    samples.push({ ...m, bytes, failed, errors });
    await context.close();
  }
  results.push({
    url,
    runs: RUNS,
    fcp_ms: Math.round(median(samples.map((s) => s.fcp))),
    lcp_ms: Math.round(median(samples.map((s) => s.lcp))),
    cls: Number(median(samples.map((s) => s.cls)).toFixed(4)),
    transfer_kb: Math.round(median(samples.map((s) => s.bytes)) / 1024),
    dom_nodes: samples[0].domNodes,
    failed_requests: [...new Set(samples.flatMap((s) => s.failed))],
    console_errors: [...new Set(samples.flatMap((s) => s.errors))],
  });
}
await browser.close();
console.log(JSON.stringify(results, null, 2));
