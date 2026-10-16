// Documento HTML completo: <head> com SEO, cabeçalho, rodapé e script mínimo.
import { readFileSync } from 'node:fs';
import { SITE, absoluteUrl } from '../config.mjs';
import { SOLUTIONS } from '../navigation.mjs';
import { LOCALES, DEFAULT_FOR_UNMATCHED, ui } from '../i18n.mjs';
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

// Fecha menus abertos ao clicar fora/Esc e envia cliques de CTA ao Google Analytics como o evento
// `cta_click` (parâmetros cta_type e cta_location). É um clique (intenção), não um lead confirmado.
// Botão com `data-form-msg` escreve a mensagem no campo do formulário de contato (widget carrega
// async: tenta por até 10 s). Não apaga o que o visitante digitou — só troca vazio ou a mensagem anterior.
const SCRIPT = `(function(){var m=function(){return document.querySelectorAll('details.menu[open]')};document.addEventListener('click',function(e){m().forEach(function(d){if(!d.contains(e.target))d.removeAttribute('open')});var a=e.target.closest&&e.target.closest('[data-cta]');if(a&&typeof window.gtag==='function'){window.gtag('event','cta_click',{cta_type:a.getAttribute('data-cta'),cta_location:a.getAttribute('data-cta-local')||'',link_url:a.href})}var f=e.target.closest&&e.target.closest('[data-form-msg]');if(f){var msg=f.getAttribute('data-form-msg'),fld=f.getAttribute('data-form-field'),prev=window.__vdFormMsg,n=0;window.__vdFormMsg=msg;(function t(){var x=document.querySelector('#contato [name="'+fld+'"]');if(x){if(!x.value||x.value===prev){x.value=msg;x.dispatchEvent(new Event('input',{bubbles:true}))}}else if(n++<40)setTimeout(t,250)})()}});document.addEventListener('keydown',function(e){if(e.key==='Escape')m().forEach(function(d){d.removeAttribute('open');var s=d.querySelector('summary');if(s)s.focus()})})})();`;

// Tag do Google Analytics 4, exatamente como fornecida pelo Google (gtag.js), carregada de forma
// assíncrona: não bloqueia a renderização.
const analytics = () => (SITE.ga4Id
  ? html`<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${SITE.ga4Id}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${SITE.ga4Id}');
</script>`
  : '');

const logo = html`<picture><source type="image/webp" srcset="/assets/vipdesk-icon-68.webp"><img src="/assets/vipdesk-icon-68.png" width="52" height="34" alt=""></picture>`;

const current = (page, path) => (page.path === path ? ' aria-current="page"' : '');

const solutionLinks = (page) =>
  SOLUTIONS[page.lang].map((s) => html`<a href="${s.path}"${current(page, s.path)}><b>${s.label}</b><small>${s.short}</small></a>`);

// Âncora de contato: a faixa de CTA da própria página, quando existir; senão, a da home do idioma.
const contactAnchor = (page) => (page.body.includes('id="contato"') ? '#contato' : `${ui(page.lang).paths.home}#contato`);

// Link para a mesma página no outro idioma (ou para a home dele, se não houver tradução).
const languageLinks = (page) =>
  LOCALES.filter((l) => l !== page.lang).map((l) => {
    const target = page.alternates?.find((a) => a.lang === l)?.path || ui(l).paths.home;
    const t = ui(l);
    return { href: target, hreflang: t.hreflang, label: t.languageName, aria: t.switchLabel };
  });

const header = (page) => {
  const t = ui(page.lang);
  const blogPath = t.paths.blog;
  const langs = languageLinks(page);
  return html`
<a class="pular" href="#conteudo">${t.skip}</a>
<header class="topo">
  <div class="wrap nav">
    <a class="marca" href="${t.paths.home}" aria-label="${t.homeAria}">${logo}<span>vip<b>Desk</b></span></a>
    <nav class="nav-links" aria-label="${t.mainNav}">
      <details class="menu">
        <summary>${t.solutions}</summary>
        <div class="submenu">${solutionLinks(page)}</div>
      </details>
      <a href="${blogPath}"${page.path.startsWith(blogPath) ? ' aria-current="page"' : ''}>${t.blog}</a>
      <a href="${t.paths.home}#perguntas">${t.faqShort}</a>
      <a href="${contactAnchor(page)}">${t.contact}</a>
      ${langs.map((l) => html`<a class="idioma" href="${l.href}" hreflang="${l.hreflang}" lang="${l.hreflang}" aria-label="${l.aria}">${l.label}</a>`)}
    </nav>
    <a class="btn btn-primario" href="${SITE.appUrl}" data-cta="app_access" data-cta-local="topo">${t.appAccess}</a>
    <details class="menu menu-movel">
      <summary>${t.menu}</summary>
      <nav class="submenu" aria-label="${t.menu}">
        ${solutionLinks(page)}
        <a href="${blogPath}"><b>${t.blog}</b></a>
        <a href="${t.paths.home}#perguntas"><b>${t.faqLong}</b></a>
        <a href="${contactAnchor(page)}"><b>${t.contact}</b></a>
        ${langs.map((l) => html`<a href="${l.href}" hreflang="${l.hreflang}" lang="${l.hreflang}" aria-label="${l.aria}"><b>${l.label}</b></a>`)}
        <a class="btn btn-primario" href="${SITE.appUrl}" data-cta="app_access" data-cta-local="menu_movel">${t.appAccess}</a>
      </nav>
    </details>
  </div>
</header>`;
};

const footer = (page) => {
  const t = ui(page.lang);
  return html`
<footer class="rodape">
  <div class="wrap">
    <div class="rodape-grade">
      <div>
        <a class="marca" href="${t.paths.home}" style="margin-bottom:14px">${logo}<span style="color:#fff">vip<b>Desk</b></span></a>
        <p style="max-width:38ch">${t.footerTagline(SITE.company.name)}</p>
      </div>
      <nav aria-label="${t.solutions}">
        <p class="rodape-titulo">${t.solutions}</p>
        <ul class="rodape-links">${SOLUTIONS[page.lang].map((s) => html`<li><a href="${s.path}">${s.label}</a></li>`)}</ul>
      </nav>
      <nav aria-label="${t.footerPlatformAria}">
        <p class="rodape-titulo">${t.footerPlatform}</p>
        <ul class="rodape-links">
          <li><a href="${t.paths.home}#recursos">${t.footerFeatures}</a></li>
          <li><a href="${t.paths.home}#agenda">${t.footerCalendar}</a></li>
          <li><a href="${t.paths.blog}">${t.blog}</a></li>
          <li><a href="${SITE.appUrl}" data-cta="app_access" data-cta-local="rodape">${t.appAccess}</a></li>
          ${languageLinks(page).map((l) => html`<li><a href="${l.href}" hreflang="${l.hreflang}" lang="${l.hreflang}">${l.label}</a></li>`)}
        </ul>
      </nav>
      <nav aria-label="${t.footerLegal}">
        <p class="rodape-titulo">${t.footerLegal}</p>
        <ul class="rodape-links">
          <li><a href="${t.paths.privacy}">${t.privacy}</a></li>
          <li><a href="${t.paths.terms}">${t.terms}</a></li>
          <li><a href="mailto:${SITE.emails.sales}" data-cta="contact_click" data-cta-local="rodape">${SITE.emails.sales}</a></li>
          <li><a href="mailto:${SITE.emails.support}">${SITE.emails.support}</a></li>
        </ul>
      </nav>
    </div>
    <div class="rodape-fim">
      <span>${t.address(SITE.company)}</span>
      <span>${t.rights(SITE.company.name)}</span>
    </div>
  </div>
</footer>`;
};

const head = (page) => {
  const t = ui(page.lang);
  const url = absoluteUrl(page.path);
  const og = SITE.ogImage[page.lang];
  const ogImage = absoluteUrl(og.path);
  const nodes = [organization(), website(), webPage(page)];
  if (page.breadcrumbs) nodes.push(breadcrumbList(page));
  nodes.push(...(page.jsonLd || []));
  const alternates = page.indexable === false ? [] : page.alternates || [];
  const unmatched = alternates.find((a) => a.lang === DEFAULT_FOR_UNMATCHED);

  return html`<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${analytics()}
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
${page.indexable === false
    ? html`<meta name="robots" content="noindex, follow">`
    : html`<link rel="canonical" href="${url}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">`}
${alternates.map((a) => html`<link rel="alternate" hreflang="${ui(a.lang).hreflang}" href="${absoluteUrl(a.path)}">
`)}${unmatched ? html`<link rel="alternate" hreflang="x-default" href="${absoluteUrl(unmatched.path)}">` : ''}
<meta name="theme-color" content="${SITE.themeColor}">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/assets/favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<meta property="og:type" content="${page.ogType || 'website'}">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:locale" content="${t.ogLocale}">
${alternates.filter((a) => a.lang !== page.lang).map((a) => html`<meta property="og:locale:alternate" content="${ui(a.lang).ogLocale}">
`)}<meta property="og:title" content="${esc(page.ogTitle || page.title)}">
<meta property="og:description" content="${esc(page.ogDescription || page.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="${SITE.ogImage.width}">
<meta property="og:image:height" content="${SITE.ogImage.height}">
<meta property="og:image:alt" content="${esc(og.alt)}">
${page.article ? html`<meta property="article:published_time" content="${page.article.published}">
${page.article.modified ? html`<meta property="article:modified_time" content="${page.article.modified}">` : ''}` : ''}
<meta name="twitter:card" content="summary_large_image">
<link rel="preload" href="/assets/fonts/nunito-latin.woff2" as="font" type="font/woff2" crossorigin>
<style>${CSS}</style>
${page.indexable === false ? '' : html`<script type="application/ld+json">${jsonForScript(graph(nodes))}</script>`}
</head>`;
};

export const renderPage = (page) => html`<!DOCTYPE html>
<html lang="${ui(page.lang).htmlLang}">
${head(page)}
<body>
${header(page)}
<main id="conteudo" tabindex="-1">
${page.body}
</main>
${footer(page)}
<script>${SCRIPT}</script>
</body>
</html>
`;
