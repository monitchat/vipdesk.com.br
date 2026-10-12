// Intenção: "inteligência artificial no atendimento".
// A rota sugerida originalmente era /chatbot-inteligencia-artificial, mas o site só documenta
// IA de apoio ao atendente (triagem, resumo, sugestão, classificação), não um chatbot que
// conduza conversas sozinho. Ver docs/SEO-AUDIT.md (pendências).
import { landingPage } from '../../lib/landing.mjs';
import { html } from '../../lib/html.mjs';
import { steps, panels, cards as cardsIn } from '../../lib/components.mjs';

const cards = (items) => cardsIn(items, 'pt');

export default landingPage({
  lang: 'pt',
  path: '/inteligencia-artificial-atendimento/',
  title: 'Inteligência Artificial no Atendimento | VipDesk',
  description:
    'Use IA para apoiar a triagem, resumir conversas, sugerir respostas e classificar oportunidades no VipDesk, sem tirar da equipe a decisão final.',
  h1: 'Inteligência artificial no atendimento, com o atendente no controle',
  lead: `A IA do VipDesk acelera o trabalho da equipe: apoia a triagem, resume conversas longas,
    sugere respostas e ajuda a classificar oportunidades. Quem decide o que é enviado ao cliente
    continua sendo o atendente.`,
  sections: [
    {
      title: 'O que a IA faz no VipDesk',
      content: cards([
        { title: 'Apoio na triagem', text: 'Ajuda a entender do que se trata cada contato para que ele chegue mais rápido a quem resolve.' },
        { title: 'Resumo de conversas', text: 'Quem assume um atendimento entende o contexto sem ler o histórico inteiro.' },
        { title: 'Sugestão de resposta', text: 'Um rascunho de resposta que o atendente revisa, ajusta e decide se envia.' },
        { title: 'Classificação de oportunidades', text: 'Ajuda o time comercial a priorizar as oportunidades do funil.' },
      ]),
    },
    {
      title: 'Como funciona no dia a dia',
      content: steps([
        {
          title: 'Um contato chega',
          text: 'A IA apoia a triagem, ajudando a identificar o assunto e o encaminhamento.',
        },
        {
          title: 'Um atendente assume uma conversa longa',
          text: 'Em vez de rolar todo o histórico, ele lê um resumo e entra no contexto em segundos.',
        },
        {
          title: 'É hora de responder',
          text: 'A plataforma sugere uma resposta. O atendente revisa, edita se necessário e envia.',
        },
        {
          title: 'A conversa vira oportunidade',
          text: 'A classificação ajuda a equipe comercial a decidir onde concentrar esforço.',
        },
      ]),
    },
    {
      title: 'Por que manter o atendente no controle',
      content: panels([
        {
          title: 'IA erra, e o cliente percebe',
          text: `Modelos de linguagem podem produzir respostas imprecisas ou fora do tom da empresa.
            Por isso, no VipDesk, a sugestão é um ponto de partida revisado por uma pessoa.`,
        },
        {
          title: 'Responsabilidade continua com a empresa',
          text: `Preços, prazos, condições e promessas ao cliente devem ser confirmados por quem
            responde por eles. A IA acelera a redação; a palavra final é da equipe.`,
        },
      ]),
    },
    {
      title: 'IA junto com as automações',
      content: html`<div class="texto">
        <p>A inteligência artificial complementa as regras da plataforma. As
        <a href="/automacao-atendimento/">automações</a> cuidam do que é previsível — distribuir
        leads, cobrar prazos, enviar follow-ups —, enquanto a IA ajuda nas partes que exigem
        interpretação de texto, como entender e resumir uma conversa.</p>
        <p>O resultado é uma equipe que gasta menos tempo lendo e redigindo e mais tempo
        resolvendo e vendendo, no <a href="/atendimento-omnichannel/">atendimento omnichannel</a>
        e no <a href="/crm-whatsapp/">CRM</a>.</p>
      </div>`,
    },
  ],
  faqs: [
    {
      q: 'A IA responde sozinha aos clientes?',
      a: `<p>No VipDesk, a IA atua como apoio à equipe: ela sugere respostas, e o atendente revisa
        e decide o que enviar.</p>`,
    },
    {
      q: 'O VipDesk tem chatbot?',
      a: `<p>O foco da inteligência artificial do VipDesk é apoiar os atendentes na triagem, nos
        resumos, nas sugestões de resposta e na classificação de oportunidades. Se você precisa de
        um fluxo específico de automação, apresente o cenário ao time comercial na demonstração.</p>`,
    },
    {
      q: 'A IA substitui atendentes?',
      a: `<p>Não. Ela reduz o tempo gasto com leitura e redação, mas as decisões sobre o atendimento
        continuam com a equipe.</p>`,
    },
    {
      q: 'Para que serve o resumo de conversas?',
      a: `<p>Para que quem assume um atendimento — numa troca de turno ou de setor, por exemplo —
        entenda rapidamente o que já foi falado, sem ler todo o histórico.</p>`,
    },
  ],
  related: ['/automacao-atendimento/', '/sistema-atendimento-whatsapp/', '/crm-whatsapp/'],
  cta: {
    title: 'Veja a IA ajudando sua equipe',
    text: 'Agende uma demonstração e veja resumos e sugestões de resposta em conversas parecidas com as da sua operação.',
  },
});
