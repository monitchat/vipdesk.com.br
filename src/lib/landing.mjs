// Template das páginas comerciais (soluções), em qualquer idioma.
import { html } from './html.mjs';
import { hero, section, faq, ctaBand, relatedSolutions, cards } from './components.mjs';
import { faqPage } from './schema.mjs';
import { solution } from '../navigation.mjs';
import { ui } from '../i18n.mjs';
import { POSTS } from '../pages/blog/posts.mjs';

/**
 * @param {object} def
 * @param {'pt'|'en'} def.lang
 * @param {string} def.path        rota com barra final, ex.: '/crm-whatsapp/'
 * @param {string} def.title       <title> (até ~60 caracteres)
 * @param {string} def.description meta description (até ~155 caracteres)
 * @param {string} def.h1
 * @param {string} def.lead        subtítulo do hero
 * @param {Array<{title?:string,intro?:string,content:string,id?:string}>} def.sections
 * @param {Array<{q:string,a:string}>} def.faqs  perguntas visíveis (também viram FAQPage)
 * @param {string[]} def.related   rotas de outras soluções (mesmo idioma)
 * @param {string[]} [def.posts]   rotas de artigos de apoio (mesmo idioma)
 * @param {{title?:string,text?:string}} [def.cta]
 */
export function landingPage(def) {
  const { lang } = def;
  const t = ui(lang);
  const sol = solution(def.path);
  const page = {
    lang,
    key: `solution-${sol.key}`,
    path: def.path,
    title: def.title,
    description: def.description,
    h1: def.h1,
    breadcrumbs: [
      { name: t.home, path: t.paths.home },
      { name: sol.label, path: def.path },
    ],
  };
  page.jsonLd = [faqPage(page, def.faqs)];
  page.about = { '@id': 'https://vipdesk.com.br/#software' };

  const posts = (def.posts || []).map((p) => {
    const post = POSTS[lang].find((x) => x.path === p);
    if (!post) throw new Error(`Artigo inexistente em ${def.path}: ${p}`);
    return post;
  });

  page.body = html`
${hero({ crumbs: page.breadcrumbs, eyebrow: sol.label, h1: def.h1, lead: def.lead, location: 'hero', lang })}
${def.sections.map((s) => ({ ...s, content: typeof s.content === 'function' ? s.content(lang) : s.content }))
    .map((s, i) => section({ ...s, alt: i % 2 === 1 }))}
${section({
  id: 'perguntas',
  alt: def.sections.length % 2 === 1,
  title: t.faqLong,
  content: faq(def.faqs),
})}
${relatedSolutions(def.related, { alt: def.sections.length % 2 === 0, lang })}
${posts.length
    ? section({
      alt: def.sections.length % 2 === 1,
      title: t.deeper,
      content: cards(posts.map((p) => ({ title: p.h1, text: p.description, href: p.path, linkLabel: t.readArticle })), lang),
    })
    : ''}
${ctaBand({ ...def.cta, location: 'faixa_final', lang })}`;
  return page;
}
