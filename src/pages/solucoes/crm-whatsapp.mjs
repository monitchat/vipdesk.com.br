// Intenção: "CRM para WhatsApp" / gestão de leads e oportunidades a partir de conversas.
import { landingPage } from '../../lib/landing.mjs';
import { list, steps, panels, cards } from '../../lib/components.mjs';

export default landingPage({
  path: '/crm-whatsapp/',
  title: 'CRM para WhatsApp: Funil, Leads e Propostas | VipDesk',
  description:
    'Gerencie leads do WhatsApp e de outros canais com funis configuráveis, propostas, contratos, metas e distribuição automática de leads no VipDesk.',
  h1: 'CRM para WhatsApp: do primeiro contato ao contrato fechado',
  lead: `Leve cada conversa comercial para um funil organizado, com distribuição automática de
    leads, prazos de contato, propostas, contratos, metas e follow-ups que não dependem da
    memória do vendedor.`,
  sections: [
    {
      title: 'Por que vendas pelo WhatsApp se perdem',
      intro: `Quando o atendimento acontece num lugar e o controle de vendas em outro, o funil
        fica sempre desatualizado.`,
      content: list([
        'O lead chega pelo WhatsApp, mas ninguém o registra no CRM, ou registra dias depois.',
        'Leads ficam parados porque não está claro qual vendedor deve responder.',
        'Follow-ups dependem de lembretes pessoais e somem na correria.',
        'A proposta é enviada pelo chat, mas o funil não sabe em que etapa o negócio está.',
        'O gestor acompanha metas em planilhas que não conversam com o atendimento.',
      ]),
    },
    {
      title: 'Atendimento e vendas na mesma base',
      intro: `No VipDesk, o CRM fica na mesma plataforma das conversas. A oportunidade nasce do
        contato e carrega o histórico de todos os canais.`,
      content: steps([
        {
          title: 'O lead chega por qualquer canal',
          text: 'WhatsApp, Instagram, Facebook, Telegram ou e-mail: o contato entra com histórico unificado.',
        },
        {
          title: 'É distribuído automaticamente',
          text: `A plataforma distribui os leads entre os vendedores, com prazo para o primeiro
            contato. Se o vendedor não responde a tempo, o lead é redistribuído.`,
        },
        {
          title: 'Avança pelo funil',
          text: `Funis configuráveis representam o seu processo comercial. Cada etapa pode ter regras
            de automação com condições.`,
        },
        {
          title: 'Proposta, contrato e meta',
          text: 'Propostas e contratos ficam registrados na oportunidade, e o resultado alimenta as metas da equipe.',
        },
      ]),
    },
    {
      title: 'Recursos do CRM',
      content: cards([
        {
          title: 'Funis configuráveis',
          text: 'Monte as etapas do seu processo comercial em vez de adaptar a equipe a um funil genérico.',
        },
        {
          title: 'Distribuição automática de leads',
          text: 'Leads repartidos entre os vendedores, com prazo de primeiro contato e redistribuição de quem não responde.',
        },
        {
          title: 'Propostas e contratos',
          text: 'Documentos comerciais ligados à oportunidade, sem procurar arquivos em conversas antigas.',
        },
        {
          title: 'Metas',
          text: 'Acompanhamento de metas da equipe comercial na mesma plataforma em que as vendas acontecem.',
        },
        {
          title: 'Automações por etapa',
          text: `Regras com condições e sequências de follow-up. Passos de espera são cancelados
            automaticamente quando o cliente responde.`,
          link: { href: '/automacao-atendimento/', label: 'Ver automações' },
        },
        {
          title: 'Classificação com IA',
          text: 'A inteligência artificial ajuda a classificar oportunidades para a equipe priorizar melhor.',
          link: { href: '/inteligencia-artificial-atendimento/', label: 'IA no atendimento' },
        },
      ]),
    },
    {
      title: 'Organização dos contatos e do histórico',
      content: panels([
        {
          title: 'Histórico de interações',
          text: 'Antes de ligar ou responder, o vendedor vê tudo o que o cliente já conversou com a empresa.',
          list: [
            'Histórico unificado por contato, em todos os canais',
            'Chamados de atendimento visíveis para o comercial',
            'Conversas preservadas mesmo com troca de vendedor',
          ],
        },
        {
          title: 'Reuniões sem troca de mensagens',
          text: 'O agendamento usa a disponibilidade real da agenda do vendedor.',
          list: [
            'Integração com Google Calendar e Microsoft 365 / Teams',
            'Convite com link do Google Meet ou do Microsoft Teams',
            'Lembretes por WhatsApp para reduzir faltas',
          ],
        },
      ]),
    },
  ],
  faqs: [
    {
      q: 'O que é um CRM para WhatsApp?',
      a: `<p>É um sistema de gestão de clientes e oportunidades ligado às conversas de WhatsApp.
        Em vez de registrar à mão o que foi falado no chat, o lead, o histórico e a etapa da
        negociação ficam no mesmo lugar em que o atendimento acontece.</p>`,
    },
    {
      q: 'Como os leads são distribuídos entre os vendedores?',
      a: `<p>A distribuição é automática e cada lead recebe um prazo para o primeiro contato. Se o
        vendedor não responder dentro desse prazo, o lead é redistribuído para outra pessoa da
        equipe.</p>`,
    },
    {
      q: 'Posso adaptar o funil ao meu processo de vendas?',
      a: `<p>Sim. Os funis são configuráveis, e cada etapa pode ter regras de automação com
        condições e sequências de follow-up.</p>`,
    },
    {
      q: 'O follow-up automático continua se o cliente responder?',
      a: `<p>Não. Os passos de espera de uma sequência são cancelados automaticamente quando o
        cliente responde, para que ele não receba mensagens fora de contexto.</p>`,
    },
    {
      q: 'O CRM funciona só com WhatsApp?',
      a: `<p>Não. Os contatos podem chegar por WhatsApp, Instagram, Facebook, Telegram e e-mail, e
        o histórico fica unificado por contato. Veja o
        <a href="/atendimento-omnichannel/">atendimento omnichannel</a>.</p>`,
    },
  ],
  related: ['/sistema-atendimento-whatsapp/', '/automacao-atendimento/', '/agendamento-whatsapp/'],
  posts: ['/blog/integrar-atendimento-e-funil-de-vendas/'],
  cta: {
    title: 'Veja seu funil de vendas dentro do VipDesk',
    text: 'Agende uma demonstração e mostre como sua equipe vende hoje: a configuração é feita com o seu processo.',
  },
});
