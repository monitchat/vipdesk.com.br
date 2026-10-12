// Todas as páginas do site, nos dois idiomas. O sitemap, os testes e o build partem desta lista.
import home from './pages/home.mjs';
import whatsapp from './pages/solucoes/sistema-atendimento-whatsapp.mjs';
import crm from './pages/solucoes/crm-whatsapp.mjs';
import omnichannel from './pages/solucoes/atendimento-omnichannel.mjs';
import automacao from './pages/solucoes/automacao-atendimento.mjs';
import agendamento from './pages/solucoes/agendamento-whatsapp.mjs';
import ia from './pages/solucoes/inteligencia-artificial-atendimento.mjs';
import homeEn from './pages/en/home.mjs';
import whatsappEn from './pages/en/solutions/whatsapp-customer-service.mjs';
import crmEn from './pages/en/solutions/whatsapp-crm.mjs';
import omnichannelEn from './pages/en/solutions/omnichannel-customer-service.mjs';
import automationEn from './pages/en/solutions/customer-service-automation.mjs';
import schedulingEn from './pages/en/solutions/whatsapp-appointment-scheduling.mjs';
import aiEn from './pages/en/solutions/ai-customer-service.mjs';
import { legalPages } from './pages/legal/legal.mjs';
import notFound from './pages/not-found.mjs';
import { POSTS } from './pages/blog/posts.mjs';
import { articlePage, blogIndexPage } from './lib/blog.mjs';

export const PAGES = [
  home, whatsapp, crm, omnichannel, automacao, agendamento, ia,
  blogIndexPage('pt'), ...POSTS.pt.map(articlePage), ...legalPages('pt'),
  homeEn, whatsappEn, crmEn, omnichannelEn, automationEn, schedulingEn, aiEn,
  blogIndexPage('en'), ...POSTS.en.map(articlePage), ...legalPages('en'),
  notFound,
];

// Versões de cada página em outros idiomas (mesma `key`), incluindo ela mesma, como o
// Google exige para hreflang recíproco.
for (const page of PAGES) {
  if (!page.key || page.indexable === false) continue;
  page.alternates = PAGES
    .filter((p) => p.key === page.key && p.indexable !== false)
    .map((p) => ({ lang: p.lang, path: p.path }));
}

// Datas confiáveis de alteração (só artigos têm). Demais páginas ficam sem <lastmod>.
export const LASTMOD = Object.fromEntries(
  Object.values(POSTS).flat().map((p) => [p.path, p.modified || p.published]),
);

export const outputFile = (page) =>
  page.output || `${page.path.replace(/^\//, '')}index.html`;
