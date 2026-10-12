// Geradores de dados estruturados (schema.org / JSON-LD).
// Regra: só dados reais e visíveis no site. Sem notas, avaliações, preços ou números inventados.
import { SITE, absoluteUrl } from '../config.mjs';
import { stripTags } from './html.mjs';
import { ui, LOCALES } from '../i18n.mjs';

export const ORG_ID = `${SITE.origin}/#organization`;
export const WEBSITE_ID = `${SITE.origin}/#website`;
export const APP_ID = `${SITE.origin}/#software`;

export const organization = () => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE.company.name,
  url: `${SITE.origin}/`,
  logo: {
    '@type': 'ImageObject',
    url: absoluteUrl('/assets/vipdesk-icon.png'),
    width: 447,
    height: 291,
  },
  taxID: SITE.company.taxId,
  email: SITE.emails.sales,
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${SITE.company.street} — ${SITE.company.district}`,
    addressLocality: SITE.company.city,
    addressRegion: SITE.company.region,
    postalCode: SITE.company.postalCode,
    addressCountry: SITE.company.country,
  },
  contactPoint: [
    { '@type': 'ContactPoint', contactType: 'sales', email: SITE.emails.sales, availableLanguage: 'Portuguese' },
    { '@type': 'ContactPoint', contactType: 'customer support', email: SITE.emails.support, availableLanguage: 'Portuguese' },
  ],
});

export const website = () => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: SITE.name,
  alternateName: 'Vip Desk',
  url: `${SITE.origin}/`,
  inLanguage: LOCALES.map((l) => ui(l).htmlLang),
  publisher: { '@id': ORG_ID },
});

// Textos do produto por idioma (mesmos fatos nos dois).
const APP_TEXT = {
  pt: {
    sub: 'Atendimento ao cliente e CRM',
    description:
      'Plataforma de atendimento omnichannel que reúne WhatsApp, Instagram, Facebook, Telegram, ' +
      'e-mail e telefonia, com CRM de vendas, chamados com SLA, automações, agendamento integrado ' +
      'ao Google Calendar e ao Microsoft 365 e apoio de inteligência artificial.',
    features: [
      'Atendimento omnichannel com histórico unificado por contato',
      'Chamados com prazos de SLA, alertas e escalonamento automático',
      'CRM com funis configuráveis, propostas, contratos e metas',
      'Distribuição automática de leads entre vendedores',
      'Automações por etapa do funil e sequências de follow-up',
      'Agenda por profissional e portal de auto-agendamento',
      'Integração com Google Calendar e Microsoft 365 / Teams',
      'Inteligência artificial para triagem, resumo e sugestão de resposta',
    ],
  },
  en: {
    sub: 'Customer service and CRM',
    description:
      'Omnichannel customer service platform that brings together WhatsApp, Instagram, Facebook, ' +
      'Telegram, email and phone, with a sales CRM, SLA-based tickets, automations, scheduling synced ' +
      'with Google Calendar and Microsoft 365, and AI assistance.',
    features: [
      'Omnichannel inbox with unified history per contact',
      'Tickets with SLA deadlines, alerts and automatic escalation',
      'CRM with configurable pipelines, proposals, contracts and goals',
      'Automatic lead distribution across sales reps',
      'Pipeline-stage automations and follow-up sequences',
      'Per-professional calendars and a self-scheduling portal',
      'Google Calendar and Microsoft 365 / Teams integration',
      'AI for triage, conversation summaries and reply suggestions',
    ],
  },
};

// Descreve o produto conforme os recursos publicados no site. Sem `offers` e sem
// `aggregateRating`: não há preço público nem avaliações reais. Isso torna a página
// inelegível ao resultado enriquecido de software, o que é preferível a inventar dados.
export const softwareApplication = (lang) => ({
  '@type': 'SoftwareApplication',
  '@id': APP_ID,
  name: SITE.name,
  url: `${SITE.origin}${ui(lang).paths.home}`,
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: APP_TEXT[lang].sub,
  operatingSystem: 'Web',
  inLanguage: ui(lang).htmlLang,
  description: APP_TEXT[lang].description,
  featureList: APP_TEXT[lang].features,
  publisher: { '@id': ORG_ID },
});

export const webPage = (page) => ({
  '@type': page.schemaType || 'WebPage',
  '@id': `${absoluteUrl(page.path)}#webpage`,
  url: absoluteUrl(page.path),
  name: page.title,
  description: page.description,
  inLanguage: ui(page.lang).htmlLang,
  isPartOf: { '@id': WEBSITE_ID },
  ...(page.breadcrumbs ? { breadcrumb: { '@id': `${absoluteUrl(page.path)}#breadcrumb` } } : {}),
  ...(page.about ? { about: page.about } : {}),
});

export const breadcrumbList = (page) => ({
  '@type': 'BreadcrumbList',
  '@id': `${absoluteUrl(page.path)}#breadcrumb`,
  itemListElement: page.breadcrumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: absoluteUrl(c.path),
  })),
});

// Só usar com perguntas e respostas visíveis na página (o mesmo dado gera os dois).
export const faqPage = (page, faqs) => ({
  '@type': 'FAQPage',
  '@id': `${absoluteUrl(page.path)}#faq`,
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: stripTags(f.q),
    acceptedAnswer: { '@type': 'Answer', text: stripTags(f.a) },
  })),
});

export const blogPosting = (page, post) => ({
  '@type': 'BlogPosting',
  '@id': `${absoluteUrl(page.path)}#article`,
  headline: post.h1,
  description: page.description,
  mainEntityOfPage: { '@id': `${absoluteUrl(page.path)}#webpage` },
  datePublished: post.published,
  dateModified: post.modified || post.published,
  inLanguage: ui(page.lang).htmlLang,
  author: { '@id': ORG_ID },
  publisher: { '@id': ORG_ID },
  image: absoluteUrl(SITE.ogImage[page.lang].path),
  wordCount: post.wordCount,
});

export const graph = (nodes) => ({ '@context': 'https://schema.org', '@graph': nodes });
