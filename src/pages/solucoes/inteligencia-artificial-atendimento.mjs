// Intenção: "inteligência artificial no atendimento" e "IA no WhatsApp".
// Dois usos distintos e verificados: a IA de apoio ao atendente (triagem, resumo, sugestão,
// classificação) e os agentes de IA conversacionais montados no DeskFlow (/deskflow/), que
// conduzem conversas no WhatsApp com ferramentas e transferência para humanos.
import { landingPage } from '../../lib/landing.mjs';
import { html } from '../../lib/html.mjs';
import { steps, panels, cards as cardsIn } from '../../lib/components.mjs';

const cards = (items) => cardsIn(items, 'pt');

export default landingPage({
  lang: 'pt',
  path: '/inteligencia-artificial-atendimento/',
  title: 'Inteligência Artificial no Atendimento e no WhatsApp | VipDesk',
  description:
    'IA no VipDesk: triagem, resumos e sugestões de resposta para a equipe, e agentes de IA no WhatsApp que conversam, consultam sistemas e transferem para humanos.',
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
      id: 'agentes',
      title: 'Agentes de IA no WhatsApp com o DeskFlow',
      intro: `Além do apoio ao atendente, o VipDesk tem agentes de IA que conversam com o cliente no
        WhatsApp e executam ações, montados no <a href="/deskflow/">DeskFlow</a>, o construtor visual de
        fluxos da plataforma.`,
      content: cards([
        { title: 'Conversa com instruções suas', text: 'Você escreve o que o agente faz, o tom e os limites. Ele responde ao cliente seguindo essas instruções e o histórico recente da conversa.' },
        { title: 'Ferramentas em vez de só texto', text: 'O agente busca na base de conhecimento da empresa, consulta uma API, cria o negócio no CRM, agenda um horário, gera link de pagamento ou aplica tags.' },
        { title: 'Transferência para gente', text: 'Quando o assunto sai do que ele resolve, o agente transfere para o departamento certo, e o atendente recebe a conversa com o contexto.' },
        { title: 'Dentro de um fluxo', text: 'O agente é um bloco do fluxo: antes dele podem vir menus e validações determinísticas; depois, ações no VipDesk. Você usa a chave de API do seu provedor de IA.' },
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
      a: `<p>Depende de como você configura. No apoio ao atendente, a IA sugere respostas e a pessoa
        decide o que enviar. Em um fluxo do DeskFlow, um agente de IA pode responder diretamente ao
        cliente no WhatsApp, seguindo as suas instruções, e transferir para a equipe quando o assunto
        sai do que ele resolve.</p>`,
    },
    {
      q: 'O VipDesk tem chatbot?',
      a: `<p>Sim. O DeskFlow, construtor visual de fluxos do VipDesk, monta o chatbot do WhatsApp
        com menus, captura de dados, consultas a outros sistemas e agentes de IA, e define quando a
        conversa passa para um atendente. Conheça o <a href="/deskflow/">DeskFlow</a> e veja
        <a href="/blog/chatbot-whatsapp-sem-programar/">como criar um chatbot para WhatsApp sem
        programar</a>.</p>`,
    },
    {
      q: 'Qual a diferença entre a IA de apoio e o agente de IA?',
      a: `<p>A IA de apoio trabalha para o atendente: resume, sugere e classifica, e a pessoa decide
        o que enviar. O agente de IA conversa diretamente com o cliente no WhatsApp, dentro de um
        fluxo do DeskFlow, com instruções, ferramentas e um ponto de transferência para humanos. Os
        dois podem conviver na mesma operação.</p>`,
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
  related: ['/deskflow/', '/automacao-atendimento/', '/sistema-atendimento-whatsapp/'],
  posts: ['/blog/agente-de-ia-no-whatsapp/'],
  cta: {
    title: 'Veja a IA ajudando sua equipe',
    text: 'Agende uma demonstração e veja resumos e sugestões de resposta em conversas parecidas com as da sua operação.',
  },
});
