// Homepage. ATENÇÃO: também é a "home page" da verificação OAuth do Google.
// Preservar: nome do produto e descrição, seção #agenda (escopos calendar.events e
// calendar.freebusy), links para Privacidade/Termos e identificação da empresa. Ver README.
import { SITE } from '../config.mjs';
import { html } from '../lib/html.mjs';
import { hero, section, cards as cardsIn, faq, ctaBand, list } from '../lib/components.mjs';
import { deskflowBand } from '../lib/deskflow.mjs';

const cards = (items) => cardsIn(items, 'pt');
import { faqPage, softwareApplication } from '../lib/schema.mjs';
import { POSTS as ALL_POSTS } from './blog/posts.mjs';

const POSTS = ALL_POSTS.pt;

const FAQS = [
  {
    q: 'O que é o VipDesk?',
    a: `<p>O VipDesk é uma plataforma de atendimento omnichannel e CRM da ${SITE.company.name}.
      Ela reúne as conversas de WhatsApp, Instagram, Facebook, Telegram, e-mail e telefonia numa
      única tela e junta, na mesma base, o atendimento, os chamados com SLA, o funil de vendas, as
      automações e a agenda da equipe.</p>`,
  },
  {
    q: 'Como funciona o atendimento com vários atendentes no mesmo WhatsApp?',
    a: `<p>As conversas entram numa fila compartilhada e qualquer atendente autorizado pode
      assumir o contato, vendo o histórico completo, inclusive o de outros canais. O acesso é
      controlado por perfil e as ações ficam registradas em auditoria. Veja os detalhes em
      <a href="/sistema-atendimento-whatsapp/">atendimento pelo WhatsApp com vários atendentes</a>.</p>`,
  },
  {
    q: 'Posso centralizar diferentes canais?',
    a: `<p>Sim. WhatsApp, Instagram, Facebook, Telegram e e-mail entram na mesma fila, com
      histórico unificado por contato, e a telefonia fica na mesma plataforma. Saiba mais sobre o
      <a href="/atendimento-omnichannel/">atendimento omnichannel</a>.</p>`,
  },
  {
    q: 'Como funciona o CRM?',
    a: `<p>O CRM tem funis configuráveis, propostas, contratos e metas. Os leads podem ser
      distribuídos automaticamente entre vendedores, com prazo para o primeiro contato e
      redistribuição quando ninguém responde. Veja o <a href="/crm-whatsapp/">CRM para WhatsApp</a>.</p>`,
  },
  {
    q: 'Como a inteligência artificial participa do atendimento?',
    a: `<p>A IA apoia a triagem, resume conversas, sugere respostas e ajuda a classificar
      oportunidades. A decisão continua com o atendente. Mais em
      <a href="/inteligencia-artificial-atendimento/">IA no atendimento</a>.</p>`,
  },
  {
    q: 'Como o número de WhatsApp é conectado?',
    a: `<p>A conexão pode ser feita pela leitura de QR Code. Esse método usa interfaces baseadas
      no WhatsApp Web que não são homologadas pela Meta e envolve risco de bloqueio do número,
      como explicam os <a href="/terms/">Termos de Uso</a>, que recomendam a API Oficial do
      WhatsApp para operações críticas. Na demonstração, o time comercial ajuda a avaliar a opção
      mais adequada à sua operação.</p>`,
  },
  {
    q: 'Como faço para testar o VipDesk?',
    a: `<p>A plataforma pode ser oferecida com período de teste gratuito por prazo determinado,
      conforme os <a href="/terms/">Termos de Uso</a>. Para liberar o teste ou conhecer os planos,
      fale com o time comercial pelo e-mail
      <a href="mailto:${SITE.emails.sales}">${SITE.emails.sales}</a>.</p>`,
  },
  {
    q: 'Como agendar uma demonstração?',
    a: `<p>Clique em “Agendar demonstração” ou escreva para
      <a href="mailto:${SITE.emails.sales}">${SITE.emails.sales}</a> contando quais canais e que
      tamanho de equipe você tem. A demonstração é feita com os canais e o funil da sua operação.</p>`,
  },
  {
    q: 'O VipDesk está adequado à LGPD?',
    a: `<p>Sim. O VipDesk é operado em conformidade com a Lei Geral de Proteção de Dados, com
      credenciais criptografadas, acesso por perfil e registro de auditoria. Os papéis de
      controlador e operador estão descritos na <a href="/privacy/">Política de Privacidade</a>.</p>`,
  },
];

const RECURSOS = [
  {
    title: 'Atendimento omnichannel',
    text: `WhatsApp, Instagram, Facebook, Telegram e e-mail na mesma fila, com histórico unificado
      por contato. O atendente vê a conversa inteira, independentemente do canal por onde ela começou.`,
    link: { href: '/atendimento-omnichannel/', label: 'Atendimento omnichannel' },
  },
  {
    title: 'Chamados e SLA',
    text: `Abertura de chamados a partir da conversa, categorias, prazos de primeira resposta e
      resolução, com alertas antes do vencimento e escalonamento automático.`,
    link: { href: '/automacao-atendimento/', label: 'Automação e SLA' },
  },
  {
    title: 'CRM de vendas',
    text: `Funis configuráveis, propostas, contratos e metas. Distribuição automática de leads
      entre vendedores, com prazo de primeiro contato e redistribuição de quem não responde.`,
    link: { href: '/crm-whatsapp/', label: 'CRM para WhatsApp' },
  },
  {
    title: 'Automações',
    text: `Regras por etapa do funil com condições e sequências de follow-up, incluindo passos de
      espera que são cancelados automaticamente quando o cliente responde. Para processos
      personalizados, o editor visual de fluxos do DeskFlow.`,
    link: { href: '/automacao-atendimento/', label: 'Automação de atendimento' },
  },
  {
    title: 'Agendamento',
    text: `Agenda por profissional, portal público de auto-agendamento, confirmação e lembretes
      por WhatsApp, com redução de faltas.`,
    link: { href: '/agendamento-whatsapp/', label: 'Agendamento pelo WhatsApp' },
  },
  {
    title: 'Inteligência artificial',
    text: `Apoio na triagem, resumo de conversas, sugestão de resposta e classificação de
      oportunidades, sempre com o atendente no controle.`,
    link: { href: '/inteligencia-artificial-atendimento/', label: 'IA no atendimento' },
  },
];

const DIFERENCIAIS = [
  {
    title: 'Atendimento e vendas na mesma base',
    text: 'A conversa que chega pelo WhatsApp vira oportunidade no funil sem copiar dados para outro sistema.',
  },
  {
    title: 'Histórico unificado por contato',
    text: 'Quem atende enxerga tudo o que já aconteceu com o cliente, em qualquer canal.',
  },
  {
    title: 'Prazos sob controle',
    text: 'SLA de primeira resposta e de resolução, com alerta antes de vencer e escalonamento automático.',
  },
  {
    title: 'Agenda que respeita a disponibilidade real',
    text: 'Horários oferecidos ao cliente consideram a agenda do profissional no Google Calendar ou no Microsoft 365.',
  },
  {
    title: 'IA com o atendente no controle',
    text: 'Resumos e sugestões aceleram o trabalho; a decisão sobre o que enviar continua sendo da equipe.',
  },
  {
    title: 'Segurança e LGPD',
    text: 'Credenciais criptografadas, acesso por perfil e registro de auditoria das ações.',
  },
];

const USOS = [
  {
    title: 'Clínicas e consultórios',
    text: `Agenda por profissional, auto-agendamento pelo portal e lembretes por WhatsApp para
      reduzir faltas, com a recepção atendendo todos os canais numa fila só.`,
    link: { href: '/agendamento-whatsapp/', label: 'Agendamento pelo WhatsApp' },
  },
  {
    title: 'Imobiliárias',
    text: `Leads de vários canais distribuídos entre corretores, com prazo de primeiro contato,
      redistribuição automática e agendamento de visitas.`,
    link: { href: '/crm-whatsapp/', label: 'CRM para WhatsApp' },
  },
  {
    title: 'Equipes comerciais',
    text: `Funil configurável, propostas, contratos e metas, com follow-ups automáticos que param
      sozinhos quando o cliente responde.`,
    link: { href: '/automacao-atendimento/', label: 'Automação de atendimento' },
  },
  {
    title: 'Comércio e serviços',
    text: `WhatsApp, Instagram e Facebook na mesma fila e chamados com prazo para trocas,
      dúvidas e pós-venda.`,
    link: { href: '/sistema-atendimento-whatsapp/', label: 'Atendimento pelo WhatsApp' },
  },
];

const AGENDA = html`
<section class="alt" id="agenda">
  <div class="wrap">
    <div class="cabeca">
      <h2>Integração com a agenda do vendedor</h2>
      <p>
        O VipDesk se conecta ao <strong>Google Calendar</strong> e ao
        <strong>Microsoft 365 / Teams</strong> para que o agendamento feito na
        plataforma respeite a agenda real de quem vai atender.
      </p>
    </div>
    <div class="duas">
      <div class="painel">
        <h3>Disponibilidade real</h3>
        <p style="margin-bottom:16px">
          Antes de oferecer um horário ao cliente, a plataforma consulta os
          intervalos em que a agenda do profissional já está ocupada.
        </p>
        <ul class="lista">
          <li>Lemos apenas <strong>início e fim</strong> dos compromissos</li>
          <li>Não acessamos título, descrição, participantes nem local</li>
          <li>Nenhum evento da sua agenda é copiado para a nossa base</li>
        </ul>
      </div>
      <div class="painel">
        <h3>Reunião criada automaticamente</h3>
        <p style="margin-bottom:16px">
          Quando o cliente marca um horário, o compromisso aparece na agenda do
          profissional — sem ninguém copiar nada à mão.
        </p>
        <ul class="lista">
          <li>Convite enviado ao cliente</li>
          <li>Link do Google Meet ou do Microsoft Teams já no convite</li>
          <li>Remarcação e cancelamento refletidos no mesmo evento</li>
        </ul>
      </div>
    </div>
    <p style="margin-top:28px; font-size:15.5px">
      A conexão é autorizada pelo próprio usuário e pode ser desfeita a qualquer
      momento, na plataforma ou diretamente na conta Google ou Microsoft. Os
      detalhes de tratamento de dados estão na
      <a href="/privacy/">Política de Privacidade</a>.
    </p>
  </div>
</section>`;

const PRIVACIDADE = html`
<section id="privacidade">
  <div class="wrap">
    <div class="duas">
      <div>
        <h2>Privacidade e segurança</h2>
        <p style="margin-top:16px; font-size:17px">
          O VipDesk é operado pela ${SITE.company.name} e tratado como
          infraestrutura de atendimento dos nossos clientes. Trabalhamos em
          conformidade com a Lei Geral de Proteção de Dados (LGPD).
        </p>
      </div>
      <div>
        ${list([
          'Credenciais de integração armazenadas de forma criptografada',
          'Acesso por perfil, com registro de auditoria das ações',
          'Dados obtidos por APIs do Google usados apenas para as funções descritas, nunca para publicidade ou treino de modelos',
          '<a href="/privacy/">Política de Privacidade</a> e <a href="/terms/">Termos de Uso</a>',
        ])}
      </div>
    </div>
  </div>
</section>`;

const page = {
  lang: 'pt',
  key: 'home',
  path: '/',
  title: 'VipDesk | Plataforma de Atendimento Omnichannel, CRM e IA',
  description:
    'Centralize WhatsApp, Instagram, e-mail e telefonia, organize sua equipe, gerencie vendas no CRM e automatize o atendimento com IA no VipDesk.',
  ogTitle: 'VipDesk — Atendimento omnichannel, CRM e IA em uma plataforma',
  h1: 'Plataforma de atendimento omnichannel com WhatsApp, CRM e inteligência artificial',
};

page.jsonLd = [softwareApplication('pt'), faqPage(page, FAQS)];
page.about = { '@id': `${SITE.origin}/#software` };

page.body = html`
${hero({
  lang: 'pt',
  eyebrow: `Uma solução ${SITE.company.name}`,
  h1: page.h1,
  lead: `Centralize as conversas de WhatsApp, Instagram, Facebook, Telegram, e-mail e telefonia,
    organize sua equipe, automatize tarefas repetitivas e acompanhe cada oportunidade até a
    venda, com agenda integrada. Sua equipe atende, vende e agenda sem trocar de sistema.`,
})}
${section({
  id: 'recursos',
  title: 'O que a plataforma faz',
  intro: `Todo o atendimento da sua empresa em um só lugar: uma base para o time de atendimento
    e o time comercial, do primeiro contato até o fechamento.`,
  content: cards(RECURSOS),
})}
${deskflowBand('pt')}
${section({
  alt: true,
  title: 'Por que equipes escolhem o VipDesk',
  intro: 'O que muda na rotina quando atendimento, vendas e agenda deixam de estar espalhados.',
  content: cards(DIFERENCIAIS),
})}
${section({
  id: 'usos',
  title: 'Para quem é',
  intro: `Exemplos de como operações diferentes usam os mesmos recursos. Na demonstração, a
    configuração é feita com o fluxo real da sua empresa.`,
  content: cards(USOS),
})}
${AGENDA}
${PRIVACIDADE}
${section({
  id: 'perguntas',
  alt: true,
  title: 'Perguntas frequentes',
  content: faq(FAQS),
})}
${section({
  title: 'Conteúdo para organizar seu atendimento',
  intro: 'Guias práticos do time do VipDesk sobre atendimento, vendas e operação digital.',
  content: html`${cards(POSTS.slice(0, 3).map((p) => ({ title: p.h1, text: p.description, href: p.path, linkLabel: 'Ler artigo' })))}
    <p style="margin-top:24px"><a href="/blog/">Ver todos os artigos do blog</a></p>`,
})}
${ctaBand({
  lang: 'pt',
  title: 'Quer conhecer o VipDesk?',
  text: 'Fale com nosso time comercial e agende uma demonstração da plataforma com os canais e o funil da sua operação.',
})}`;

export default page;
