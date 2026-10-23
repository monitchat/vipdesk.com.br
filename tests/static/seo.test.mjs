// Validações de SEO sobre o HTML gerado (o mesmo que o GitHub Pages publica).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { SITE } from '../../src/config.mjs';
import { ui, LOCALES, DEFAULT_FOR_UNMATCHED } from '../../src/i18n.mjs';
import {
  pages, indexablePages, read, ORIGIN, ROOT, titleOf, metaContent, canonicalOf, h1s, textOf,
  jsonLdOf, hrefs, ids, fileForPath,
} from './helpers.mjs';

test('cada página tem title, description, H1 único, idioma e viewport', () => {
  for (const p of pages) {
    const title = titleOf(p.html);
    const desc = metaContent(p.html, 'name', 'description');
    assert.ok(title, `${p.path}: sem <title>`);
    assert.ok(title.length <= 65, `${p.path}: title com ${title.length} caracteres`);
    assert.ok(desc && desc.length >= 70 && desc.length <= 160, `${p.path}: description com ${desc?.length} caracteres`);
    assert.equal(h1s(p.html).length, 1, `${p.path}: deve ter exatamente um H1`);
    assert.ok(p.html.includes(`<html lang="${ui(p.lang).htmlLang}">`), `${p.path}: idioma`);
    assert.match(p.html, /<meta name="viewport" content="width=device-width, initial-scale=1">/);
    assert.doesNotMatch(p.html, /name="keywords"/, `${p.path}: meta keywords não deve ser usada`);
  }
});

test('titles, descriptions e H1 não se repetem entre páginas', () => {
  for (const get of [(p) => titleOf(p.html), (p) => metaContent(p.html, 'name', 'description'), (p) => textOf(h1s(p.html)[0])]) {
    const values = pages.map(get);
    const dup = values.filter((v, i) => values.indexOf(v) !== i);
    assert.deepEqual(dup, [], `duplicados: ${dup.join(' | ')}`);
  }
});

test('canonical absoluto, HTTPS, sem www e apontando para a própria página', () => {
  for (const p of indexablePages) {
    assert.equal(canonicalOf(p.html), `${ORIGIN}${p.path}`, p.path);
    assert.equal(metaContent(p.html, 'property', 'og:url'), `${ORIGIN}${p.path}`, p.path);
    assert.doesNotMatch(p.html, /noindex/, `${p.path}: indexável não pode ter noindex`);
  }
});

test('Open Graph completo e imagem social existente', () => {
  for (const p of indexablePages) {
    for (const prop of ['og:title', 'og:description', 'og:image', 'og:type', 'og:locale', 'og:site_name']) {
      assert.ok(metaContent(p.html, 'property', prop), `${p.path}: falta ${prop}`);
    }
    const img = new URL(metaContent(p.html, 'property', 'og:image'));
    assert.equal(img.origin, ORIGIN);
    assert.ok(fileForPath(img.pathname), `${p.path}: og:image inexistente`);
    assert.equal(metaContent(p.html, 'name', 'twitter:card'), 'summary_large_image');
  }
});

test('404 personalizada com noindex e sem canonical', () => {
  const html = read('404.html');
  assert.match(html, /<meta name="robots" content="noindex, follow">/);
  assert.equal(canonicalOf(html), undefined);
});

test('sitemap.xml: XML válido, URLs absolutas, indexáveis e sem duplicatas', () => {
  const xml = read('sitemap.xml');
  assert.match(xml, /^<\?xml version="1.0" encoding="UTF-8"\?>\n<urlset xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9">/);
  assert.match(xml, /<\/urlset>\n$/);
  // estrutura bem formada: cada <url> tem um <loc> e fecha corretamente
  assert.equal((xml.match(/<url>/g) || []).length, (xml.match(/<\/url>/g) || []).length);
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.equal(locs.length, (xml.match(/<url>/g) || []).length);
  assert.equal(new Set(locs).size, locs.length, 'URLs duplicadas');
  assert.deepEqual([...locs].sort(), indexablePages.map((p) => `${ORIGIN}${p.path}`).sort());
  for (const loc of locs) {
    const u = new URL(loc);
    assert.equal(u.origin, ORIGIN, loc);
    assert.ok(u.pathname.endsWith('/'), `${loc}: sem barra final redirecionaria (301)`);
    const file = fileForPath(u.pathname);
    assert.ok(file, `${loc}: não existe`);
    const html = readFileSync(file, 'utf8');
    assert.equal(canonicalOf(html), loc, `${loc}: canonical diverge do sitemap`);
  }
  for (const m of xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) {
    assert.match(m[1], /^\d{4}-\d{2}-\d{2}$/);
  }
  assert.doesNotMatch(xml, /404|app\.vipdesk/);
});

test('robots.txt libera o rastreamento e referencia o sitemap', () => {
  const txt = read('robots.txt');
  assert.match(txt, /^User-agent: \*$/m);
  assert.match(txt, /^Allow: \/$/m);
  assert.doesNotMatch(txt, /^Disallow: \/\s*$/m);
  assert.match(txt, /^Sitemap: https:\/\/vipdesk\.com\.br\/sitemap\.xml$/m);
});

test('links internos e âncoras apontam para destinos existentes', () => {
  const byFile = new Map(pages.map((p) => [p.path, p]));
  for (const p of pages) {
    for (const href of hrefs(p.html)) {
      if (/^(mailto:|https?:)/.test(href)) continue;
      const [path, hash] = href.split('#');
      if (!path) {
        assert.ok(ids(p.html).has(hash), `${p.path}: âncora #${hash} inexistente`);
        continue;
      }
      assert.ok(path.startsWith('/'), `${p.path}: link relativo "${href}" quebra na 404`);
      assert.ok(fileForPath(path), `${p.path}: link quebrado ${href}`);
      if (path.length > 1 && !path.endsWith('/') && !/\.\w+$/.test(path)) {
        assert.fail(`${p.path}: ${href} sem barra final gera redirecionamento`);
      }
      if (hash) {
        const target = byFile.get(path);
        assert.ok(target && ids(target.html).has(hash), `${p.path}: âncora ${href} inexistente`);
      }
    }
  }
});

test('links externos são apenas destinos conhecidos', () => {
  const allowed = [/^https:\/\/app\.vipdesk\.com\.br\/?$/, /^https:\/\/developers\.google\.com\//, /^https:\/\/myaccount\.google\.com\//,
    /^https:\/\/vipphone\.vipdesk\.chat\/help$/, /^https:\/\/www\.youtube\.com\/@vipdeskcrm$/];
  for (const p of pages) {
    for (const href of hrefs(p.html).filter((h) => /^https?:/.test(h))) {
      const configured = [SITE.trialUrl, SITE.demoUrl].filter(Boolean);
      assert.ok(configured.includes(href) || allowed.some((re) => re.test(href)), `${p.path}: link externo inesperado ${href}`);
    }
  }
});

test('todas as páginas comerciais são alcançáveis por links internos', () => {
  const linked = new Set(pages.flatMap((p) => hrefs(p.html)).map((h) => h.split('#')[0]));
  for (const p of indexablePages) assert.ok(linked.has(p.path), `${p.path} está órfã`);
});

test('imagens têm alt e dimensões explícitas', () => {
  for (const p of pages) {
    for (const [tag] of p.html.matchAll(/<img\b[^>]*>/g)) {
      assert.match(tag, /\balt="/, `${p.path}: img sem alt: ${tag}`);
      assert.match(tag, /\bwidth="\d+"/, `${p.path}: img sem width`);
      assert.match(tag, /\bheight="\d+"/, `${p.path}: img sem height`);
      const src = tag.match(/src="([^"]+)"/)[1];
      assert.ok(fileForPath(src), `${p.path}: imagem inexistente ${src}`);
    }
  }
});

test('JSON-LD válido, com Organization/WebSite/WebPage e breadcrumbs coerentes', () => {
  for (const p of indexablePages) {
    const blocks = jsonLdOf(p.html);
    assert.equal(blocks.length, 1, p.path);
    const [ld] = blocks;
    assert.equal(ld['@context'], 'https://schema.org');
    const types = ld['@graph'].map((n) => n['@type']);
    for (const t of ['Organization', 'WebSite']) assert.ok(types.includes(t), `${p.path}: falta ${t}`);
    assert.ok(types.includes('WebPage') || types.includes('CollectionPage'), `${p.path}: falta WebPage`);
    const text = JSON.stringify(ld);
    assert.doesNotMatch(text, /aggregateRating|"review"|"offers"|ratingValue/, `${p.path}: dado não verificável`);

    const crumbs = ld['@graph'].find((n) => n['@type'] === 'BreadcrumbList');
    if (p.key === 'home') {
      assert.equal(crumbs, undefined);
      assert.ok(types.includes('SoftwareApplication'));
    } else {
      assert.ok(crumbs, `${p.path}: falta BreadcrumbList`);
      const visible = [...p.html.matchAll(/<nav class="trilha[^"]*" aria-label="[^"]+">([\s\S]*?)<\/nav>/g)];
      assert.equal(visible.length, 1, `${p.path}: breadcrumb visível`);
      const names = [...visible[0][1].matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) => textOf(m[1]));
      assert.deepEqual(crumbs.itemListElement.map((i) => i.name), names, `${p.path}: breadcrumb visual ≠ JSON-LD`);
      assert.equal(crumbs.itemListElement.at(-1).item, `${ORIGIN}${p.path}`);
    }
  }
});

test('FAQPage só com perguntas e respostas visíveis na página', () => {
  for (const p of indexablePages) {
    const faq = jsonLdOf(p.html)[0]['@graph'].find((n) => n['@type'] === 'FAQPage');
    if (!faq) continue;
    const visible = textOf(p.html);
    for (const q of faq.mainEntity) {
      assert.ok(visible.includes(q.name), `${p.path}: pergunta não visível: ${q.name}`);
      assert.ok(visible.includes(q.acceptedAnswer.text.slice(0, 60)), `${p.path}: resposta não visível: ${q.name}`);
    }
  }
});

test('artigos têm data real, autor e BlogPosting', () => {
  for (const p of indexablePages.filter((x) => x.ogType === 'article')) {
    const post = jsonLdOf(p.html)[0]['@graph'].find((n) => n['@type'] === 'BlogPosting');
    assert.ok(post, p.path);
    assert.match(post.datePublished, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(new Date(post.datePublished) <= new Date(), `${p.path}: data no futuro`);
    assert.ok(post.author, `${p.path}: sem autor`);
    assert.match(p.html, new RegExp(`<time datetime="${post.datePublished}">`), `${p.path}: data não visível`);
    assert.equal(metaContent(p.html, 'property', 'og:type'), 'article');
  }
});

// A home é a "home page" da verificação OAuth do Google (ver README): não pode perder isto.
test('home mantém os requisitos da verificação OAuth do Google', () => {
  const home = pages.find((p) => p.path === '/').html;
  const text = textOf(home);
  assert.match(text, /VipDesk/);
  assert.ok(ids(home).has('agenda'), 'seção #agenda');
  assert.match(text, /Google Calendar/);
  assert.match(text, /Lemos apenas início e fim dos compromissos/);
  assert.match(home, /href="\/privacy\/"/);
  assert.match(home, /href="\/terms\/"/);
  assert.match(text, /Vipphone Software/);
  assert.match(text, /03\.742\.028\/0001-92/);
});

test('CTAs apontam para fluxos existentes', () => {
  for (const p of pages) {
    for (const [tag] of p.html.matchAll(/<a\b[^>]*data-cta="[^"]+"[^>]*>/g)) {
      const href = tag.match(/href="([^"]+)"/)[1].replace(/&amp;/g, '&');
      const type = tag.match(/data-cta="([^"]+)"/)[1];
      if (type === 'demo_request' && SITE.demoUrl) assert.equal(href, SITE.demoUrl);
      else if ((type === 'demo_request' || type === 'contact_click') && SITE.contactForm[p.lang] && href === '#contato') assert.match(tag, /data-form-msg="[^"]+"/, `${p.path}: CTA sem mensagem do formulário`);
      else if (type === 'demo_request' || type === 'contact_click') assert.match(href, /^mailto:comercial@vipphone\.com\.br(\?|$)/);
      else if (type === 'trial_start') assert.equal(href, SITE.trialUrl);
      else if (type === 'app_access') assert.equal(href, 'https://app.vipdesk.com.br');
      else assert.fail(`${p.path}: CTA desconhecido ${type}`);
    }
  }
});

test('fonte auto-hospedada: sem Google Fonts, com preload e licença', () => {
  for (const p of pages) {
    assert.doesNotMatch(p.html, /fonts\.(googleapis|gstatic)\.com/, `${p.path}: fonte de terceiros`);
    assert.match(p.html, /<link rel="preload" href="\/assets\/fonts\/nunito-latin\.woff2" as="font" type="font\/woff2" crossorigin>/, p.path);
  }
  for (const f of ['nunito-latin.woff2', 'nunito-latin-ext.woff2', 'OFL.txt']) {
    assert.ok(existsSync(join(ROOT, 'assets', 'fonts', f)), `assets/fonts/${f}`);
  }
});

test('nenhum recurso externo bloqueia a renderização', () => {
  for (const p of pages) {
    const head = p.html.split('</head>')[0];
    for (const [tag] of head.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>|<script\b[^>]*\bsrc="[^"]+"[^>]*>/g)) {
      // A única exceção é a tag do Google Analytics, que é assíncrona (não bloqueia).
      if (/^<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=[^"]+">$/.test(tag)) continue;
      assert.fail(`${p.path}: recurso bloqueante no <head>: ${tag}`);
    }
  }
});

test('Google Analytics 4 em todas as páginas, uma vez, com o ID configurado', () => {
  assert.equal(SITE.ga4Id, 'G-5L7TXDVM7T');
  for (const p of pages) {
    const head = p.html.split('</head>')[0];
    const loaders = head.match(/<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=([^"]+)"><\/script>/g) || [];
    assert.equal(loaders.length, 1, `${p.path}: tag gtag.js ausente ou duplicada`);
    assert.ok(loaders[0].includes(`id=${SITE.ga4Id}`), `${p.path}: ID do GA4`);
    assert.equal((head.match(/gtag\('config', '([^']+)'\)/g) || []).length, 1, `${p.path}: gtag config ausente ou duplicado`);
    assert.ok(head.includes(`gtag('config', '${SITE.ga4Id}')`), `${p.path}: config com outro ID`);
    assert.doesNotMatch(p.html, /googletagmanager\.com\/gtm\.js/, `${p.path}: GTM duplicaria a medição`);
  }
});

test('hreflang recíproco, autorreferente e com x-default em todas as páginas indexáveis', () => {
  const byUrl = new Map(indexablePages.map((p) => [`${ORIGIN}${p.path}`, p]));
  const hreflangs = (html) => [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">/g)]
    .map((m) => ({ lang: m[1], href: m[2] }));
  for (const p of indexablePages) {
    const links = hreflangs(p.html);
    const self = `${ORIGIN}${p.path}`;
    // uma versão por idioma do site, ela mesma incluída
    for (const l of LOCALES) assert.equal(links.filter((x) => x.lang === ui(l).hreflang).length, 1, `${p.path}: hreflang ${l}`);
    assert.ok(links.some((x) => x.lang === ui(p.lang).hreflang && x.href === self), `${p.path}: sem hreflang autorreferente`);
    const xDefault = links.find((x) => x.lang === 'x-default');
    assert.ok(xDefault, `${p.path}: sem x-default`);
    assert.equal(xDefault.href, links.find((x) => x.lang === ui(DEFAULT_FOR_UNMATCHED).hreflang).href);
    for (const { lang, href } of links.filter((x) => x.lang !== 'x-default')) {
      const target = byUrl.get(href);
      assert.ok(target, `${p.path}: hreflang ${lang} aponta para URL inexistente ${href}`);
      assert.equal(ui(target.lang).hreflang, lang, `${p.path}: idioma do alvo ${href}`);
      // reciprocidade: o alvo aponta de volta para esta página
      assert.ok(hreflangs(target.html).some((x) => x.href === self), `${href} não aponta de volta para ${self}`);
    }
  }
});

test('seletor de idioma leva à página equivalente', () => {
  for (const p of indexablePages) {
    for (const l of LOCALES.filter((x) => x !== p.lang)) {
      const alt = p.alternates.find((a) => a.lang === l);
      const tag = p.html.match(new RegExp(`<a class="idioma" href="([^"]+)" hreflang="${ui(l).hreflang}"`));
      assert.ok(tag, `${p.path}: sem seletor para ${l}`);
      assert.equal(tag[1], alt.path, `${p.path}: seletor para ${l}`);
    }
  }
});

test('páginas em inglês não exibem textos de interface em português', () => {
  const PT_UI = ['Agendar demonstração', 'Falar com especialista', 'Acessar a plataforma', 'Saiba mais',
    'Perguntas frequentes', 'Pular para o conteúdo', 'Você está em', 'Política de Privacidade', 'Termos de Uso',
    'Leia também', 'Recursos relacionados', 'Ler artigo', 'Todos os direitos reservados', 'Publicado em'];
  for (const p of indexablePages.filter((x) => x.lang === 'en')) {
    const html = p.html.replace(/<p class="aviso-traducao"[\s\S]*?<\/p>/, '');
    const visible = textOf(html);
    for (const s of PT_UI) assert.ok(!visible.includes(s), `${p.path}: texto em português "${s}"`);
    assert.doesNotMatch(html, /href="\/(?!en\/|assets\/|favicon)[^"]*"(?! hreflang)/, `${p.path}: link interno para página em português fora do seletor`);
  }
});

test('versões traduzidas são completas (mesmas páginas nos dois idiomas)', () => {
  const keys = (lang) => indexablePages.filter((p) => p.lang === lang).map((p) => p.key).sort();
  assert.deepEqual(keys('en'), keys('pt'));
  for (const p of indexablePages) assert.ok(p.key, `${p.path}: sem chave de tradução`);
});
