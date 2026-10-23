// Blocos compartilhados do DeskFlow (editor visual de fluxos embutido no VipDesk): imagens, vídeo
// e faixa de destaque da home. As capturas em assets/deskflow/ são do editor real (ver
// scripts/deskflow-captures/README.md). Nenhum dado de cliente aparece nelas.
import { html } from './html.mjs';
import { demoButton } from './components.mjs';
import { absoluteUrl } from '../config.mjs';
import { ORG_ID } from './schema.mjs';

const DIR = '/assets/deskflow';

const TEXT = {
  pt: {
    editorAlt: 'Editor do DeskFlow mostrando um fluxo de atendimento: boas-vindas, captura do nome, menu com três caminhos, consulta de preços por API, criação de negócio no CRM, tags, agente de IA e transferência para a equipe.',
    editorCaption: 'Fluxo de demonstração aberto no editor: cada bloco é uma etapa e cada seta, uma transição.',
    dialogAlt: 'Janela de configuração do nó "Criar Negócio (CRM)" no DeskFlow, com os campos pipeline, título do negócio, valor estimado, origem e mensagens de sucesso e erro.',
    paletteAlt: 'Painel de componentes do DeskFlow com a categoria Atendimento aberta: Transferir, Alterar Status, Transferir para Flow, Alterar Dono, Atribuir Tags, Mover no Funil, Criar Negócio (CRM), Link de Pagamento, Mover Negócio (CRM), Criar Card no Kanban, Mover/Copiar Card do Kanban e Agendar.',
    videoTitle: 'Demonstração do DeskFlow: fluxo de orçamento, CRM e suporte',
    videoDescription: 'Gravação curta do editor visual do DeskFlow: visão geral de um fluxo de atendimento, configuração do nó que cria o negócio no CRM, componentes de atendimento do VipDesk e agente de IA.',
    videoCaptionsLabel: 'Legendas em português',
    videoFallback: 'Seu navegador não reproduz este vídeo.',
    videoDownload: 'Baixar o vídeo (MP4)',
    captionsFile: `${DIR}/demo.pt.vtt`,
    captionsLang: 'pt-BR',
  },
  en: {
    editorAlt: 'DeskFlow editor showing a customer service flow: welcome message, name capture, a three-way menu, a price lookup through an API, CRM deal creation, tags, an AI agent and a hand-off to the team.',
    editorCaption: 'Demo flow open in the editor: each block is a step and each arrow a transition.',
    dialogAlt: 'Settings dialog of the "Create deal (CRM)" node in DeskFlow, with pipeline, deal title, estimated value, source and success and error message fields.',
    paletteAlt: 'DeskFlow component panel with the Customer service category expanded: Transfer, Change status, Transfer to flow, Change owner, Assign tags, Move in funnel, Create deal (CRM), Payment link, Move deal (CRM), Create Kanban card, Move/copy Kanban card and Schedule.',
    videoTitle: 'DeskFlow demo: quote, CRM and support flow',
    videoDescription: 'Short recording of the DeskFlow visual editor: overview of a customer service flow, settings of the node that creates the CRM deal, VipDesk customer service components and an AI agent.',
    videoCaptionsLabel: 'English captions',
    videoFallback: 'Your browser cannot play this video.',
    videoDownload: 'Download the video (MP4)',
    captionsFile: `${DIR}/demo.en.vtt`,
    captionsLang: 'en',
  },
};

export const deskflowText = (lang) => TEXT[lang];

// Captura do canvas (3840×1800 reduzida). Dimensões explícitas evitam CLS.
export const editorImage = (lang, { eager = false } = {}) => html`
<picture>
  <source type="image/webp" srcset="${DIR}/editor-1200.webp 1200w, ${DIR}/editor-1600.webp 1600w, ${DIR}/editor-2400.webp 2400w" sizes="(max-width: 1120px) 100vw, 1120px">
  <img src="${DIR}/editor-1600.jpg" srcset="${DIR}/editor-1200.jpg 1200w, ${DIR}/editor-1600.jpg 1600w" sizes="(max-width: 1120px) 100vw, 1120px" width="1600" height="750" alt="${TEXT[lang].editorAlt}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'}>
</picture>`;

export const dialogImage = (lang) => html`
<picture>
  <source type="image/webp" srcset="${DIR}/node-editor-760.webp">
  <img src="${DIR}/node-editor-760.jpg" width="760" height="1231" alt="${TEXT[lang].dialogAlt}" loading="lazy">
</picture>`;

export const paletteImage = (lang) => html`
<picture>
  <source type="image/webp" srcset="${DIR}/palette-454.webp">
  <img src="${DIR}/palette-454.jpg" width="454" height="1400" alt="${TEXT[lang].paletteAlt}" loading="lazy">
</picture>`;

// Vídeo curto (22 s, sem áudio). preload="none": só baixa quando o visitante dá play.
export const demoVideo = (lang) => {
  const t = TEXT[lang];
  return html`
<figure class="moldura video-demo">
  <video controls muted playsinline preload="none" width="1280" height="720" poster="${DIR}/demo-poster.jpg" aria-label="${t.videoTitle}">
    <source src="${DIR}/demo.webm" type="video/webm">
    <source src="${DIR}/demo.mp4" type="video/mp4">
    <track kind="captions" src="${t.captionsFile}" srclang="${t.captionsLang}" label="${t.videoCaptionsLabel}" default>
    <p>${t.videoFallback} <a href="${DIR}/demo.mp4">${t.videoDownload}</a></p>
  </video>
</figure>`;
};

// Dados estruturados do vídeo (schema.org/VideoObject). Só fatos reais: duração e data da gravação.
export const videoObject = (lang, pagePath) => ({
  '@type': 'VideoObject',
  '@id': `${absoluteUrl(pagePath)}#video`,
  name: TEXT[lang].videoTitle,
  description: TEXT[lang].videoDescription,
  thumbnailUrl: [absoluteUrl(`${DIR}/demo-poster.jpg`)],
  contentUrl: absoluteUrl(`${DIR}/demo.mp4`),
  uploadDate: '2026-10-22',
  duration: 'PT22S',
  inLanguage: lang === 'pt' ? 'pt-BR' : 'en',
  publisher: { '@id': ORG_ID },
});

const BAND = {
  pt: {
    eyebrow: 'Powered by DeskFlow',
    title: 'Automatize processos inteiros, não apenas mensagens.',
    text: 'Com o DeskFlow, você constrói automações visuais que conectam atendimento, CRM, integrações e tarefas operacionais em fluxos personalizados.',
    bullets: [
      'Chatbot para WhatsApp com menus, captura de dados e agentes de IA, sem escrever código.',
      'Ações diretas no VipDesk: criar negócio no CRM, transferir, mudar status, aplicar tags.',
      'Consulta e grava em outros sistemas por API, com resposta usada no fluxo.',
    ],
    note: 'O DeskFlow faz parte do VipDesk e abre dentro da plataforma.',
    cta: 'Conheça o DeskFlow',
    href: '/deskflow/',
  },
  en: {
    eyebrow: 'Powered by DeskFlow',
    title: 'Automate whole processes, not just messages.',
    text: 'With DeskFlow you build visual automations that connect customer service, CRM, integrations and operational tasks into custom flows.',
    bullets: [
      'A WhatsApp chatbot with menus, data capture and AI agents, no code required.',
      'Actions inside VipDesk: create a CRM deal, transfer, change status, apply tags.',
      'Reads from and writes to other systems through APIs, using the response in the flow.',
    ],
    note: 'DeskFlow is part of VipDesk and opens inside the platform.',
    cta: 'Discover DeskFlow',
    href: '/en/deskflow/',
  },
};

// Seção exclusiva da home, logo após os recursos principais.
export const deskflowBand = (lang) => {
  const b = BAND[lang];
  return html`
<section class="deskflow-faixa" id="deskflow">
  <div class="wrap">
    <div class="duas">
      <div>
        <div class="selo">${b.eyebrow}</div>
        <h2>${b.title}</h2>
        <p>${b.text}</p>
        <ul class="lista">${b.bullets.map((i) => html`<li>${i}</li>`)}</ul>
        <div class="acoes">
          <a class="btn btn-claro" href="${b.href}">${b.cta}</a>
          ${demoButton('deskflow_home', lang, 'btn-fantasma')}
        </div>
        <p class="nota">${b.note}</p>
      </div>
      <div>
        <figure class="moldura">${editorImage(lang)}</figure>
        <p class="legenda">${TEXT[lang].editorCaption}</p>
      </div>
    </div>
  </div>
</section>`;
};
