// Testes de navegador contra o servidor local que reproduz o GitHub Pages (scripts/serve.mjs).
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { PAGES } from '../../src/routes.mjs';

const ROUTES = PAGES.filter((p) => p.indexable !== false);
const ORIGIN = 'https://vipdesk.com.br';

test.describe('rotas', () => {
  for (const page of ROUTES) {
    test(`${page.path} responde 200 com conteúdo no HTML inicial`, async ({ request }) => {
      const res = await request.get(page.path, { maxRedirects: 0 });
      expect(res.status()).toBe(200);
      expect(res.headers()['content-type']).toContain('text/html');
      const html = await res.text();
      // conteúdo principal presente sem executar JavaScript
      expect(html).toContain(`<h1>${page.h1}</h1>`);
      expect(html).toContain(`<link rel="canonical" href="${ORIGIN}${page.path}">`);
    });
  }

  test('URL inexistente retorna 404 real com página personalizada', async ({ page }) => {
    const res = await page.goto('/pagina-que-nao-existe/');
    expect(res.status()).toBe(404);
    await expect(page.locator('h1')).toHaveText('Página não encontrada');
    expect(page.url()).toContain('/pagina-que-nao-existe/');
    // links e imagens da 404 funcionam mesmo servidos de um caminho profundo
    await expect(page.locator('header img')).toHaveJSProperty('complete', true);
    expect(await page.locator('header img').evaluate((i) => i.naturalWidth)).toBeGreaterThan(0);
  });

  test('rota sem barra final redireciona permanentemente para a canônica', async ({ request }) => {
    const res = await request.get('/crm-whatsapp', { maxRedirects: 0 });
    expect(res.status()).toBe(301);
    // O Pages pode responder com Location relativo ou absoluto; o destino resolvido é o que importa.
    const target = new URL(res.headers().location, res.url());
    expect(target.pathname).toBe('/crm-whatsapp/');
    expect(target.host).toBe(new URL(res.url()).host);
  });

  test('código-fonte e documentação não são publicados', async ({ request }) => {
    for (const path of ['/package.json', '/src/config.mjs', '/docs/SEO-AUDIT.md', '/README.md', '/_config.yml']) {
      expect((await request.get(path)).status(), path).toBe(404);
    }
  });

  test('sitemap é XML válido e todas as URLs respondem 200 sem redirecionar', async ({ page, request }) => {
    const res = await request.get('/sitemap.xml');
    expect(res.status()).toBe(200);
    const xml = await res.text();
    await page.goto('/');
    const locs = await page.evaluate((src) => {
      const doc = new DOMParser().parseFromString(src, 'application/xml');
      if (doc.querySelector('parsererror')) return null;
      return [...doc.getElementsByTagName('loc')].map((n) => n.textContent);
    }, xml);
    expect(locs).not.toBeNull();
    expect(locs.length).toBe(ROUTES.length);
    for (const loc of locs) {
      const r = await request.get(new URL(loc).pathname, { maxRedirects: 0 });
      expect(r.status(), loc).toBe(200);
    }
  });

  test('robots.txt acessível', async ({ request }) => {
    const res = await request.get('/robots.txt');
    expect(res.status()).toBe(200);
    expect(await res.text()).toContain('Sitemap: https://vipdesk.com.br/sitemap.xml');
  });
});

test.describe('renderização e qualidade', () => {
  for (const route of ROUTES) {
    test(`${route.path}: sem erros de console, sem overflow e acessível`, async ({ page }) => {
      const errors = [];
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
      page.on('pageerror', (e) => errors.push(String(e)));
      await page.goto(route.path);
      await expect(page.locator('h1')).toBeVisible();

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, 'overflow horizontal').toBeLessThanOrEqual(0);

      const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
      const summary = axe.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(', ')}`);
      expect(summary).toEqual([]);
      expect(errors).toEqual([]);
    });
  }

  test('nenhuma requisição a terceiros e fonte da marca carregada', async ({ page, baseURL }) => {
    const origin = new URL(baseURL).origin;
    const thirdParty = [];
    page.on('request', (r) => { if (!r.url().startsWith(origin) && !r.url().startsWith('data:')) thirdParty.push(r.url()); });
    await page.goto('/');
    const loaded = await page.evaluate(async () => {
      await document.fonts.ready;
      return [...document.fonts].some((f) => f.family.replace(/"/g, '') === 'Nunito' && f.status === 'loaded');
    });
    expect(loaded).toBe(true);
    expect(thirdParty).toEqual([]);
  });

  test('conteúdo principal visível sem JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/sistema-atendimento-whatsapp/');
    await expect(page.locator('h1')).toContainText('Sistema de atendimento pelo WhatsApp');
    await expect(page.locator('#perguntas summary').first()).toBeVisible();
    await context.close();
  });
});

test.describe('navegação e CTAs', () => {
  test('menu dá acesso a todas as páginas comerciais', async ({ page, isMobile }) => {
    await page.goto('/');
    const menu = page.locator(isMobile ? 'details.menu-movel' : 'nav.nav-links details.menu');
    await menu.locator('summary').click();
    const links = menu.locator('.submenu a[href^="/"]');
    await expect(links.first()).toBeVisible();
    const hrefs = await links.evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    for (const p of ['/sistema-atendimento-whatsapp/', '/crm-whatsapp/', '/atendimento-omnichannel/',
      '/automacao-atendimento/', '/agendamento-whatsapp/', '/inteligencia-artificial-atendimento/']) {
      expect(hrefs).toContain(p);
    }
    await menu.locator('.submenu a[href="/crm-whatsapp/"]').click();
    await expect(page).toHaveURL(/\/crm-whatsapp\/$/);
    await expect(page.locator('h1')).toContainText('CRM para WhatsApp');
  });

  test('menu fecha com Esc', async ({ page, isMobile }) => {
    await page.goto('/');
    const menu = page.locator(isMobile ? 'details.menu-movel' : 'nav.nav-links details.menu');
    await menu.locator('summary').click();
    await expect(menu).toHaveAttribute('open', '');
    await page.keyboard.press('Escape');
    await expect(menu).not.toHaveAttribute('open', '');
  });

  test('link "pular para o conteúdo" é o primeiro foco do teclado', async ({ page, isMobile }) => {
    test.skip(isMobile, 'teclado físico');
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.locator('a.pular')).toBeFocused();
  });

  test('CTA de demonstração abre e-mail comercial com assunto e registra evento', async ({ page }) => {
    await page.goto('/crm-whatsapp/');
    const cta = page.locator('.hero [data-cta="demo_request"]');
    await expect(cta).toHaveText('Agendar demonstração');
    const href = await cta.getAttribute('href');
    expect(href).toMatch(/^mailto:comercial@vipphone\.com\.br\?subject=/);
    expect(decodeURIComponent(href)).toContain('demonstração do VipDesk');
    // não navega no teste: intercepta o clique e confere o evento do dataLayer
    await page.evaluate(() => document.addEventListener('click', (e) => e.preventDefault()));
    await cta.click();
    const events = await page.evaluate(() => window.dataLayer);
    expect(events).toEqual([expect.objectContaining({ event: 'cta_click', cta_type: 'demo_request', cta_location: 'hero', page_path: '/crm-whatsapp/' })]);
  });

  test('botões têm área de toque de pelo menos 44px', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'apenas mobile');
    await page.goto('/');
    for (const b of await page.locator('.hero .btn, .faixa .btn').all()) {
      const box = await b.boundingBox();
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('FAQ abre e mostra a resposta', async ({ page }) => {
    await page.goto('/');
    const item = page.locator('#perguntas details').first();
    await item.locator('summary').click();
    await expect(item.locator('.resposta')).toBeVisible();
  });
});
