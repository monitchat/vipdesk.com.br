import { ui } from './i18n.mjs';

// Configuração central do site. Tudo que é dado institucional fica aqui, num lugar só.
// Fonte dos dados: Termos de Uso e Política de Privacidade publicados (CNPJ, endereço, e-mails).

export const SITE = {
  name: 'VipDesk',
  origin: 'https://vipdesk.com.br',
  themeColor: '#5c2d6f',
  ogImage: {
    pt: { path: '/assets/og-vipdesk.png', alt: 'VipDesk — atendimento omnichannel, CRM e IA em uma só plataforma' },
    en: { path: '/assets/og-vipdesk-en.png', alt: 'VipDesk — omnichannel customer service, CRM and AI in one platform' },
    width: 1200,
    height: 630,
  },
  appUrl: 'https://app.vipdesk.com.br',
  // Materiais de apoio ao cliente: central de ajuda e canal no YouTube (rodapé, home e /deskflow/).
  helpUrl: 'https://vipphone.vipdesk.chat/help',
  youtubeUrl: 'https://www.youtube.com/@vipdeskcrm',
  // Google Analytics 4 (gtag.js). null desativa a tag em todas as páginas.
  ga4Id: 'G-5L7TXDVM7T',
  // URL pública de cadastro do teste gratuito. Os Termos de Uso preveem teste gratuito
  // por prazo determinado, mas a rota de cadastro não pôde ser verificada a partir deste
  // repositório. Enquanto for null, o CTA "Experimentar grátis" não é exibido.
  trialUrl: null,
  // Link direto para agendar demonstração (ex.: portal público de auto-agendamento do próprio
  // VipDesk com a agenda do time comercial). Nenhum link desses existe neste repositório; enquanto
  // for null, "Agendar demonstração" abre um e-mail pré-preenchido para o comercial.
  demoUrl: null,
  // Formulário de contato do módulo de Formulários do VipDesk (vira contato/negócio no CRM).
  // Embutido na faixa #contato. Os campos são em português, então só existe para 'pt'.
  contactForm: {
    pt: {
      id: 'vd-form-formulario-do-site-vipdeskcombr',
      widget: 'https://lp.vipdesk.chat/f/widget',
      config: 'https://lp.vipdesk.chat/f/vipphone/formulario-do-site-vipdeskcombr/config.json',
      // Campo que os botões preenchem com a mensagem do CTA clicado (chave = data-cta).
      messageField: 'mensagem',
      messages: {
        demo_request: 'Olá! Gostaria de agendar uma demonstração do VipDesk.',
        contact_click: 'Olá! Gostaria de falar com um especialista sobre o VipDesk para a minha empresa.',
      },
    },
  },
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

const mailto = (to, { subject, body }) =>
  `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

// Pedido de demonstração: o fluxo comercial existente é o e-mail do time comercial, com assunto
// e roteiro de qualificação no idioma da página. `SITE.demoUrl`, quando preenchido, substitui tudo.
// Com formulário de contato no idioma, os dois CTAs levam a ele (faixa #contato da própria página).
export const demoHref = (lang) => SITE.demoUrl || (SITE.contactForm[lang] ? '#contato' : mailto(SITE.emails.sales, ui(lang).demoMail));
export const contactHref = (lang) => (SITE.contactForm[lang] ? '#contato' : mailto(SITE.emails.sales, ui(lang).contactMail));
