// Capturas do editor real do DeskFlow para o site (assets/deskflow/). Ver README.md nesta pasta.
// Abre o deskflow-app servido localmente (Vite) com TODA a API interceptada pelo Playwright: nenhuma
// chamada chega a um backend real, nenhum dado de cliente aparece e não é preciso login.
//   node scripts/deskflow-captures/capture.mjs stills   # PNGs em scripts/deskflow-captures/out/
//   node scripts/deskflow-captures/capture.mjs video    # WebM em scripts/deskflow-captures/out/video/
import { chromium } from 'playwright';
import { flow } from './demo-flow.mjs';

const APP = process.env.DESKFLOW_APP_URL || 'http://localhost:5173';
const OUT = process.env.OUT_DIR || new URL('./out/', import.meta.url).pathname;
import { mkdirSync } from 'node:fs';
mkdirSync(OUT, { recursive: true });
const mode = process.argv[2] || 'stills'; // stills | video
const theme = 'light';

const b64url = (o) => Buffer.from(JSON.stringify(o)).toString('base64').replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
const fakeJwt = `${b64url({ alg: 'HS256', typ: 'JWT' })}.${b64url({ sub: 1, name: 'Equipe VipDesk', email: 'demo@vipdesk.com.br', company_id: 1, role: 'admin', roles: ['admin'], is_admin: true, exp: Math.floor(Date.now() / 1000) + 86400 })}.x`;
const json = (route, data, status = 200) => route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(data) });

const W = mode === 'video' ? 1600 : 1920;
const H = mode === 'video' ? 900 : 1080;
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const ctx = await browser.newContext({
  viewport: { width: W, height: H },
  deviceScaleFactor: mode === 'video' ? 1 : 2,
  locale: 'pt-BR',
  ...(mode === 'video' ? { recordVideo: { dir: `${OUT}/video`, size: { width: W, height: H } } } : {}),
});
await ctx.addInitScript(({ token, theme }) => {
  localStorage.setItem('token', token);
  localStorage.setItem('auth_source', 'local');
  localStorage.setItem('user_name', 'Equipe VipDesk');
  localStorage.setItem('user_email', 'demo@vipdesk.com.br');
  localStorage.setItem('user_role', 'admin');
  localStorage.setItem('user_is_admin', 'true');
  localStorage.setItem('deskflow-theme', theme);
  localStorage.setItem('deskflow-embedded', 'true');
  localStorage.setItem('deskflow-tutorial-seen', 'true');
  localStorage.setItem('flow_navigation_tutorial_seen_v2', 'true');
}, { token: fakeJwt, theme });
await ctx.route(/\/socket\.io\//, (r) => r.abort());
await ctx.route(/^https?:\/\/(alb\.monitchat\.com|[a-z0-9.-]*vipdesk\.com\.br|[a-z0-9.-]*monitchat\.com)\//, (r) => json(r, { success: true, data: [] }));
await ctx.route(/\/api\/v1\//, (route) => {
  const p = new URL(route.request().url()).pathname;
  const m = route.request().method();
  if (p === `/api/v1/flows/${flow.id}` && m === 'GET') return json(route, { success: true, data: flow });
  if (p === '/api/v1/flows' && m === 'GET') return json(route, { success: true, data: [flow] });
  if (p.endsWith('/secrets')) return json(route, { success: true, data: { secrets: [], env: [] } });
  if (p.endsWith('/validate')) return json(route, { success: true, data: { ok: true, issues: [] } });
  if (m === 'PUT' || m === 'POST') return json(route, { success: true, data: { ...flow } });
  return json(route, { success: true, data: [] });
});

const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(`pageerror: ${String(e).slice(0, 200)}`));
await page.goto(`${APP}/flow/${flow.id}`, { waitUntil: 'networkidle' });
await page.waitForSelector('.react-flow__node', { timeout: 30000 });
await page.waitForTimeout(1500);
const fit = async () => { const b = page.locator('.react-flow__controls-fitview'); for (let i = 0; i < 2; i++) { await b.click(); await page.waitForTimeout(600); } };
const sidebarToggle = page.locator('button[title*="sidebar" i], button[title*="Recolher" i], button[title*="Ocultar" i], button:has-text("📌")').first();
const category = (label) => page.locator('div', { hasText: new RegExp(`^.{0,3}\\s*${label}\\s*[▼▶]?$`) }).filter({ has: page.locator('text=' + label) }).first();
const openNodeEditor = async (nodeId) => {
  const node = page.locator(`.react-flow__node[data-id="${nodeId}"]`);
  await node.click(); await page.waitForTimeout(400);
  await node.dblclick(); await page.waitForTimeout(1200);
  console.log('dialog open:', await page.locator('.modal-overlay').count());
};

if (mode === 'stills') {
  // 1. Clean canvas (sidebar collapsed) — used on the home page and as the /deskflow/ hero image.
  await sidebarToggle.click(); await page.waitForTimeout(500);
  await fit();
  await page.screenshot({ path: `${OUT}/still-canvas.png` });
  // 2. Sidebar back (reload with the pin restored) + node settings dialog of the CRM node.
  await page.evaluate(() => localStorage.setItem('deskflow-sidebar-pinned', 'true'));
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('.react-flow__node', { timeout: 30000 });
  await page.waitForTimeout(1500);
  await fit();
  await openNodeEditor('node_7');
  await page.screenshot({ path: `${OUT}/still-node-editor.png` });
  await page.keyboard.press('Escape'); await page.waitForTimeout(500);
  // 3. Palette with the "Atendimento" category expanded (VipDesk-specific nodes).
  const cat = page.locator('text=ATENDIMENTO').first();
  await cat.click(); await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/still-palette-full.png` });
  const sidebar = page.locator('text=COMPONENTES').first().locator('xpath=ancestor::*[contains(@class,"sidebar") or contains(@class,"Sidebar")][1]');
  if (await sidebar.count()) await sidebar.screenshot({ path: `${OUT}/still-palette.png` });
  // 4. Edge condition dialog.
  const edge = page.locator('.react-flow__edge').nth(3);
  await edge.click({ force: true }).catch(() => {});
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/still-edge.png` });
} else {
  // Short demo recording (~20 s): overview → zoom into the CRM branch → node settings → overview →
  // customer-service palette → AI agent → overview. Uses the editor's own zoom buttons and canvas drag.
  const canvas = page.locator('.react-flow__pane');
  const zoomIn = page.locator('.react-flow__controls-zoomin');
  const centerOn = async (selector) => {
    const cb = await page.locator(selector).first().boundingBox();
    const vb = await canvas.boundingBox();
    const from = { x: vb.x + vb.width * 0.5, y: vb.y + vb.height * 0.85 };
    const dx = (vb.x + vb.width / 2) - (cb.x + cb.width / 2);
    const dy = (vb.y + vb.height / 2) - (cb.y + cb.height / 2);
    await page.mouse.move(from.x, from.y);
    await page.mouse.down();
    for (let i = 1; i <= 24; i++) { await page.mouse.move(from.x + dx * i / 24, from.y + dy * i / 24); await page.waitForTimeout(25); }
    await page.mouse.up();
  };
  const park = async () => { const vb = await canvas.boundingBox(); await page.mouse.move(vb.x + vb.width - 40, vb.y + vb.height - 200); };
  await fit();
  await page.waitForTimeout(1400);                                   // 0–3 s overview
  await centerOn('.react-flow__node:has-text("Criar negócio no CRM")');
  for (let i = 0; i < 3; i++) { await zoomIn.click(); await page.waitForTimeout(260); }
  await park();
  await page.waitForTimeout(1200);                                   // 3–6 s CRM branch
  await openNodeEditor('node_7');
  await page.waitForTimeout(2400);                                   // 6–10 s dialog
  await page.keyboard.press('Escape'); await page.waitForTimeout(500);
  await fit(); await park();
  await page.waitForTimeout(800);                                    // 10–12 s overview
  await page.locator('text=ATENDIMENTO').first().click();
  await park();
  await page.waitForTimeout(2600);                                   // 12–15 s palette
  await centerOn('.react-flow__node:has-text("Agente de suporte")');
  for (let i = 0; i < 2; i++) { await zoomIn.click(); await page.waitForTimeout(260); }
  await park();
  await page.waitForTimeout(2000);                                   // 15–18 s agent
  await fit(); await park();
  await page.waitForTimeout(1800);                                   // 18–20 s overview
}
console.log('errors:', errors.length ? errors.join('\n') : 'none');
await ctx.close();
await browser.close();
