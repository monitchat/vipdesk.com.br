import { test } from 'node:test';
import assert from 'node:assert/strict';
import { registerPosts } from '../../src/lib/posts.mjs';
import { POSTS } from '../../src/pages/blog/posts.mjs';
import { LASTMOD } from '../../src/routes.mjs';
import { clientAsset } from '../../src/lib/client-asset.mjs';
import { pages, indexablePages, read, jsonLdOf, textOf, metaContent, ORIGIN } from './helpers.mjs';

test('rascunhos incompletos não geram páginas; erros em artigos publicados interrompem registro', () => {
  assert.deepEqual(registerPosts('pt', [{ status: 'draft', slug: 'ainda-em-revisao' }]), []);
  const post = POSTS.pt[0];
  for (const changes of [
    { published: '2026-02-30' }, { modified: '2020-01-01' },
    { slug: '../invalido' }, { body: '' }, { status: 'publsihed' },
  ]) assert.throws(() => registerPosts('pt', [{ ...post, ...changes }]));
  assert.throws(() => registerPosts('pt', [post, post]), /duplicado/);
});

test('cinco artigos completos mantêm resposta inicial, links e datas consistentes', () => {
  assert.equal(POSTS.pt.length, 5, 'não publicar as dez pautas ainda em planejamento');
  const xml = read('sitemap.xml');
  for (const post of Object.values(POSTS).flat()) {
    const page = pages.find((p) => p.path === post.path);
    assert.ok(textOf(post.body).split(/\s+/).length >= 400, `${post.path}: artigo incompleto`);
    assert.ok(page.html.includes(post.summary), `${post.path}: resposta inicial ausente`);
    assert.match(post.body, /<h2>/);
    assert.match(post.body, /href="\//);
    const ld = jsonLdOf(page.html)[0]['@graph'].find((n) => n['@type'] === 'BlogPosting');
    const date = post.modified || post.published;
    assert.equal(ld.dateModified, date);
    assert.equal(LASTMOD[post.path], date);
    assert.ok(xml.includes(`<loc>${ORIGIN}${post.path}</loc>\n    <lastmod>${date}</lastmod>`));
    assert.equal(metaContent(page.html, 'property', 'article:published_time'), post.published);
    if (post.modified) {
      assert.equal(metaContent(page.html, 'property', 'article:modified_time'), date);
      assert.ok(page.html.includes(`<time datetime="${date}">`));
    }
  }
  for (const page of indexablePages.filter((p) => !p.article)) {
    assert.equal(LASTMOD[page.path], undefined, `${page.path}: não fabricar lastmod`);
  }
});

test('metadados sociais explícitos correspondem ao conteúdo da rota', () => {
  for (const page of indexablePages) {
    for (const [twitter, og] of [['title', 'title'], ['description', 'description'], ['image', 'image'], ['image:alt', 'image:alt']]) {
      assert.equal(metaContent(page.html, 'name', `twitter:${twitter}`), metaContent(page.html, 'property', `og:${og}`), page.path);
    }
  }
});

test('buscadores explicitamente permitidos e treinamento com a política wildcard anterior', () => {
  const robots = read('robots.txt');
  const groups = robots.trim().split(/\n\s*\n/);
  for (const bot of ['OAI-SearchBot', 'Googlebot', 'Bingbot', '*']) {
    assert.ok(groups.includes(`User-agent: ${bot}\nAllow: /`), bot);
  }
  assert.doesNotMatch(robots, /GPTBot|ai-train|Google-Extended/);
});

test('schemas têm IDs únicos por documento e FAQ corresponde à resposta inteira', () => {
  for (const page of indexablePages) {
    const nodes = jsonLdOf(page.html)[0]['@graph'];
    const ids = nodes.map((n) => n['@id']);
    assert.equal(new Set(ids).size, ids.length, page.path);
    const faq = nodes.find((n) => n['@type'] === 'FAQPage');
    const visible = textOf(page.html).replace(/\s+([.,;:!?)])/g, '$1');
    for (const question of faq?.mainEntity || []) {
      assert.ok(visible.includes(textOf(question.name)), page.path);
      assert.ok(visible.includes(textOf(question.acceptedAnswer.text)), `${page.path}: resposta incompleta`);
    }
  }
});

test('interações carregam uma única vez via asset compartilhado e defer', () => {
  assert.equal(read(clientAsset.path.slice(1)), clientAsset.content);
  for (const page of pages) {
    assert.equal(page.html.split(`<script defer src="${clientAsset.path}"></script>`).length - 1, 1, page.path);
    assert.ok(!page.html.includes('new MutationObserver'), `${page.path}: JS comum ainda inline`);
  }
});
