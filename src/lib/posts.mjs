import { ui } from '../i18n.mjs';

const validDate = (value) => typeof value === 'string'
  && /^\d{4}-\d{2}-\d{2}$/.test(value)
  && Number.isFinite(Date.parse(value))
  && new Date(value).toISOString().slice(0, 10) === value;

// Rascunhos não geram rota, cards, hreflang nem sitemap. Ausência de status preserva
// os artigos já publicados. Datas são editoriais; o build nunca fabrica lastmod.
export function registerPosts(lang, posts) {
  const seen = new Set();
  return posts.filter((post) => {
    if (post.status && !['draft', 'published'].includes(post.status)) {
      throw new Error(`Status editorial inválido: ${post.slug}`);
    }
    return post.status !== 'draft';
  }).map((post) => {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug) || seen.has(post.slug)) {
      throw new Error(`Slug inválido ou duplicado: ${post.slug}`);
    }
    seen.add(post.slug);
    for (const field of ['key', 'title', 'description', 'h1', 'summary', 'body']) {
      if (typeof post[field] !== 'string' || !post[field].trim()) {
        throw new Error(`${post.slug}: falta ${field}`);
      }
    }
    if (!validDate(post.published) || (post.modified &&
        (!validDate(post.modified) || post.modified < post.published))) {
      throw new Error(`Data editorial inválida: ${post.slug}`);
    }
    if (!Array.isArray(post.solutions) || !post.solutions.length) {
      throw new Error(`${post.slug}: faltam soluções relacionadas`);
    }
    return { ...post, lang, path: `${ui(lang).paths.blog}${post.slug}/` };
  }).sort((a, b) => b.published.localeCompare(a.published));
}
