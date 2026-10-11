// Gera o site estático na raiz do repositório (publicada pelo GitHub Pages).
//   node scripts/build.mjs          escreve os arquivos
//   node scripts/build.mjs --check  só compara; sai com erro se algo estiver desatualizado
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, absoluteUrl } from '../src/config.mjs';
import { PAGES, LASTMOD, outputFile } from '../src/routes.mjs';
import { renderPage } from '../src/lib/layout.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');

const indexable = PAGES.filter((p) => p.indexable !== false);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((p) => `  <url>
    <loc>${absoluteUrl(p.path)}</loc>${LASTMOD[p.path] ? `
    <lastmod>${LASTMOD[p.path]}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>
`;

// Não há área privada neste domínio (o app fica em app.vipdesk.com.br, com robots próprio).
// robots.txt não é mecanismo de segurança; a 404 usa noindex, não bloqueio.
const robots = `User-agent: *
Allow: /

Sitemap: ${SITE.origin}/sitemap.xml
`;

const files = new Map([
  ...PAGES.map((p) => [outputFile(p), renderPage(p)]),
  ['sitemap.xml', sitemap],
  ['robots.txt', robots],
]);

const seen = new Set();
for (const p of PAGES) {
  if (seen.has(p.path)) throw new Error(`Rota duplicada: ${p.path}`);
  seen.add(p.path);
}

let stale = 0;
for (const [rel, content] of files) {
  const abs = join(ROOT, rel);
  if (CHECK) {
    const current = await readFile(abs, 'utf8').catch(() => null);
    if (current !== content) {
      stale++;
      console.error(`desatualizado: ${rel}`);
    }
  } else {
    await mkdir(dirname(abs), { recursive: true });
    await writeFile(abs, content);
  }
}

if (CHECK && stale) {
  console.error(`\n${stale} arquivo(s) não correspondem à fonte em src/. Rode "npm run build".`);
  process.exit(1);
}
console.log(CHECK ? `OK: ${files.size} arquivos em dia com a fonte.` : `Gerados ${files.size} arquivos.`);
