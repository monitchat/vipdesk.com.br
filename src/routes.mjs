// Todas as páginas do site. O sitemap, os testes e o build partem desta lista.
import home from './pages/home.mjs';
import whatsapp from './pages/solucoes/sistema-atendimento-whatsapp.mjs';
import crm from './pages/solucoes/crm-whatsapp.mjs';
import omnichannel from './pages/solucoes/atendimento-omnichannel.mjs';
import automacao from './pages/solucoes/automacao-atendimento.mjs';
import agendamento from './pages/solucoes/agendamento-whatsapp.mjs';
import ia from './pages/solucoes/inteligencia-artificial-atendimento.mjs';
import legal from './pages/legal/legal.mjs';
import notFound from './pages/not-found.mjs';
import { POSTS } from './pages/blog/posts.mjs';
import { articlePage, blogIndexPage } from './lib/blog.mjs';

export const PAGES = [
  home,
  whatsapp,
  crm,
  omnichannel,
  automacao,
  agendamento,
  ia,
  blogIndexPage(),
  ...POSTS.map(articlePage),
  ...legal,
  notFound,
];

// Datas confiáveis de alteração (só artigos têm). Demais páginas ficam sem <lastmod>.
export const LASTMOD = Object.fromEntries(POSTS.map((p) => [p.path, p.modified || p.published]));

export const outputFile = (page) =>
  page.output || `${page.path.replace(/^\//, '')}index.html`;
