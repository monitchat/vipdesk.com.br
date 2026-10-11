// Configuração central do site. Tudo que é dado institucional fica aqui, num lugar só.
// Fonte dos dados: Termos de Uso e Política de Privacidade publicados (CNPJ, endereço, e-mails).

export const SITE = {
  name: 'VipDesk',
  origin: 'https://vipdesk.com.br',
  lang: 'pt-BR',
  ogLocale: 'pt_BR',
  themeColor: '#5c2d6f',
  ogImage: {
    path: '/assets/og-vipdesk.png',
    width: 1200,
    height: 630,
    alt: 'VipDesk — atendimento omnichannel, CRM e IA em uma só plataforma',
  },
  appUrl: 'https://app.vipdesk.com.br',
  // URL pública de cadastro do teste gratuito. Os Termos de Uso preveem teste gratuito
  // por prazo determinado, mas a rota de cadastro não pôde ser verificada a partir deste
  // repositório. Enquanto for null, o CTA "Experimentar grátis" não é exibido.
  trialUrl: null,
  // Link direto para agendar demonstração (ex.: portal público de auto-agendamento do próprio
  // VipDesk com a agenda do time comercial). Nenhum link desses existe neste repositório; enquanto
  // for null, "Agendar demonstração" abre um e-mail pré-preenchido para o comercial.
  demoUrl: null,
  emails: {
    sales: 'comercial@vipphone.com.br',
    support: 'suporte@vipphone.com.br',
    dpo: 'dpo@vipphone.com.br',
  },
  company: {
    name: 'Vipphone Software',
    taxId: '03.742.028/0001-92',
    street: 'Avenida Guaçuí, 1121',
    district: 'Araçás',
    city: 'Linhares',
    region: 'ES',
    postalCode: '29903-394',
    country: 'BR',
  },
};

export const absoluteUrl = (path) => new URL(path, SITE.origin).href;

const mailto = (to, subject, body) =>
  `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

// Pedido de demonstração: o fluxo comercial existente é o e-mail do time comercial.
// O corpo já sugere as informações que ajudam a qualificar a conversa.
export const DEMO_HREF = SITE.demoUrl || mailto(
  SITE.emails.sales,
  'Quero agendar uma demonstração do VipDesk',
  'Olá! Gostaria de agendar uma demonstração do VipDesk.\n\n' +
    'Nome:\nEmpresa:\nTelefone/WhatsApp:\nTamanho da equipe de atendimento/vendas:\n' +
    'Canais que usamos hoje (WhatsApp, Instagram, e-mail...):\n',
);

export const CONTACT_HREF = mailto(
  SITE.emails.sales,
  'Quero falar com um especialista do VipDesk',
  'Olá! Gostaria de conversar sobre o VipDesk para a minha empresa.\n\nNome:\nEmpresa:\nTelefone/WhatsApp:\n',
);
