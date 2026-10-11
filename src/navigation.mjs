// Páginas comerciais (soluções). Fonte única para menu, rodapé, cards da home e links relacionados.
// A ordem aqui é a ordem de exibição.
export const SOLUTIONS = [
  {
    path: '/sistema-atendimento-whatsapp/',
    label: 'Atendimento pelo WhatsApp',
    short: 'Vários atendentes no mesmo número, com fila, histórico e chamados.',
  },
  {
    path: '/crm-whatsapp/',
    label: 'CRM para WhatsApp',
    short: 'Funis, propostas, metas e distribuição automática de leads.',
  },
  {
    path: '/atendimento-omnichannel/',
    label: 'Atendimento omnichannel',
    short: 'WhatsApp, Instagram, Facebook, Telegram, e-mail e telefonia juntos.',
  },
  {
    path: '/automacao-atendimento/',
    label: 'Automação de atendimento',
    short: 'Regras, follow-ups, SLA com alertas e escalonamento automático.',
  },
  {
    path: '/agendamento-whatsapp/',
    label: 'Agendamento pelo WhatsApp',
    short: 'Auto-agendamento, lembretes e integração com Google e Microsoft 365.',
  },
  {
    path: '/inteligencia-artificial-atendimento/',
    label: 'IA no atendimento',
    short: 'Triagem, resumos e sugestões de resposta com o atendente no controle.',
  },
];

export const solution = (path) => {
  const s = SOLUTIONS.find((x) => x.path === path);
  if (!s) throw new Error(`Solução desconhecida: ${path}`);
  return s;
};
