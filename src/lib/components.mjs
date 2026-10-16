// Componentes reutilizáveis das páginas. Todo texto de interface vem de src/i18n.mjs.
import { SITE, demoHref, contactHref } from '../config.mjs';
import { SOLUTIONS, solution } from '../navigation.mjs';
import { ui } from '../i18n.mjs';
import { esc, html } from './html.mjs';

// Mensagem que o botão escreve no formulário de contato (só quando o CTA leva a ele).
const formMsg = (lang, type, href) => {
  const f = SITE.contactForm[lang];
  return f && href === '#contato' && f.messages[type]
    ? html` data-form-field="${f.messageField}" data-form-msg="${esc(f.messages[type])}"`
    : '';
};

// CTAs padronizados. `data-cta` alimenta a medição (ver docs/SEO-STRATEGY.md#mensuração).
export const demoButton = (location, lang, cls = 'btn-claro') =>
  html`<a class="btn ${cls}" href="${esc(demoHref(lang))}" data-cta="demo_request" data-cta-local="${location}"${formMsg(lang, 'demo_request', demoHref(lang))}>${ui(lang).demo}</a>`;

export const trialButton = (location, lang, cls = 'btn-fantasma') =>
  SITE.trialUrl
    ? html`<a class="btn ${cls}" href="${esc(SITE.trialUrl)}" data-cta="trial_start" data-cta-local="${location}">${ui(lang).trial}</a>`
    : '';

export const contactButton = (location, lang, cls = 'btn-fantasma') =>
  html`<a class="btn ${cls}" href="${esc(contactHref(lang))}" data-cta="contact_click" data-cta-local="${location}"${formMsg(lang, 'contact_click', contactHref(lang))}>${ui(lang).specialist}</a>`;

// Par de CTAs principal: demonstração + (teste grátis, se houver URL confirmada; senão, especialista).
export const ctaPair = (location, lang) =>
  html`${demoButton(location, lang)}${SITE.trialUrl ? trialButton(location, lang) : contactButton(location, lang)}`;

export const breadcrumbs = (crumbs, { light = false, lang }) => html`
<nav class="trilha${light ? ' clara' : ''}" aria-label="${ui(lang).breadcrumbAria}">
  <ol>${crumbs.map((c, i) =>
    i === crumbs.length - 1
      ? html`<li><span aria-current="page">${esc(c.name)}</span></li>`
      : html`<li><a href="${c.path}">${esc(c.name)}</a></li>`)}</ol>
</nav>`;

export const hero = ({ eyebrow, h1, lead, crumbs, ctas = true, note, meta, location = 'hero', lang }) => html`
<div class="hero${crumbs ? ' hero-interno' : ''}">
  <div class="wrap">
    ${crumbs ? breadcrumbs(crumbs, { lang }) : ''}
    ${eyebrow ? html`<div class="selo">${eyebrow}</div>` : ''}
    <h1>${h1}</h1>
    ${lead ? html`<p class="sub">${lead}</p>` : ''}
    ${meta ? html`<p class="meta-post">${meta}</p>` : ''}
    ${ctas ? html`<div class="acoes">${ctaPair(location, lang)}</div>` : ''}
    ${note ? html`<p class="nota">${note}</p>` : ''}
  </div>
</div>`;

export const section = ({ id, alt = false, title, intro, content }) => html`
<section${id ? html` id="${id}"` : ''}${alt ? ' class="alt"' : ''}>
  <div class="wrap">
    ${title ? html`<div class="cabeca"><h2>${title}</h2>${intro ? html`<p>${intro}</p>` : ''}</div>` : ''}
    ${content}
  </div>
</section>`;

export const cards = (items, lang) => html`
<div class="grade">${items.map((it) => it.href
  ? html`<a class="card" href="${it.href}"><div class="marcador"></div><h3>${it.title}</h3><p>${it.text}</p><span class="mais">${it.linkLabel || ui(lang).learnMore} <span aria-hidden="true">→</span></span></a>`
  : html`<div class="card"><div class="marcador"></div><h3>${it.title}</h3><p>${it.text}</p>${it.link ? html`<a class="mais" href="${it.link.href}">${it.link.label} <span aria-hidden="true">→</span></a>` : ''}</div>`)}
</div>`;

export const list = (items) => html`<ul class="lista">${items.map((i) => html`<li>${i}</li>`)}</ul>`;

export const steps = (items) => html`
<ol class="passos">${items.map((s) => html`<li><h3>${s.title}</h3><p>${s.text}</p></li>`)}</ol>`;

export const panels = (items) => html`
<div class="duas">${items.map((p) => html`<div class="painel"><h3>${p.title}</h3>${p.text ? html`<p>${p.text}</p>` : ''}${p.list ? list(p.list) : ''}</div>`)}</div>`;

export const faq = (items) => html`
<div class="faq">${items.map((f) => html`
  <details>
    <summary><h3>${f.q}</h3></summary>
    <div class="resposta">${f.a}</div>
  </details>`)}
</div>`;

// Formulário de contato embutido (widget externo). Sem JavaScript, os botões e o e-mail da faixa continuam valendo.
const contactForm = (lang) => {
  const f = SITE.contactForm[lang];
  return f ? html`
      <div class="form-contato"><div id="${f.id}"></div></div>
      <script src="${f.widget}" data-config="${f.config}" data-target="${f.id}" async></script>` : '';
};

export const ctaBand = ({ title, text, location = 'faixa_final', lang }) => {
  const t = ui(lang);
  return html`
<section class="alt" id="contato">
  <div class="wrap">
    <div class="faixa">
      <h2>${title || t.ctaTitle}</h2>
      <p>${text || t.ctaText}</p>
      ${SITE.contactForm[lang] ? contactForm(lang) : html`<div class="acoes">${ctaPair(location, lang)}</div>`}
      <p class="email">${t.ctaEmail} <a href="mailto:${SITE.emails.sales}" data-cta="contact_click" data-cta-local="${location}_email">${SITE.emails.sales}</a></p>
    </div>
  </div>
</section>`;
};

// Cards de outras soluções, para a navegação entre páginas comerciais.
export const relatedSolutions = (paths, { title, alt = false, lang }) =>
  section({
    alt,
    title: title || ui(lang).related,
    content: cards(paths.map((p) => {
      const s = solution(p);
      return { title: s.label, text: s.short, href: s.path };
    }), lang),
  });

export const allSolutionCards = (lang) =>
  cards(SOLUTIONS[lang].map((s) => ({ title: s.label, text: s.short, href: s.path })), lang);
