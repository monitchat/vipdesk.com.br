// Servidor estático local que reproduz o comportamento relevante do GitHub Pages:
//  - /pasta            -> 301 para /pasta/ (quando existe /pasta/index.html)
//  - /pasta/           -> /pasta/index.html
//  - /pagina           -> /pagina.html (quando existir)
//  - inexistente       -> 404.html com status HTTP 404 (nunca redireciona para a home)
//  - itens listados em `exclude` do _config.yml não são publicados -> 404
//
// Uso: node scripts/serve.mjs [--root <dir>] [--port <n>]
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { readFileSync, existsSync } from 'node:fs';
import { join, normalize, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : fallback;
};

const ROOT = resolve(opt('root', join(fileURLToPath(import.meta.url), '..', '..')));
const PORT = Number(opt('port', process.env.PORT || 4173));

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml',
};

function jekyllExcludes() {
  const file = join(ROOT, '_config.yml');
  if (!existsSync(file)) return [];
  const out = [];
  let inExclude = false;
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    if (/^exclude:/.test(line)) { inExclude = true; continue; }
    if (inExclude) {
      const m = line.match(/^\s+-\s+(.+?)\s*$/);
      if (m) out.push(m[1].replace(/^["']|["']$/g, '').replace(/\/$/, ''));
      else if (/^\S/.test(line)) inExclude = false;
    }
  }
  return out;
}
const EXCLUDES = jekyllExcludes();

// O Jekyll do Pages não publica arquivos/pastas iniciados por "_" ou "." nem os excluídos.
function isPublished(relPath) {
  const parts = relPath.split('/').filter(Boolean);
  if (parts.some((p) => p.startsWith('_') || p.startsWith('.'))) return false;
  return !EXCLUDES.some((ex) => relPath === ex || relPath.startsWith(`${ex}/`));
}

async function isFile(p) {
  try { return (await stat(p)).isFile(); } catch { return false; }
}

async function send(res, status, file, extraHeaders = {}) {
  const body = await readFile(file);
  res.writeHead(status, {
    'Content-Type': TYPES[extname(file)] || 'application/octet-stream',
    'Content-Length': body.length,
    ...extraHeaders,
  });
  res.end(body);
}

async function notFound(res) {
  const page = join(ROOT, '404.html');
  if (await isFile(page)) return send(res, 404, page);
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('404');
}

export function startServer({ port = PORT } = {}) {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      const pathname = decodeURIComponent(url.pathname);
      const rel = normalize(pathname).replace(/^([/\\])+/, '');
      const abs = join(ROOT, rel);
      if (!abs.startsWith(ROOT + sep) && abs !== ROOT) return notFound(res);
      if (rel && !isPublished(rel.split(sep).join('/'))) return notFound(res);

      if (pathname.endsWith('/')) {
        const index = join(abs, 'index.html');
        return (await isFile(index)) ? send(res, 200, index) : notFound(res);
      }
      if (await isFile(abs)) return send(res, 200, abs);
      if (await isFile(join(abs, 'index.html'))) {
        res.writeHead(301, { Location: `${pathname}/${url.search}` });
        return res.end();
      }
      if (await isFile(`${abs}.html`)) return send(res, 200, `${abs}.html`);
      return notFound(res);
    } catch {
      res.writeHead(500);
      res.end();
    }
  });
  return new Promise((ok) => server.listen(port, () => ok(server)));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  startServer().then(() => console.log(`Servindo ${ROOT} em http://localhost:${PORT}`));
}
