// Templates do blog: página de artigo e índice, em qualquer idioma.
import { SITE } from '../config.mjs';
import { POSTS } from '../pages/blog/posts.mjs';
import { solution } from '../navigation.mjs';
import { ui } from '../i18n.mjs';
import { html, stripTags } from './html.mjs';
import { hero, section, cards, ctaBand } from './components.mjs';
import { blogPosting } from './schema.mjs';

const wordCount = (s) => stripTags(s).split(/\s+/).filter(Boolean).length;

export function articlePage(post) {
  const { lang } = post;
  const t = ui(lang);
  const words = wordCount(post.body);
  const minutes = Math.max(1, Math.round(words / 200));
  const page = {
    lang,
    key: post.key,
    path: post.path,
    title: post.title,
    description: post.description,
    h1: post.h1,
    ogType: 'article',
    article: { published: post.published, modified: post.modified },
    breadcrumbs: [
      { name: t.home, path: t.paths.home },
      { name: t.blog, path: t.paths.blog },
      { name: post.h1, path: post.path },
    ],
  };
  page.jsonLd = [blogPosting(page, { ...post, wordCount: words })];

  const dates = post.modified && post.modified !== post.published
    ? html`${t.published} <time datetime="${post.published}">${t.formatDate(post.published)}</time> · ${t.updated} <time datetime="${post.modified}">${t.formatDate(post.modified)}</time>`
    : html`${t.published} <time datetime="${post.published}">${t.formatDate(post.published)}</time>`;

  const related = POSTS[lang].filter((p) => p.path !== post.path);

  page.body = html`
${hero({
  crumbs: page.breadcrumbs,
  eyebrow: t.blogEyebrow,
  h1: post.h1,
  ctas: false,
  meta: html`${t.byline(SITE.company.name)} · ${dates} · ${t.minutes(minutes)}`,
  lang,
})}
<section>
  <article class="artigo">
    <div class="resumo"><p><strong>${t.summary}</strong> ${post.summary}</p></div>
    ${post.body}
  </article>
</section>
${section({
  alt: true,
  title: t.howHelps,
  content: cards(post.solutions.map((p) => {
    const s = solution(p);
    return { title: s.label, text: s.short, href: s.path };
  }), lang),
})}
${related.length
    ? section({
      title: t.readAlso,
      content: cards(related.map((p) => ({ title: p.h1, text: p.description, href: p.path, linkLabel: t.readArticle })), lang),
    })
    : ''}
${ctaBand({ location: 'artigo', lang })}`;
  return page;
}

const INDEX = {
  pt: {
    title: 'Blog VipDesk: Atendimento, WhatsApp e Vendas',
    description:
      'Guias práticos sobre atendimento pelo WhatsApp, omnichannel, CRM, automação e operação de equipes de atendimento e vendas.',
    h1: 'Blog do VipDesk',
    eyebrow: 'Conteúdo',
    lead: 'Guias práticos para organizar o atendimento, conectar a equipe comercial e usar melhor o WhatsApp e os outros canais da sua empresa.',
  },
  en: {
    title: 'VipDesk Blog: Customer Service, WhatsApp and Sales',
    description:
      'Practical guides on WhatsApp customer service, omnichannel support, CRM, automation and running customer service and sales teams.',
    h1: 'The VipDesk Blog',
    eyebrow: 'Resources',
    lead: 'Practical guides to organize customer service, connect your sales team and get more out of WhatsApp and your other channels.',
  },
};

export function blogIndexPage(lang) {
  const t = ui(lang);
  const c = INDEX[lang];
  const page = {
    lang,
    key: 'blog',
    path: t.paths.blog,
    title: c.title,
    description: c.description,
    h1: c.h1,
    schemaType: 'CollectionPage',
    breadcrumbs: [
      { name: t.home, path: t.paths.home },
      { name: t.blog, path: t.paths.blog },
    ],
  };
  page.body = html`
${hero({ crumbs: page.breadcrumbs, eyebrow: c.eyebrow, h1: c.h1, lead: c.lead, ctas: false, lang })}
<section>
  <div class="wrap">
    <div class="posts">${POSTS[lang].map((p) => html`
      <a class="card" href="${p.path}">
        <div class="marcador"></div>
        <h2 style="font-size:20px;letter-spacing:0">${p.h1}</h2>
        <p class="meta-post"><time datetime="${p.published}">${t.formatDate(p.published)}</time></p>
        <p>${p.description}</p>
        <span class="mais">${t.readArticle} <span aria-hidden="true">→</span></span>
      </a>`)}
    </div>
  </div>
</section>
${ctaBand({ location: 'blog', lang })}`;
  return page;
}
