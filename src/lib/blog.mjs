// Templates do blog: página de artigo e índice.
import { SITE } from '../config.mjs';
import { POSTS } from '../pages/blog/posts.mjs';
import { solution } from '../navigation.mjs';
import { html, stripTags, formatDate } from './html.mjs';
import { hero, section, cards, ctaBand } from './components.mjs';
import { blogPosting } from './schema.mjs';

const wordCount = (s) => stripTags(s).split(/\s+/).filter(Boolean).length;

export function articlePage(post) {
  const words = wordCount(post.body);
  const minutes = Math.max(1, Math.round(words / 200));
  const page = {
    path: post.path,
    title: post.title,
    description: post.description,
    h1: post.h1,
    ogType: 'article',
    article: { published: post.published, modified: post.modified },
    breadcrumbs: [
      { name: 'Início', path: '/' },
      { name: 'Blog', path: '/blog/' },
      { name: post.h1, path: post.path },
    ],
  };
  page.jsonLd = [blogPosting(page, { ...post, wordCount: words })];

  const dates = post.modified && post.modified !== post.published
    ? html`Publicado em <time datetime="${post.published}">${formatDate(post.published)}</time> · Atualizado em <time datetime="${post.modified}">${formatDate(post.modified)}</time>`
    : html`Publicado em <time datetime="${post.published}">${formatDate(post.published)}</time>`;

  const related = POSTS.filter((p) => p.path !== post.path);

  page.body = html`
${hero({
  crumbs: page.breadcrumbs,
  eyebrow: 'Blog VipDesk',
  h1: post.h1,
  ctas: false,
  meta: html`Por equipe VipDesk (${SITE.company.name}) · ${dates} · ${minutes} min de leitura`,
})}
<section>
  <article class="artigo">
    <div class="resumo"><p><strong>Resumo:</strong> ${post.summary}</p></div>
    ${post.body}
  </article>
</section>
${section({
  alt: true,
  title: 'Como o VipDesk ajuda',
  content: cards(post.solutions.map((p) => {
    const s = solution(p);
    return { title: s.label, text: s.short, href: s.path };
  })),
})}
${related.length
    ? section({
      title: 'Leia também',
      content: cards(related.map((p) => ({ title: p.h1, text: p.description, href: p.path, linkLabel: 'Ler artigo' }))),
    })
    : ''}
${ctaBand({ location: 'artigo' })}`;
  return page;
}

export function blogIndexPage() {
  const page = {
    path: '/blog/',
    title: 'Blog VipDesk: Atendimento, WhatsApp e Vendas',
    description:
      'Guias práticos sobre atendimento pelo WhatsApp, omnichannel, CRM, automação e operação de equipes de atendimento e vendas.',
    h1: 'Blog do VipDesk',
    schemaType: 'CollectionPage',
    breadcrumbs: [
      { name: 'Início', path: '/' },
      { name: 'Blog', path: '/blog/' },
    ],
  };
  page.body = html`
${hero({
  crumbs: page.breadcrumbs,
  eyebrow: 'Conteúdo',
  h1: page.h1,
  lead: 'Guias práticos para organizar o atendimento, conectar a equipe comercial e usar melhor o WhatsApp e os outros canais da sua empresa.',
  ctas: false,
})}
<section>
  <div class="wrap">
    <div class="posts">${POSTS.map((p) => html`
      <a class="card" href="${p.path}">
        <div class="marcador"></div>
        <h2 style="font-size:20px;letter-spacing:0">${p.h1}</h2>
        <p class="meta-post"><time datetime="${p.published}">${formatDate(p.published)}</time></p>
        <p>${p.description}</p>
        <span class="mais">Ler artigo <span aria-hidden="true">→</span></span>
      </a>`)}
    </div>
  </div>
</section>
${ctaBand({ location: 'blog' })}`;
  return page;
}

