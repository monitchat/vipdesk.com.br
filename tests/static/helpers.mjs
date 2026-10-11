import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES, outputFile } from '../../src/routes.mjs';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const ORIGIN = 'https://vipdesk.com.br';

export const read = (rel) => readFileSync(join(ROOT, rel), 'utf8');

export const pages = PAGES.map((p) => ({ ...p, file: outputFile(p), html: read(outputFile(p)) }));
export const indexablePages = pages.filter((p) => p.indexable !== false);

const first = (html, re) => html.match(re)?.[1];
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

export const titleOf = (html) => decode(first(html, /<title>([^<]*)<\/title>/) || '');
export const metaContent = (html, attr, name) => {
  const m = html.match(new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`));
  return m ? decode(m[1]) : undefined;
};
export const canonicalOf = (html) => first(html, /<link rel="canonical" href="([^"]+)">/);
export const h1s = (html) => [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => m[1]);
export const textOf = (s) => decode(s.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
export const jsonLdOf = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
export const hrefs = (html) => [...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)].map((m) => decode(m[1]));
export const ids = (html) => new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));

// Resolve um caminho de URL para o arquivo que o GitHub Pages serviria (sem redirecionar).
export function fileForPath(pathname) {
  const rel = decodeURIComponent(pathname).replace(/^\//, '');
  if (pathname.endsWith('/')) {
    const f = join(ROOT, rel, 'index.html');
    return existsSync(f) ? f : null;
  }
  const f = join(ROOT, rel);
  return existsSync(f) && statSync(f).isFile() ? f : null;
}
