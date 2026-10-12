// Auditoria técnica de SEO de um ambiente publicado (ou do build local).
//
//   SEO_BASE_URL=https://vipdesk.com.br node scripts/audit.mjs [--out arquivo.md] [--json arquivo.json]
//   node scripts/audit.mjs                 # sem SEO_BASE_URL: sobe o servidor local (emula o Pages)
//
// Descobre URLs pelo sitemap e seguindo links internos (HTML real recebido, sem JavaScript),
// verifica HTTP, redirecionamentos, metadados, canonical, JSON-LD, links, imagens, variações de
// URL (http/www/barra final/parâmetros), soft 404, robots.txt e compara com o repositório.
// Só faz requisições GET/HEAD de leitura: seguro para rodar em produção.
// Sai com código 1 se houver problema P0 ou P1.
import { writeFile } from 'node:fs/promises';
import { PAGES } from '../src/routes.mjs';
import { ui, LOCALES } from '../src/i18n.mjs';
import { startServer } from './serve.mjs';

const OFFICIAL = 'https://vipdesk.com.br';
const args = process.argv.slice(2);
const argValue = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : null; };

let server = null;
let BASE = (process.env.SEO_BASE_URL || '').replace(/\/$/, '');
if (!BASE) {
  server = await startServer({ port: 0 });
  BASE = `http://localhost:${server.address().port}`;
}
const IS_OFFICIAL = BASE === OFFICIAL;
const UA = 'Mozilla/5.0 (compatible; VipDeskSEOAudit/1.0; +https://vipdesk.com.br)';

// ---------- utilidades ----------
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const textOf = (s) => decode(s.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const first = (html, re) => { const m = html.match(re); return m ? decode(m[1]) : undefined; };
const meta = (html, attr, name) => first(html, new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`));
const toBase = (url) => { const u = new URL(url); return `${BASE}${u.pathname}${u.search}`; };
const toOfficial = (url) => { const u = new URL(url, BASE); return `${OFFICIAL}${u.pathname}${u.search}`; };

async function request(url, { method = 'GET' } = {}) {
  const chain = [];
  let current = url;
  for (let hop = 0; hop < 10; hop++) {
    let res;
    try {
      res = await fetch(current, { method, redirect: 'manual', headers: { 'user-agent': UA } });
    } catch (e) {
      return { url, chain, error: String(e.cause?.code || e.message) };
    }
    const location = res.headers.get('location');
    if (res.status >= 300 && res.status < 400 && location) {
      chain.push({ url: current, status: res.status });
      current = new URL(location, current).href;
      continue;
    }
    const body = method === 'GET' ? await res.text() : '';
    return {
      url, chain, finalUrl: current, status: res.status, body,
      contentType: res.headers.get('content-type') || '',
      cacheControl: res.headers.get('cache-control') || '',
    };
  }
  return { url, chain, error: 'loop de redirecionamento (>10)' };
}

const issues = [];
const issue = (url, priority, problem, evidence) => issues.push({ url, priority, problem, evidence });

// ---------- robots.txt ----------
const robots = await request(`${BASE}/robots.txt`);
const robotsInfo = { status: robots.status ?? robots.error, sitemap: null };
if (robots.status !== 200) issue('/robots.txt', 'P1', 'robots.txt indisponível', `HTTP ${robots.status ?? robots.error}`);
else {
  if (!/text\/plain/.test(robots.contentType)) issue('/robots.txt', 'P3', 'Content-Type inesperado', robots.contentType);
  if (/^Disallow:\s*\/\s*$/m.test(robots.body)) issue('/robots.txt', 'P0', 'robots.txt bloqueia o site inteiro', 'Disallow: /');
  robotsInfo.sitemap = first(robots.body, /^Sitemap:\s*(\S+)/m) || null;
  if (!robotsInfo.sitemap) issue('/robots.txt', 'P2', 'robots.txt sem declaração de Sitemap', robots.body.slice(0, 120));
  else if (robotsInfo.sitemap !== `${OFFICIAL}/sitemap.xml`) issue('/robots.txt', 'P1', 'Sitemap declarado diferente do oficial', robotsInfo.sitemap);
}

// ---------- sitemap.xml ----------
const sm = await request(`${BASE}/sitemap.xml`);
let sitemapLocs = [];
const sitemapInfo = { status: sm.status ?? sm.error, urls: 0, wellFormed: false };
if (sm.status !== 200) issue('/sitemap.xml', 'P0', 'sitemap.xml indisponível', `HTTP ${sm.status ?? sm.error}`);
else {
  const xml = sm.body;
  const stack = [];
  let ok = /^<\?xml[^>]*\?>/.test(xml) && /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/.test(xml);
  for (const [, close, name, self] of xml.replace(/<\?xml[^>]*\?>/, '').matchAll(/<(\/?)([a-zA-Z:]+)[^>]*?(\/?)>/g)) {
    if (self) continue;
    if (!close) stack.push(name);
    else if (stack.pop() !== name) { ok = false; break; }
  }
  sitemapInfo.wellFormed = ok && stack.length === 0;
  if (!sitemapInfo.wellFormed) issue('/sitemap.xml', 'P0', 'sitemap.xml malformado', 'tags desbalanceadas ou cabeçalho ausente');
  sitemapLocs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1].trim()));
  sitemapInfo.urls = sitemapLocs.length;
  const dup = sitemapLocs.filter((u, i) => sitemapLocs.indexOf(u) !== i);
  if (dup.length) issue('/sitemap.xml', 'P1', 'URLs duplicadas no sitemap', dup.join(', '));
  for (const loc of sitemapLocs) {
    if (!loc.startsWith(`${OFFICIAL}/`)) issue('/sitemap.xml', 'P1', 'URL fora do domínio oficial/HTTPS', loc);
  }
  for (const m of xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) {
    if (new Date(m[1]) > new Date()) issue('/sitemap.xml', 'P2', 'lastmod no futuro', m[1]);
  }
}

// ---------- rastreamento ----------
const pages = new Map(); // path -> resultado
const queue = ['/', ...sitemapLocs.map((u) => new URL(u).pathname)];
const linkSources = new Map(); // path -> Set(origens)
const external = new Map(); // href -> Set(origens)
const ctas = [];

function parseHtml(html) {
  const h1 = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => textOf(m[1]));
  const headings = [...html.matchAll(/<h([1-6])[^>]*>/g)].map((m) => Number(m[1]));
  const jsonld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => {
    try { return { ok: true, data: JSON.parse(m[1]) }; } catch (e) { return { ok: false, error: e.message }; }
  });
  const links = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map((m) => ({
    href: decode(first(m[1], /\bhref="([^"]*)"/) || ''),
    cta: first(m[1], /\bdata-cta="([^"]*)"/),
    text: textOf(m[2]) || first(m[1], /aria-label="([^"]*)"/) || '',
  }));
  const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  return {
    title: first(html, /<title>([^<]*)<\/title>/),
    description: meta(html, 'name', 'description'),
    robots: meta(html, 'name', 'robots') || '',
    canonical: first(html, /<link rel="canonical" href="([^"]+)"/),
    lang: first(html, /<html lang="([^"]+)"/),
    viewport: meta(html, 'name', 'viewport'),
    og: ['og:title', 'og:description', 'og:image', 'og:url', 'og:type'].filter((p) => meta(html, 'property', p)),
    h1, headings, jsonld, links, imgs,
    words: textOf(html.replace(/<header[\s\S]*?<\/header>|<footer[\s\S]*?<\/footer>/g, ' ')).split(' ').length,
  };
}

while (queue.length) {
  const path = queue.shift();
  if (pages.has(path) || pages.size > 300) continue;
  const res = await request(`${BASE}${path}`);
  const record = { path, res, info: null };
  pages.set(path, record);
  if (res.error || res.status !== 200 || !/text\/html/.test(res.contentType)) continue;
  record.info = parseHtml(res.body);
  for (const l of record.info.links) {
    if (l.cta) ctas.push({ page: path, type: l.cta, href: l.href, text: l.text });
    if (/^mailto:|^tel:/.test(l.href)) continue;
    let u;
    try { u = new URL(l.href, `${BASE}${path}`); } catch { issue(path, 'P2', 'href inválido', l.href); continue; }
    const internal = u.origin === new URL(BASE).origin || u.origin === OFFICIAL;
    if (!internal) {
      if (!external.has(u.href)) external.set(u.href, new Set());
      external.get(u.href).add(path);
      continue;
    }
    if (u.origin === OFFICIAL && !IS_OFFICIAL) issue(path, 'P2', 'Link interno absoluto para o domínio de produção', l.href);
    if (!linkSources.has(u.pathname)) linkSources.set(u.pathname, new Set());
    linkSources.get(u.pathname).add(path);
    if (/^(clique aqui|aqui|saiba mais|leia mais|link)$/i.test(l.text.trim()) && !l.href.startsWith('#')) {
      // "Saiba mais" dentro de card com título é aceitável; registra só como informação.
    }
    if (!pages.has(u.pathname)) queue.push(u.pathname);
  }
}

// ---------- verificações por página ----------
const sitemapPaths = new Set(sitemapLocs.map((u) => new URL(u).pathname));
const titles = new Map();
const hreflangMap = new Map();
const descriptions = new Map();
const rows = [];

for (const { path, res, info } of pages.values()) {
  const inSitemap = sitemapPaths.has(path);
  const row = {
    url: path, http: res.error ? `ERRO ${res.error}` : `${res.chain.map((c) => c.status).join('→')}${res.chain.length ? '→' : ''}${res.status}`,
    title: info?.title || '', description: info?.description || '', h1: info?.h1?.[0] || '',
    canonical: info?.canonical || '', indexable: '', problems: [], priority: '',
  };
  const add = (p, problem, evidence) => { issue(path, p, problem, evidence); row.problems.push(`${p} ${problem}`); };

  if (res.error) add('P0', 'Falha de rede', res.error);
  else if (res.status === 404) {
    const sources = [...(linkSources.get(path) || [])];
    add(sources.length ? 'P1' : 'P0', 'URL retorna 404', sources.length ? `linkada por ${sources.join(', ')}` : 'listada no sitemap');
  } else if (res.status !== 200) add('P0', `HTTP ${res.status}`, res.finalUrl);
  if (res.chain?.length) {
    const target = new URL(res.finalUrl).pathname;
    const sources = [...(linkSources.get(path) || [])];
    if (inSitemap) add('P1', 'URL do sitemap redireciona', `${path} → ${target}`);
    else if (sources.length) add('P2', 'Link interno passa por redirecionamento', `${path} → ${target} (em ${sources.join(', ')})`);
    if (res.chain.length > 1) add('P2', 'Cadeia de redirecionamento longa', res.chain.map((c) => `${c.status} ${c.url}`).join(' | '));
    if (res.chain.some((c) => c.status === 302 || c.status === 307)) add('P2', 'Redirecionamento temporário', res.chain.map((c) => c.status).join(','));
  }
  if (!info) { rows.push(row); continue; }

  const noindex = /noindex/i.test(info.robots);
  row.indexable = noindex ? 'não (noindex)' : 'sim';
  if (inSitemap && noindex) add('P0', 'URL do sitemap com noindex', info.robots);
  if (!info.title) add('P0', 'Title ausente', '');
  else {
    if (info.title.length > 65) add('P3', 'Title longo', `${info.title.length} caracteres`);
    titles.set(info.title, [...(titles.get(info.title) || []), path]);
  }
  if (!info.description) add(noindex ? 'P3' : 'P1', 'Meta description ausente', '');
  else {
    if (info.description.length < 70 || info.description.length > 160) add('P3', 'Description fora de 70–160 caracteres', `${info.description.length}`);
    descriptions.set(info.description, [...(descriptions.get(info.description) || []), path]);
  }
  if (info.h1.length !== 1) add(info.h1.length ? 'P2' : 'P0', `${info.h1.length} H1 na página`, info.h1.join(' | '));
  for (let i = 1; i < info.headings.length; i++) {
    if (info.headings[i] > info.headings[i - 1] + 1) { add('P3', 'Salto de nível de heading', `h${info.headings[i - 1]} → h${info.headings[i]}`); break; }
  }
  const expectedLang = PAGES.find((x) => x.path === path)?.lang;
  if (!info.lang || (expectedLang && info.lang !== ui(expectedLang).htmlLang)) add('P2', 'Idioma ausente ou incorreto', `${info.lang || '-'} (esperado ${expectedLang ? ui(expectedLang).htmlLang : 'pt-BR ou en'})`);
  if (!noindex && LOCALES.length > 1) {
    const alts = [...res.body.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">/g)].map((m) => ({ lang: m[1], href: m[2] }));
    if (!alts.length) add('P2', 'Sem hreflang', 'página sem versões alternativas declaradas');
    else {
      if (!alts.some((a) => a.href === `${OFFICIAL}${path}`)) add('P2', 'hreflang sem autorreferência', path);
      if (!alts.some((a) => a.lang === 'x-default')) add('P3', 'hreflang sem x-default', path);
      hreflangMap.set(path, alts);
    }
  }
  if (!info.viewport) add('P1', 'Viewport ausente', '');
  if (!noindex) {
    const expected = `${OFFICIAL}${path}`;
    if (!info.canonical) add('P1', 'Canonical ausente', '');
    else if (info.canonical !== expected) add('P1', 'Canonical diverge da URL', `${info.canonical} (esperado ${expected})`);
    if (info.og.length < 5) add('P2', 'Open Graph incompleto', `presentes: ${info.og.join(', ')}`);
    if (!inSitemap) add('P2', 'Página indexável fora do sitemap', path);
    if (info.words < 120) add('P1', 'Pouco conteúdo no HTML inicial', `${info.words} palavras fora do cabeçalho/rodapé`);
  }
  for (const j of info.jsonld) if (!j.ok) add('P1', 'JSON-LD inválido', j.error);
  for (const img of info.imgs) {
    if (!/\balt="/.test(img)) add('P2', 'Imagem sem alt', img.slice(0, 120));
    if (!/\bwidth="\d+"/.test(img) || !/\bheight="\d+"/.test(img)) add('P3', 'Imagem sem dimensões', img.slice(0, 120));
  }
  const text = textOf(res.body);
  const placeholder = text.match(/lorem ipsum|\[inserir[^\]]*\]|\bTODO\b|\bFIXME\b|\bXXX\b|undefined|\[object Object\]/);
  if (placeholder) add('P1', 'Possível placeholder no conteúdo', placeholder[0]);
  if (/Encarregado \(DPO\):\s*\./.test(text)) add('P2', 'Nome do Encarregado (DPO) vazio', 'Encarregado (DPO): .');
  rows.push(row);
}

// hreflang recíproco: se A declara B como alternativa, B precisa declarar A.
for (const [path, alts] of hreflangMap) {
  for (const a of alts.filter((x) => x.lang !== 'x-default')) {
    const target = new URL(a.href).pathname;
    if (target === path) continue;
    const back = hreflangMap.get(target);
    if (!back) issue(path, 'P2', 'hreflang aponta para página não rastreada ou sem hreflang', a.href);
    else if (!back.some((b) => b.href === `${OFFICIAL}${path}`)) issue(path, 'P2', 'hreflang não recíproco', `${target} não aponta de volta`);
  }
}

for (const [t, ps] of titles) if (ps.length > 1) issue(ps.join(', '), 'P1', 'Title duplicado', t);
for (const [d, ps] of descriptions) if (ps.length > 1) issue(ps.join(', '), 'P2', 'Description duplicada', d.slice(0, 80));

// Páginas do sitemap que nenhum link interno alcança.
for (const p of sitemapPaths) {
  if (p !== '/' && !linkSources.has(p)) issue(p, 'P2', 'Página órfã (sem links internos)', 'só está no sitemap');
}

// ---------- comparação com o repositório ----------
const repoDiff = [];
for (const page of PAGES.filter((p) => p.indexable !== false)) {
  const live = pages.get(page.path);
  if (!live?.info) { repoDiff.push(`${page.path}: não encontrada no ambiente`); issue(page.path, 'P1', 'Rota do repositório ausente no ambiente', `HTTP ${live?.res.status ?? 'não rastreada'}`); continue; }
  if (live.info.title !== page.title) { repoDiff.push(`${page.path}: title difere`); issue(page.path, 'P1', 'Title difere do repositório', `${live.info.title} ≠ ${page.title}`); }
  if (live.info.h1[0] !== page.h1) { repoDiff.push(`${page.path}: H1 difere`); issue(page.path, 'P1', 'H1 difere do repositório', `${live.info.h1[0]} ≠ ${page.h1}`); }
  if (live.info.description !== page.description) { repoDiff.push(`${page.path}: description difere`); issue(page.path, 'P2', 'Description difere do repositório', ''); }
}

// ---------- 404 real e variações de URL ----------
const probe = `/__auditoria-seo-inexistente-${Date.now()}/`;
const notFound = await request(`${BASE}${probe}`);
const variants = [{ caso: 'URL inexistente', url: probe, resultado: `${notFound.status ?? notFound.error}`, esperado: '404' }];
if (notFound.status === 200) issue(probe, 'P0', 'Soft 404: URL inexistente responde 200', '');
else if (notFound.status !== 404) issue(probe, 'P1', 'URL inexistente não retorna 404', `HTTP ${notFound.status ?? notFound.error}`);
else if (notFound.chain.length) issue(probe, 'P1', 'URL inexistente redireciona antes do 404', notFound.chain.map((c) => c.url).join(' → '));

const sample = sitemapPaths.has('/crm-whatsapp/') ? '/crm-whatsapp/' : [...sitemapPaths].find((p) => p !== '/');
if (sample) {
  const noSlash = await request(`${BASE}${sample.replace(/\/$/, '')}`);
  const ok = noSlash.chain[0]?.status === 301 && noSlash.finalUrl?.endsWith(sample) && noSlash.status === 200;
  variants.push({ caso: 'Sem barra final', url: sample.replace(/\/$/, ''), resultado: `${noSlash.chain.map((c) => c.status).join('→')}→${noSlash.status} ${noSlash.finalUrl ? new URL(noSlash.finalUrl).pathname : ''}`, esperado: `301 → ${sample}` });
  if (!ok) issue(sample, 'P1', 'Variação sem barra final não redireciona com 301 para a canônica', variants.at(-1).resultado);

  const withQuery = await request(`${BASE}${sample}?utm_source=auditoria&ref=x`);
  const canon = withQuery.body ? first(withQuery.body, /<link rel="canonical" href="([^"]+)"/) : null;
  variants.push({ caso: 'Com parâmetros', url: `${sample}?utm_source=auditoria&ref=x`, resultado: `${withQuery.status}, canonical ${canon}`, esperado: `200, canonical ${OFFICIAL}${sample}` });
  if (withQuery.status !== 200 || canon !== `${OFFICIAL}${sample}`) issue(sample, 'P1', 'URL com parâmetros sem canonical correto', variants.at(-1).resultado);
}

if (IS_OFFICIAL) {
  for (const [caso, url] of [['HTTP → HTTPS', 'http://vipdesk.com.br/'], ['www → apex', 'https://www.vipdesk.com.br/'], ['http + www', 'http://www.vipdesk.com.br/crm-whatsapp/']]) {
    const r = await request(url);
    const final = r.finalUrl || r.error;
    variants.push({ caso, url, resultado: `${r.chain.map((c) => c.status).join('→')}${r.chain.length ? '→' : ''}${r.status ?? r.error} ${final}`, esperado: `301 → ${OFFICIAL}${new URL(url).pathname}` });
    if (r.error || r.status !== 200 || !r.finalUrl.startsWith(`${OFFICIAL}/`) || !r.chain.length || r.chain.some((c) => c.status !== 301 && c.status !== 308)) {
      issue(url, 'P1', `Variação ${caso} não redireciona permanentemente para a versão oficial`, variants.at(-1).resultado);
    }
  }
} else {
  variants.push({ caso: 'HTTP/HTTPS e www', url: '-', resultado: 'NÃO VERIFICADO (só em produção: SEO_BASE_URL=https://vipdesk.com.br)', esperado: '301 → https://vipdesk.com.br' });
}

// ---------- CTAs e links externos ----------
const ctaSummary = new Map();
for (const c of ctas) {
  const key = `${c.type} | ${c.text} | ${c.href.split('?')[0]}`;
  ctaSummary.set(key, (ctaSummary.get(key) || 0) + 1);
  if (/^mailto:/.test(c.href) && !/^mailto:[^@?]+@[^@?]+\.[a-z]+/i.test(c.href)) issue(c.page, 'P1', 'CTA mailto inválido', c.href);
  if (!c.href || c.href === '#') issue(c.page, 'P1', 'CTA sem destino', c.text);
}
const externalResults = [];
for (const [href, from] of external) {
  const r = await request(href, { method: 'HEAD' });
  const status = r.error ? `NÃO VERIFICADO (${r.error})` : r.status;
  externalResults.push({ href, status, final: r.finalUrl || '', from: [...from].slice(0, 3).join(', ') });
  if (!r.error && r.status >= 400 && r.status !== 405 && r.status !== 403) issue([...from][0], 'P2', 'Link externo quebrado', `${href} → ${r.status}`);
}

if (server) server.close();

// ---------- relatório ----------
const order = { P0: 0, P1: 1, P2: 2, P3: 3 };
issues.sort((a, b) => order[a.priority] - order[b.priority] || a.url.localeCompare(b.url));
for (const r of rows) r.priority = r.problems.map((p) => p.slice(0, 2)).sort((a, b) => order[a] - order[b])[0] || '—';
const esc = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const counts = Object.fromEntries(['P0', 'P1', 'P2', 'P3'].map((p) => [p, issues.filter((i) => i.priority === p).length]));

const md = `# Auditoria de SEO — ${BASE}

Gerado em ${new Date().toISOString()} por \`scripts/audit.mjs\`. HTML analisado como recebido do servidor (sem JavaScript).

Resumo: ${pages.size} URLs rastreadas, ${sitemapLocs.length} no sitemap · P0: ${counts.P0} · P1: ${counts.P1} · P2: ${counts.P2} · P3: ${counts.P3}

## robots.txt e sitemap

| Item | Resultado |
| --- | --- |
| robots.txt | HTTP ${robotsInfo.status}; Sitemap: ${robotsInfo.sitemap || '—'} |
| sitemap.xml | HTTP ${sitemapInfo.status}; bem formado: ${sitemapInfo.wellFormed ? 'sim' : 'não'}; URLs: ${sitemapInfo.urls} |

## Matriz de URLs

| URL | HTTP | Title | Description | H1 | Canonical | Indexável | Problemas | Prioridade |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
${rows.map((r) => `| ${esc(r.url)} | ${esc(r.http)} | ${esc(r.title)} | ${r.description ? `${r.description.length} car.` : '—'} | ${esc(r.h1)} | ${r.canonical ? (r.canonical === `${OFFICIAL}${r.url}` ? 'própria' : esc(r.canonical)) : '—'} | ${esc(r.indexable)} | ${esc(r.problems.join('; ')) || '—'} | ${r.priority} |`).join('\n')}

## Variações de URL e 404

| Caso | URL | Resultado | Esperado |
| --- | --- | --- | --- |
${variants.map((v) => `| ${v.caso} | ${esc(v.url)} | ${esc(v.resultado)} | ${esc(v.esperado)} |`).join('\n')}

## CTAs encontrados (tipo | texto | destino → ocorrências)

${[...ctaSummary].map(([k, n]) => `- ${esc(k)} → ${n}`).join('\n') || '- nenhum'}

## Links externos

| Destino | HTTP | Origem |
| --- | --- | --- |
${externalResults.map((e) => `| ${esc(e.href)} | ${esc(e.status)} | ${esc(e.from)} |`).join('\n') || '| — | — | — |'}

## Comparação com o repositório

${repoDiff.length ? repoDiff.map((d) => `- ${d}`).join('\n') : '- Title, H1 e description de todas as rotas do repositório conferem com o ambiente.'}

## Problemas

| URL | Problema | Evidência | Prioridade |
| --- | --- | --- | --- |
${issues.map((i) => `| ${esc(i.url)} | ${esc(i.problem)} | ${esc(i.evidence)} | ${i.priority} |`).join('\n') || '| — | Nenhum problema encontrado | — | — |'}
`;

const out = argValue('--out');
const jsonOut = argValue('--json');
if (out) await writeFile(out, md);
if (jsonOut) await writeFile(jsonOut, JSON.stringify({ base: BASE, counts, rows, variants, issues, ctas: [...ctaSummary], external: externalResults }, null, 2));
console.log(out ? `Relatório: ${out}\n` : md);
console.log(`Resumo ${BASE}: ${pages.size} URLs · P0=${counts.P0} P1=${counts.P1} P2=${counts.P2} P3=${counts.P3}`);
process.exit(counts.P0 + counts.P1 > 0 ? 1 : 0);
