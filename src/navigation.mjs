// Páginas comerciais (soluções) por idioma. Fonte única para menu, rodapé, cards e links
// relacionados. A ordem aqui é a ordem de exibição. `key` liga as versões traduzidas.
export const SOLUTIONS = {
  pt: [
    {
      key: 'whatsapp',
      path: '/sistema-atendimento-whatsapp/',
      label: 'Atendimento pelo WhatsApp',
      short: 'Vários atendentes no mesmo número, com fila, histórico e chamados.',
    },
    {
      key: 'crm',
      path: '/crm-whatsapp/',
      label: 'CRM para WhatsApp',
      short: 'Funis, propostas, metas e distribuição automática de leads.',
    },
    {
      key: 'omnichannel',
      path: '/atendimento-omnichannel/',
      label: 'Atendimento omnichannel',
      short: 'WhatsApp, Instagram, Facebook, Telegram, e-mail e telefonia juntos.',
    },
    {
      key: 'automation',
      path: '/automacao-atendimento/',
      label: 'Automação de atendimento',
      short: 'Regras, follow-ups, SLA com alertas e escalonamento automático.',
    },
    {
      key: 'scheduling',
      path: '/agendamento-whatsapp/',
      label: 'Agendamento pelo WhatsApp',
      short: 'Auto-agendamento, lembretes e integração com Google e Microsoft 365.',
    },
    {
      key: 'ai',
      path: '/inteligencia-artificial-atendimento/',
      label: 'IA no atendimento',
      short: 'Triagem, resumos e sugestões de resposta com o atendente no controle.',
    },
  ],
  en: [
    {
      key: 'whatsapp',
      path: '/en/whatsapp-customer-service/',
      label: 'WhatsApp customer service',
      short: 'Your whole team on one WhatsApp number, with a shared queue, history and tickets.',
    },
    {
      key: 'crm',
      path: '/en/whatsapp-crm/',
      label: 'WhatsApp CRM',
      short: 'Pipelines, proposals, goals and automatic lead distribution.',
    },
    {
      key: 'omnichannel',
      path: '/en/omnichannel-customer-service/',
      label: 'Omnichannel customer service',
      short: 'WhatsApp, Instagram, Facebook, Telegram, email and phone together.',
    },
    {
      key: 'automation',
      path: '/en/customer-service-automation/',
      label: 'Customer service automation',
      short: 'Rules, follow-ups, SLA alerts and automatic escalation.',
    },
    {
      key: 'scheduling',
      path: '/en/whatsapp-appointment-scheduling/',
      label: 'WhatsApp appointment scheduling',
      short: 'Self-scheduling, reminders and Google and Microsoft 365 calendar sync.',
    },
    {
      key: 'ai',
      path: '/en/ai-customer-service/',
      label: 'AI for customer service',
      short: 'Triage, summaries and reply suggestions, with your agents in control.',
    },
  ],
};

export const solution = (path) => {
  const s = Object.values(SOLUTIONS).flat().find((x) => x.path === path);
  if (!s) throw new Error(`Solução desconhecida: ${path}`);
  return s;
};
