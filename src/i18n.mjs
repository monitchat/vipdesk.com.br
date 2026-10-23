// Idiomas do site e textos de interface (menus, botões, rótulos).
// O conteúdo de cada página fica no próprio módulo da página; aqui só o que é compartilhado.
//
// Português é o idioma principal (raiz do domínio). Inglês fica em /en/.

export const LOCALES = ['pt', 'en'];
// Idioma servido a quem não fala nenhum dos idiomas do site (hreflang="x-default").
export const DEFAULT_FOR_UNMATCHED = 'en';

const MONTHS = {
  pt: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};

export const UI = {
  pt: {
    htmlLang: 'pt-BR',
    hreflang: 'pt-BR',
    ogLocale: 'pt_BR',
    languageName: 'Português',
    switchLabel: 'Ler esta página em português',
    paths: { home: '/', blog: '/blog/', privacy: '/privacy/', terms: '/terms/' },
    skip: 'Pular para o conteúdo',
    homeAria: 'VipDesk — página inicial',
    mainNav: 'Principal',
    solutions: 'Soluções',
    blog: 'Blog',
    faqShort: 'Perguntas',
    faqLong: 'Perguntas frequentes',
    contact: 'Contato',
    menu: 'Menu',
    appAccess: 'Acessar a plataforma',
    demo: 'Agendar demonstração',
    trial: 'Experimentar grátis',
    specialist: 'Falar com especialista',
    breadcrumbAria: 'Você está em',
    home: 'Início',
    learnMore: 'Saiba mais',
    readArticle: 'Ler artigo',
    related: 'Recursos relacionados',
    deeper: 'Para se aprofundar',
    howHelps: 'Como o VipDesk ajuda',
    readAlso: 'Leia também',
    ctaTitle: 'Veja o VipDesk funcionando na sua operação',
    ctaText: 'Fale com o time comercial e agende uma demonstração com os canais, o funil e a rotina da sua equipe.',
    ctaEmail: 'Prefere escrever direto?',
    footerTagline: (company) => `Plataforma de atendimento omnichannel, CRM e agenda. Uma solução ${company}.`,
    footerPlatform: 'Plataforma',
    footerPlatformAria: 'Plataforma e conteúdo',
    footerFeatures: 'Recursos',
    footerCalendar: 'Integração de agenda',
    help: 'Central de ajuda',
    youtube: 'Canal no YouTube',
    footerLegal: 'Legal e contato',
    privacy: 'Política de Privacidade',
    terms: 'Termos de Uso',
    address: (c) => `${c.name} · CNPJ ${c.taxId} · ${c.street} — ${c.district}, ${c.city}/${c.region}, CEP ${c.postalCode}`,
    rights: (company) => `© 2026 ${company}. Todos os direitos reservados.`,
    byline: (company) => `Por equipe VipDesk (${company})`,
    published: 'Publicado em',
    updated: 'Atualizado em',
    minutes: (n) => `${n} min de leitura`,
    blogEyebrow: 'Blog VipDesk',
    formatDate: (iso) => { const [y, m, d] = iso.split('-').map(Number); return `${d} de ${MONTHS.pt[m - 1]} de ${y}`; },
    summary: 'Resumo:',
    demoMail: {
      subject: 'Quero agendar uma demonstração do VipDesk',
      body: 'Olá! Gostaria de agendar uma demonstração do VipDesk.\n\n' +
        'Nome:\nEmpresa:\nTelefone/WhatsApp:\nTamanho da equipe de atendimento/vendas:\n' +
        'Canais que usamos hoje (WhatsApp, Instagram, e-mail...):\n',
    },
    contactMail: {
      subject: 'Quero falar com um especialista do VipDesk',
      body: 'Olá! Gostaria de conversar sobre o VipDesk para a minha empresa.\n\nNome:\nEmpresa:\nTelefone/WhatsApp:\n',
    },
  },
  en: {
    htmlLang: 'en',
    hreflang: 'en',
    ogLocale: 'en_US',
    languageName: 'English',
    switchLabel: 'Read this page in English',
    paths: { home: '/en/', blog: '/en/blog/', privacy: '/en/privacy/', terms: '/en/terms/' },
    skip: 'Skip to content',
    homeAria: 'VipDesk — home',
    mainNav: 'Main',
    solutions: 'Solutions',
    blog: 'Blog',
    faqShort: 'FAQ',
    faqLong: 'Frequently asked questions',
    contact: 'Contact',
    menu: 'Menu',
    appAccess: 'Log in',
    demo: 'Book a demo',
    trial: 'Start free trial',
    specialist: 'Talk to sales',
    breadcrumbAria: 'You are here',
    home: 'Home',
    learnMore: 'Learn more',
    readArticle: 'Read article',
    related: 'Related features',
    deeper: 'Go deeper',
    howHelps: 'How VipDesk helps',
    readAlso: 'Keep reading',
    ctaTitle: 'See VipDesk running with your team',
    ctaText: 'Talk to our sales team and book a demo built around your channels, your pipeline and your daily routine.',
    ctaEmail: 'Prefer to email us directly?',
    footerTagline: (company) => `Omnichannel customer service, CRM and scheduling platform. A ${company} product.`,
    footerPlatform: 'Platform',
    footerPlatformAria: 'Platform and content',
    footerFeatures: 'Features',
    footerCalendar: 'Calendar integration',
    help: 'Help center',
    youtube: 'YouTube channel',
    footerLegal: 'Legal and contact',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    address: (c) => `${c.name} · Brazilian company registration (CNPJ) ${c.taxId} · ${c.street} — ${c.district}, ${c.city}, ${c.region}, ${c.postalCode}, Brazil`,
    rights: (company) => `© 2026 ${company}. All rights reserved.`,
    byline: (company) => `By the VipDesk team (${company})`,
    published: 'Published',
    updated: 'Updated',
    minutes: (n) => `${n} min read`,
    blogEyebrow: 'VipDesk Blog',
    formatDate: (iso) => { const [y, m, d] = iso.split('-').map(Number); return `${MONTHS.en[m - 1]} ${d}, ${y}`; },
    summary: 'Summary:',
    demoMail: {
      subject: 'VipDesk demo request',
      body: 'Hi! I would like to book a VipDesk demo.\n\n' +
        'Name:\nCompany:\nPhone/WhatsApp:\nCountry and time zone:\nSupport/sales team size:\n' +
        'Channels we use today (WhatsApp, Instagram, email...):\n',
    },
    contactMail: {
      subject: 'Talk to VipDesk sales',
      body: 'Hi! I would like to talk about VipDesk for my company.\n\nName:\nCompany:\nPhone/WhatsApp:\nCountry and time zone:\n',
    },
  },
};

export const ui = (lang) => {
  const t = UI[lang];
  if (!t) throw new Error(`Idioma desconhecido: ${lang}`);
  return t;
};
