// Intenção: "automação de atendimento ao cliente" (inclui chamados, SLA e escalonamento).
import { landingPage } from '../../lib/landing.mjs';
import { html } from '../../lib/html.mjs';
import { list, steps, cards } from '../../lib/components.mjs';

export default landingPage({
  path: '/automacao-atendimento/',
  title: 'Automação de Atendimento ao Cliente e SLA | VipDesk',
  description:
    'Automatize follow-ups, distribuição de leads, alertas de SLA, escalonamento e lembretes de agendamento no VipDesk, com a equipe no controle.',
  h1: 'Automação de atendimento ao cliente sem perder o toque humano',
  lead: `Deixe com a plataforma as tarefas repetitivas — distribuir leads, cobrar prazos, enviar
    follow-ups e lembretes — e libere a equipe para as conversas que precisam de gente.`,
  sections: [
    {
      title: 'O trabalho manual que consome a equipe',
      intro: 'Boa parte do tempo de atendimento vai para tarefas que se repetem todos os dias:',
      content: list([
        'Decidir quem vai responder cada novo contato.',
        'Lembrar de voltar a falar com o cliente que não respondeu a proposta.',
        'Conferir, um a um, quais pedidos estão perto de estourar o prazo.',
        'Avisar o gestor quando algo está atrasado.',
        'Confirmar horários e lembrar clientes de compromissos marcados.',
      ]),
    },
    {
      title: 'O que dá para automatizar no VipDesk',
      content: cards([
        {
          title: 'Regras por etapa do funil',
          text: 'Ações automáticas com condições, disparadas conforme a oportunidade avança no funil de vendas.',
          link: { href: '/crm-whatsapp/', label: 'CRM para WhatsApp' },
        },
        {
          title: 'Sequências de follow-up',
          text: 'Mensagens de acompanhamento com passos de espera, canceladas automaticamente quando o cliente responde.',
        },
        {
          title: 'Distribuição de leads',
          text: 'Leads repartidos entre vendedores, com prazo de primeiro contato e redistribuição de quem não responde.',
        },
        {
          title: 'Alertas de SLA e escalonamento',
          text: 'Chamados com prazos de primeira resposta e de resolução, alerta antes do vencimento e escalonamento automático.',
        },
        {
          title: 'Confirmação e lembretes',
          text: 'Confirmação e lembretes de agendamento enviados por WhatsApp, para reduzir faltas.',
          link: { href: '/agendamento-whatsapp/', label: 'Agendamento pelo WhatsApp' },
        },
        {
          title: 'Apoio de inteligência artificial',
          text: 'Triagem, resumo de conversas e sugestões de resposta, sempre revisadas pelo atendente.',
          link: { href: '/inteligencia-artificial-atendimento/', label: 'IA no atendimento' },
        },
      ]),
    },
    {
      title: 'Exemplos práticos',
      intro: 'Três fluxos comuns, montados com os recursos da plataforma.',
      content: steps([
        {
          title: 'Lead novo nunca fica sem resposta',
          text: `Um contato pede orçamento pelo WhatsApp. O lead é distribuído para um vendedor com
            prazo de primeiro contato. Se o prazo passa sem resposta, ele é redistribuído
            automaticamente.`,
        },
        {
          title: 'Proposta com acompanhamento automático',
          text: `A oportunidade chega à etapa “proposta enviada” e inicia uma sequência de follow-up
            com passos de espera. Se o cliente responde no meio do caminho, os próximos passos são
            cancelados e a conversa segue com o vendedor.`,
        },
        {
          title: 'Chamado que não estoura o prazo',
          text: `Um cliente relata um problema e o atendente abre um chamado na própria conversa. A
            plataforma controla os prazos de SLA, alerta antes do vencimento e escalona se for
            preciso.`,
        },
      ]),
    },
    {
      title: 'Benefícios da automação bem feita',
      content: html`<div class="texto">
        ${list([
          '<strong>Consistência:</strong> todo lead e todo chamado passam pelas mesmas regras, sem depender de memória.',
          '<strong>Resposta mais rápida:</strong> a distribuição e os alertas encurtam o tempo até o primeiro contato.',
          '<strong>Menos mensagens fora de contexto:</strong> o follow-up para quando o cliente responde.',
          '<strong>Gestão por exceção:</strong> o gestor é acionado pelo escalonamento quando algo foge do prazo.',
        ])}
        <p style="margin-top:20px">Automação não substitui a equipe: ela tira do caminho o
        trabalho repetitivo para que as pessoas cuidem do que exige julgamento.</p>
      </div>`,
    },
  ],
  faqs: [
    {
      q: 'O que é automação de atendimento ao cliente?',
      a: `<p>É o uso de regras na plataforma de atendimento para executar tarefas repetitivas sem
        intervenção manual, como distribuir contatos, enviar follow-ups, cobrar prazos e mandar
        lembretes.</p>`,
    },
    {
      q: 'O follow-up automático para quando o cliente responde?',
      a: `<p>Sim. Os passos de espera da sequência são cancelados automaticamente assim que o
        cliente responde.</p>`,
    },
    {
      q: 'Como funciona o escalonamento automático?',
      a: `<p>Cada chamado tem prazos de primeira resposta e de resolução. A plataforma alerta antes
        do vencimento e escalona o chamado quando o prazo está em risco.</p>`,
    },
    {
      q: 'A automação substitui os atendentes?',
      a: `<p>Não. As automações cuidam de tarefas repetitivas e de prazos; as conversas que exigem
        análise continuam com a equipe. Até a inteligência artificial atua com o atendente no
        controle.</p>`,
    },
    {
      q: 'Posso automatizar lembretes de agendamento?',
      a: `<p>Sim. Confirmação e lembretes de horários marcados podem ser enviados por WhatsApp. Veja
        o <a href="/agendamento-whatsapp/">agendamento pelo WhatsApp</a>.</p>`,
    },
  ],
  related: ['/crm-whatsapp/', '/inteligencia-artificial-atendimento/', '/agendamento-whatsapp/'],
  posts: ['/blog/tempo-de-primeira-resposta/', '/blog/integrar-atendimento-e-funil-de-vendas/'],
  cta: {
    title: 'Descubra o que automatizar na sua operação',
    text: 'Na demonstração, mapeamos as tarefas repetitivas da sua equipe e mostramos como configurá-las no VipDesk.',
  },
});
