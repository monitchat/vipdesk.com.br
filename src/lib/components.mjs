// Componentes reutilizáveis das páginas.
import { SITE, DEMO_HREF, CONTACT_HREF } from '../config.mjs';
import { SOLUTIONS, solution } from '../navigation.mjs';
import { esc, html } from './html.mjs';

// CTAs padronizados. `data-cta` alimenta a medição (ver docs/SEO-STRATEGY.md#mensuração).
export const demoButton = (location, cls = 'btn-claro') =>
  html`<a class="btn ${cls}" href="${esc(DEMO_HREF)}" data-cta="demo_request" data-cta-local="${location}">Agendar demonstração</a>`;

export const trialButton = (location, cls = 'btn-fantasma') =>
  SITE.trialUrl
    ? html`<a class="btn ${cls}" href="${esc(SITE.trialUrl)}" data-cta="trial_start" data-cta-local="${location}">Experimentar grátis</a>`
    : '';

export const contactButton = (location, cls = 'btn-fantasma') =>
  html`<a class="btn ${cls}" href="${esc(CONTACT_HREF)}" data-cta="contact_click" data-cta-local="${location}">Falar com especialista</a>`;

// Par de CTAs principal: demonstração + (teste grátis, se houver URL confirmada; senão, especialista).
export const ctaPair = (location) =>
  html`${demoButton(location)}${SITE.trialUrl ? trialButton(location) : contactButton(location)}`;

export const breadcrumbs = (crumbs, { light = false } = {}) => html`
<nav class="trilha${light ? ' clara' : ''}" aria-label="Você está em">
  <ol>${crumbs.map((c, i) =>
    i === crumbs.length - 1
      ? html`<li><span aria-current="page">${esc(c.name)}</span></li>`
      : html`<li><a href="${c.path}">${esc(c.name)}</a></li>`)}</ol>
</nav>`;

export const hero = ({ eyebrow, h1, lead, crumbs, ctas = true, note, meta, location = 'hero' }) => html`
<div class="hero${crumbs ? ' hero-interno' : ''}">
  <div class="wrap">
    ${crumbs ? breadcrumbs(crumbs) : ''}
    ${eyebrow ? html`<div class="selo">${eyebrow}</div>` : ''}
    <h1>${h1}</h1>
    ${lead ? html`<p class="sub">${lead}</p>` : ''}
    ${meta ? html`<p class="meta-post">${meta}</p>` : ''}
    ${ctas ? html`<div class="acoes">${ctaPair(location)}</div>` : ''}
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

export const cards = (items) => html`
<div class="grade">${items.map((it) => it.href
  ? html`<a class="card" href="${it.href}"><div class="marcador"></div><h3>${it.title}</h3><p>${it.text}</p><span class="mais">${it.linkLabel || 'Saiba mais'} <span aria-hidden="true">→</span></span></a>`
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

export const ctaBand = ({ title = 'Veja o VipDesk funcionando na sua operação', text, location = 'faixa_final' }) => html`
<section class="alt" id="contato">
  <div class="wrap">
    <div class="faixa">
      <h2>${title}</h2>
      <p>${text || 'Fale com o time comercial e agende uma demonstração com os canais, o funil e a rotina da sua equipe.'}</p>
      <div class="acoes">${ctaPair(location)}</div>
      <p class="email">Prefere escrever direto? <a href="mailto:${SITE.emails.sales}" data-cta="contact_click" data-cta-local="${location}_email">${SITE.emails.sales}</a></p>
    </div>
  </div>
</section>`;

// Cards de outras soluções, para a navegação entre páginas comerciais.
export const relatedSolutions = (paths, { title = 'Recursos relacionados', alt = false } = {}) =>
  section({
    alt,
    title,
    content: cards(paths.map((p) => {
      const s = solution(p);
      return { title: s.label, text: s.short, href: s.path };
    })),
  });

export const allSolutionCards = () =>
  cards(SOLUTIONS.map((s) => ({ title: s.label, text: s.short, href: s.path })));
