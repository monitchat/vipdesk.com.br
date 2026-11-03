import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

// Mesmo script em todas as páginas; URL nova somente quando seu conteúdo mudar.
const content = readFileSync(new URL('../client.js', import.meta.url), 'utf8');
const hash = createHash('sha256').update(content).digest('hex').slice(0, 12);
export const clientAsset = { path: `/assets/site-${hash}.js`, content };
