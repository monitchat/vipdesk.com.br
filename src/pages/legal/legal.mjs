// Termos de Uso e Política de Privacidade. O texto jurídico fica em *.body.html e é
// publicado sem alterações de redação; aqui só se monta o invólucro comum do site.
// As versões em inglês (*.en.body.html) são traduções de conveniência — ver aviso no topo delas.
import { readFileSync } from 'node:fs';
import { html } from '../../lib/html.mjs';
import { breadcrumbs } from '../../lib/components.mjs';
import { ui } from '../../i18n.mjs';

const read = (name) => readFileSync(new URL(`./${name}.body.html`, import.meta.url), 'utf8');

const DOCS = {
  pt: [
    {
      key: 'terms',
      file: 'terms',
      title: 'Termos de Uso — VipDesk',
      description:
        'Termos de Uso da plataforma VipDesk, operada por Vipphone Software: cadastro, canais, planos, teste gratuito, dados e responsabilidades.',
      h1: 'Termos de Uso e Condições de Serviço',
    },
    {
      key: 'privacy',
      file: 'privacy',
      title: 'Política de Privacidade — VipDesk',
      description:
        'Política de Privacidade e Proteção de Dados do VipDesk, incluindo o tratamento de dados obtidos pelas APIs do Google.',
      h1: 'Política de Privacidade e Proteção de Dados',
    },
  ],
  en: [
    {
      key: 'terms',
      file: 'terms.en',
      title: 'Terms of Use — VipDesk',
      description:
        'Terms of Use of the VipDesk platform, operated by Vipphone Software: accounts, channels, plans, free trial, data and responsibilities.',
      h1: 'Terms of Use and Conditions of Service',
    },
    {
      key: 'privacy',
      file: 'privacy.en',
      title: 'Privacy Policy — VipDesk',
      description:
        'VipDesk Privacy and Data Protection Policy, including how data obtained through Google APIs is handled.',
      h1: 'Privacy and Data Protection Policy',
    },
  ],
};

export const legalPages = (lang) => {
  const t = ui(lang);
  const label = { terms: t.terms, privacy: t.privacy };
  return DOCS[lang].map((doc) => {
    const path = t.paths[doc.key];
    const crumbs = [
      { name: t.home, path: t.paths.home },
      { name: label[doc.key], path },
    ];
    return {
      lang,
      key: doc.key,
      path,
      title: doc.title,
      description: doc.description,
      h1: doc.h1,
      breadcrumbs: crumbs,
      body: html`
<div class="legal">
  <div class="trilha-legal">${breadcrumbs(crumbs, { light: true, lang })}</div>
  <div class="abas">${DOCS[lang].map((d) => html`
    <a href="${t.paths[d.key]}"${d.key === doc.key ? ' class="ativa" aria-current="page"' : ''}>${label[d.key]}</a>`)}
  </div>
${read(doc.file)}
</div>`,
    };
  });
};
