// Intenção: "plataforma de atendimento omnichannel" (comercial) com definição de apoio.
import { landingPage } from '../../lib/landing.mjs';
import { html } from '../../lib/html.mjs';
import { list, panels, cards as cardsIn } from '../../lib/components.mjs';

const cards = (items) => cardsIn(items, 'pt');

export default landingPage({
  lang: 'pt',
  path: '/atendimento-omnichannel/',
  title: 'Plataforma de Atendimento Omnichannel | VipDesk',
  description:
    'WhatsApp, Instagram, Facebook, Telegram, e-mail e telefonia numa só plataforma, com histórico unificado por contato, SLA e CRM. Conheça o VipDesk.',
  h1: 'Plataforma de atendimento omnichannel: todos os canais numa fila só',
  lead: `Reúna WhatsApp, Instagram, Facebook, Telegram, e-mail e telefonia numa única plataforma,
    com o histórico de cada cliente unificado, prazos de atendimento e o funil de vendas no
    mesmo lugar.`,
  sections: [
    {
      title: 'O que é atendimento omnichannel',
      content: html`<div class="texto">
        <p>Atendimento omnichannel é aquele em que todos os canais de contato da empresa funcionam
        como <strong>uma única conversa com o cliente</strong>. Não importa se ele mandou mensagem
        no Instagram, escreveu um e-mail ou chamou no WhatsApp: quem atende enxerga o histórico
        completo e continua de onde a conversa parou.</p>
        <p>Na prática, isso exige uma plataforma que receba os canais numa mesma fila, identifique
        o contato e mantenha o histórico junto. É exatamente o papel do VipDesk.</p>
      </div>`,
    },
    {
      title: 'Multicanal x omnichannel',
      intro: 'Estar presente em vários canais não é o mesmo que atender de forma integrada.',
      content: html`<div class="tabela-rolagem" tabindex="0" role="region" aria-label="Comparativo entre multicanal e omnichannel"><table class="comparativo">
        <thead><tr><th scope="col"></th><th scope="col">Multicanal</th><th scope="col">Omnichannel</th></tr></thead>
        <tbody>
          <tr><th scope="row">Canais</th><td>Vários canais, cada um com sua ferramenta</td><td>Vários canais numa mesma plataforma</td></tr>
          <tr><th scope="row">Histórico</th><td>Separado por canal</td><td>Unificado por contato</td></tr>
          <tr><th scope="row">Fila de atendimento</th><td>Uma fila por canal ou aparelho</td><td>Fila única para a equipe</td></tr>
          <tr><th scope="row">Experiência do cliente</th><td>Repete a história a cada troca de canal</td><td>Continua a conversa de onde parou</td></tr>
          <tr><th scope="row">Gestão</th><td>Visão fragmentada da operação</td><td>Prazos e resultados acompanhados num só lugar</td></tr>
        </tbody>
      </table></div>`,
    },
    {
      title: 'Canais reunidos no VipDesk',
      content: cards([
        { title: 'WhatsApp', text: 'Vários atendentes no mesmo número, com fila compartilhada.', link: { href: '/sistema-atendimento-whatsapp/', label: 'Atendimento pelo WhatsApp' } },
        { title: 'Instagram e Facebook', text: 'Mensagens das redes sociais da empresa na mesma fila do WhatsApp.' },
        { title: 'Telegram', text: 'Mais um canal de mensagens atendido pela mesma equipe, com o mesmo histórico.' },
        { title: 'E-mail', text: 'E-mails tratados como conversas, ao lado das mensagens instantâneas.' },
        { title: 'Telefonia', text: 'A telefonia na mesma plataforma em que a equipe atende os demais canais.' },
      ]),
    },
    {
      title: 'Continuidade e gestão da equipe',
      content: panels([
        {
          title: 'Continuidade no atendimento',
          text: 'O cliente não precisa repetir a história quando troca de canal ou de atendente.',
          list: [
            'Histórico unificado por contato',
            'Chamados abertos a partir da conversa, com categoria',
            'Conversas preservadas na plataforma, não no aparelho',
          ],
        },
        {
          title: 'Gestão da operação',
          text: 'Prazos e responsabilidades claros para toda a equipe.',
          list: [
            'Prazos de primeira resposta e de resolução (SLA)',
            'Alertas antes do vencimento e escalonamento automático',
            'Acesso por perfil e registro de auditoria das ações',
          ],
        },
      ]),
    },
    {
      title: 'Benefícios para o negócio',
      content: list([
        '<strong>Menos clientes esquecidos:</strong> uma fila só, com prazos e alertas, em vez de várias caixas de entrada.',
        '<strong>Vendas conectadas ao atendimento:</strong> a conversa pode virar oportunidade no <a href="/crm-whatsapp/">CRM</a> sem redigitar dados.',
        '<strong>Equipe mais produtiva:</strong> <a href="/automacao-atendimento/">automações</a> e <a href="/inteligencia-artificial-atendimento/">IA</a> cuidam de tarefas repetitivas.',
        '<strong>Operação menos dependente de pessoas específicas:</strong> o conhecimento sobre cada cliente fica registrado.',
      ]),
    },
  ],
  faqs: [
    {
      q: 'Qual a diferença entre atendimento multicanal e omnichannel?',
      a: `<p>No multicanal, a empresa está em vários canais, mas cada um funciona isolado. No
        omnichannel, os canais são integrados: a equipe atende tudo numa fila só e vê o histórico
        unificado de cada cliente.</p>`,
    },
    {
      q: 'Quais canais o VipDesk reúne?',
      a: '<p>WhatsApp, Instagram, Facebook, Telegram, e-mail e telefonia.</p>',
    },
    {
      q: 'O histórico de canais diferentes fica junto?',
      a: `<p>Sim. O histórico é unificado por contato, então o atendente vê a conversa inteira,
        independentemente do canal por onde ela começou.</p>`,
    },
    {
      q: 'Atendimento omnichannel também serve para vendas?',
      a: `<p>Sim. No VipDesk, o atendimento e o CRM ficam na mesma base: a conversa pode virar uma
        oportunidade no funil, com distribuição automática de leads e follow-ups.</p>`,
    },
    {
      q: 'Como acompanho os prazos de atendimento?',
      a: `<p>Com chamados com SLA, que têm prazos de primeira resposta e de resolução, alertas antes
        do vencimento e escalonamento automático.</p>`,
    },
  ],
  related: ['/sistema-atendimento-whatsapp/', '/crm-whatsapp/', '/automacao-atendimento/'],
  posts: ['/blog/tempo-de-primeira-resposta/', '/blog/whatsapp-varios-atendentes/'],
  cta: {
    title: 'Coloque todos os canais numa fila só',
    text: 'Agende uma demonstração com os canais que sua empresa já usa e veja o histórico unificado na prática.',
  },
});
