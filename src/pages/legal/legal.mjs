// Termos de Uso e Política de Privacidade. O texto jurídico fica em *.body.html e é
// publicado sem alterações de redação; aqui só se monta o invólucro comum do site.
import { readFileSync } from 'node:fs';
import { html } from '../../lib/html.mjs';
import { breadcrumbs } from '../../lib/components.mjs';

const read = (name) => readFileSync(new URL(`./${name}.body.html`, import.meta.url), 'utf8');

const DOCS = [
  {
    path: '/terms/',
    file: 'terms',
    label: 'Termos de Uso',
    title: 'Termos de Uso — VipDesk',
    description:
      'Termos de Uso da plataforma VipDesk, operada por Vipphone Software: cadastro, canais, planos, teste gratuito, dados e responsabilidades.',
    h1: 'Termos de Uso e Condições de Serviço',
  },
  {
    path: '/privacy/',
    file: 'privacy',
    label: 'Política de Privacidade',
    title: 'Política de Privacidade — VipDesk',
    description:
      'Política de Privacidade e Proteção de Dados do VipDesk, incluindo o tratamento de dados obtidos pelas APIs do Google.',
    h1: 'Política de Privacidade e Proteção de Dados',
  },
];

export default DOCS.map((doc) => {
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: doc.label, path: doc.path },
  ];
  return {
    path: doc.path,
    title: doc.title,
    description: doc.description,
    h1: doc.h1,
    breadcrumbs: crumbs,
    body: html`
<div class="legal">
  <div class="trilha-legal">${breadcrumbs(crumbs, { light: true })}</div>
  <div class="abas">${DOCS.map((d) => html`
    <a href="${d.path}"${d.path === doc.path ? ' class="ativa" aria-current="page"' : ''}>${d.label}</a>`)}
  </div>
${read(doc.file)}
</div>`,
  };
});
