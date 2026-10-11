// Registro dos artigos do blog (mais recentes primeiro).
// `published`: data em que o artigo foi escrito e incluído no site. Se a publicação em
// produção ocorrer em outra data, ajuste aqui antes do deploy. Nunca use datas fictícias.
import whatsappVariosAtendentes from './artigos/whatsapp-varios-atendentes.mjs';
import tempoPrimeiraResposta from './artigos/tempo-de-primeira-resposta.mjs';
import atendimentoFunil from './artigos/integrar-atendimento-e-funil-de-vendas.mjs';

export const POSTS = [whatsappVariosAtendentes, tempoPrimeiraResposta, atendimentoFunil]
  .map((p) => ({ ...p, path: `/blog/${p.slug}/` }))
  .sort((a, b) => (a.published < b.published ? 1 : a.published > b.published ? -1 : 0));
