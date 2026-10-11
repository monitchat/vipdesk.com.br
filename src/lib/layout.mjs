// Documento HTML completo: <head> com SEO, cabeçalho, rodapé e script mínimo.
import { readFileSync } from 'node:fs';
import { SITE, absoluteUrl } from '../config.mjs';
import { SOLUTIONS } from '../navigation.mjs';
import { esc, html, jsonForScript } from './html.mjs';
import { graph, organization, website, webPage, breadcrumbList } from './schema.mjs';

const minifyCss = (css) =>
  css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();

const CSS = minifyCss(readFileSync(new URL('../styles.css', import.meta.url), 'utf8'));

// Fecha menus abertos ao clicar fora/Esc e registra cliques de CTA em window.dataLayer
// (só é lido se um gerenciador de tags for instalado; nada é enviado a terceiros).
const SCRIPT = `(function(){var m=function(){return document.querySelectorAll('details.menu[open]')};document.addEventListener('click',function(e){m().forEach(function(d){if(!d.contains(e.target))d.removeAttribute('open')});var a=e.target.closest&&e.target.closest('[data-cta]');if(a){(window.dataLayer=window.dataLayer||[]).push({event:'cta_click',cta_type:a.getAttribute('data-cta'),cta_location:a.getAttribute('data-cta-local')||'',page_path:location.pathname})}});document.addEventListener('keydown',function(e){if(e.key==='Escape')m().forEach(function(d){d.removeAttribute('open');var s=d.querySelector('summary');if(s)s.focus()})})})();`;

const logo = html`<picture><source type="image/webp" srcset="/assets/vipdesk-icon-68.webp"><img src="/assets/vipdesk-icon-68.png" width="52" height="34" alt=""></picture>`;

const current = (page, path) => (page.path === path ? ' aria-current="page"' : '');
const inBlog = (page) => page.path.startsWith('/blog/');

const solutionLinks = (page) =>
  SOLUTIONS.map((s) => html`<a href="${s.path}"${current(page, s.path)}><b>${s.label}</b><small>${s.short}</small></a>`);

// Âncora de contato: a faixa de CTA da própria página, quando existir; senão, a da home.
const contactHref = (page) => (page.body.includes('id="contato"') ? '#contato' : '/#contato');

const header = (page) => html`
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<header class="topo">
  <div class="wrap nav">
    <a class="marca" href="/" aria-label="VipDesk — página inicial">${logo}<span>vip<b>Desk</b></span></a>
    <nav class="nav-links" aria-label="Principal">
      <details class="menu">
        <summary>Soluções</summary>
        <div class="submenu">${solutionLinks(page)}</div>
      </details>
      <a href="/blog/"${inBlog(page) ? ' aria-current="page"' : ''}>Blog</a>
      <a href="/#perguntas">Perguntas</a>
      <a href="${contactHref(page)}">Contato</a>
    </nav>
    <a class="btn btn-primario" href="${SITE.appUrl}" data-cta="app_access" data-cta-local="topo">Acessar a plataforma</a>
    <details class="menu menu-movel">
      <summary>Menu</summary>
      <nav class="submenu" aria-label="Menu">
        ${solutionLinks(page)}
        <a href="/blog/"><b>Blog</b></a>
        <a href="/#perguntas"><b>Perguntas frequentes</b></a>
        <a href="${contactHref(page)}"><b>Contato</b></a>
        <a class="btn btn-primario" href="${SITE.appUrl}" data-cta="app_access" data-cta-local="menu_movel">Acessar a plataforma</a>
      </nav>
    </details>
  </div>
</header>`;

const footer = () => html`
<footer class="rodape">
  <div class="wrap">
    <div class="rodape-grade">
      <div>
        <a class="marca" href="/" style="margin-bottom:14px">${logo}<span style="color:#fff">vip<b>Desk</b></span></a>
        <p style="max-width:38ch">
          Plataforma de atendimento omnichannel, CRM e agenda.
          Uma solução ${SITE.company.name}.
        </p>
      </div>
      <nav aria-label="Soluções">
        <p class="rodape-titulo">Soluções</p>
        <ul class="rodape-links">${SOLUTIONS.map((s) => html`<li><a href="${s.path}">${s.label}</a></li>`)}</ul>
      </nav>
      <nav aria-label="Plataforma e conteúdo">
        <p class="rodape-titulo">Plataforma</p>
        <ul class="rodape-links">
          <li><a href="/#recursos">Recursos</a></li>
          <li><a href="/#agenda">Integração de agenda</a></li>
          <li><a href="/blog/">Blog</a></li>
          <li><a href="${SITE.appUrl}" data-cta="app_access" data-cta-local="rodape">Acessar a plataforma</a></li>
        </ul>
      </nav>
      <nav aria-label="Legal e contato">
        <p class="rodape-titulo">Legal e contato</p>
        <ul class="rodape-links">
          <li><a href="/privacy/">Política de Privacidade</a></li>
          <li><a href="/terms/">Termos de Uso</a></li>
          <li><a href="mailto:${SITE.emails.sales}" data-cta="contact_click" data-cta-local="rodape">${SITE.emails.sales}</a></li>
          <li><a href="mailto:${SITE.emails.support}">${SITE.emails.support}</a></li>
        </ul>
      </nav>
    </div>
    <div class="rodape-fim">
      <span>${SITE.company.name} · CNPJ ${SITE.company.taxId} · ${SITE.company.street} — ${SITE.company.district}, ${SITE.company.city}/${SITE.company.region}, CEP ${SITE.company.postalCode}</span>
      <span>© 2026 ${SITE.company.name}. Todos os direitos reservados.</span>
    </div>
  </div>
</footer>`;

const head = (page) => {
  const url = absoluteUrl(page.path);
  const ogImage = absoluteUrl(SITE.ogImage.path);
  const nodes = [organization(), website(), webPage(page)];
  if (page.breadcrumbs) nodes.push(breadcrumbList(page));
  nodes.push(...(page.jsonLd || []));

  return html`<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
${page.indexable === false
    ? html`<meta name="robots" content="noindex, follow">`
    : html`<link rel="canonical" href="${url}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">`}
<meta name="theme-color" content="${SITE.themeColor}">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/assets/favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<meta property="og:type" content="${page.ogType || 'website'}">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:locale" content="${SITE.ogLocale}">
<meta property="og:title" content="${esc(page.ogTitle || page.title)}">
<meta property="og:description" content="${esc(page.ogDescription || page.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="${SITE.ogImage.width}">
<meta property="og:image:height" content="${SITE.ogImage.height}">
<meta property="og:image:alt" content="${esc(SITE.ogImage.alt)}">
${page.article ? html`<meta property="article:published_time" content="${page.article.published}">
${page.article.modified ? html`<meta property="article:modified_time" content="${page.article.modified}">` : ''}` : ''}
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap">
<style>${CSS}</style>
${page.indexable === false ? '' : html`<script type="application/ld+json">${jsonForScript(graph(nodes))}</script>`}
</head>`;
};

export const renderPage = (page) => html`<!DOCTYPE html>
<html lang="${SITE.lang}">
${head(page)}
<body>
${header(page)}
<main id="conteudo" tabindex="-1">
${page.body}
</main>
${footer()}
<script>${SCRIPT}</script>
</body>
</html>
`;
