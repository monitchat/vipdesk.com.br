// Registro dos artigos do blog por idioma (mais recentes primeiro).
// `published`: data em que o artigo foi escrito e incluído no site. Se a publicação em
// produção ocorrer em outra data, ajuste aqui antes do deploy. Nunca use datas fictícias.
// `key` liga um artigo à sua tradução (gera os links hreflang).
import { ui } from '../../i18n.mjs';
import whatsappVariosAtendentes from './artigos/whatsapp-varios-atendentes.mjs';
import tempoPrimeiraResposta from './artigos/tempo-de-primeira-resposta.mjs';
import atendimentoFunil from './artigos/integrar-atendimento-e-funil-de-vendas.mjs';
import whatsappTeamInbox from './en/whatsapp-team-inbox.mjs';
import firstResponseTime from './en/first-response-time.mjs';
import supportAndSales from './en/connect-customer-service-and-sales-pipeline.mjs';

const register = (lang, posts) => posts
  .map((p) => ({ ...p, lang, path: `${ui(lang).paths.blog}${p.slug}/` }))
  .sort((a, b) => (a.published < b.published ? 1 : a.published > b.published ? -1 : 0));

export const POSTS = {
  pt: register('pt', [whatsappVariosAtendentes, tempoPrimeiraResposta, atendimentoFunil]),
  en: register('en', [whatsappTeamInbox, firstResponseTime, supportAndSales]),
};
