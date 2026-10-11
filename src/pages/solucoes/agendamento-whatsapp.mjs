// Intenção: "agendamento pelo WhatsApp". Detalhes de integração idênticos aos da
// Política de Privacidade (escopos calendar.freebusy e calendar.events).
import { landingPage } from '../../lib/landing.mjs';
import { list, steps, panels, cards } from '../../lib/components.mjs';

export default landingPage({
  path: '/agendamento-whatsapp/',
  title: 'Agendamento pelo WhatsApp com Lembretes | VipDesk',
  description:
    'Portal de auto-agendamento, agenda por profissional, confirmação e lembretes por WhatsApp e integração com Google Calendar e Microsoft 365.',
  h1: 'Agendamento pelo WhatsApp com confirmação, lembretes e agenda integrada',
  lead: `Ofereça horários que respeitam a agenda real de cada profissional, crie a reunião
    automaticamente e envie confirmação e lembretes por WhatsApp, sem troca interminável de
    mensagens.`,
  sections: [
    {
      title: 'O custo de agendar na base da conversa',
      content: list([
        'Várias mensagens de ida e volta até encontrar um horário livre.',
        'Horário oferecido pelo atendente que já estava ocupado na agenda do profissional.',
        'Compromisso marcado no chat, mas esquecido na agenda de quem vai atender.',
        'Clientes que faltam porque ninguém lembrou do horário.',
      ]),
    },
    {
      title: 'Como funciona',
      content: steps([
        {
          title: 'O cliente escolhe um horário',
          text: `Pelo portal público de auto-agendamento ou com a ajuda do atendente, a partir da
            agenda de cada profissional.`,
        },
        {
          title: 'A disponibilidade real é consultada',
          text: `Antes de oferecer um horário, a plataforma consulta os intervalos em que a agenda
            do profissional no Google Calendar ou no Microsoft 365 já está ocupada.`,
        },
        {
          title: 'A reunião é criada automaticamente',
          text: `O compromisso aparece na agenda do profissional e o convite é enviado ao cliente,
            com link do Google Meet ou do Microsoft Teams.`,
        },
        {
          title: 'Confirmação e lembretes por WhatsApp',
          text: 'O cliente recebe confirmação e lembretes, o que ajuda a reduzir faltas.',
        },
        {
          title: 'Remarcações sem retrabalho',
          text: 'Remarcação e cancelamento são refletidos no mesmo evento da agenda.',
        },
      ]),
    },
    {
      title: 'Integração com Google Calendar e Microsoft 365',
      intro: `A conexão é autorizada pelo próprio usuário e pode ser desfeita a qualquer momento, na
        plataforma ou diretamente na conta Google ou Microsoft.`,
      content: panels([
        {
          title: 'O que a plataforma acessa',
          list: [
            'Apenas o início e o fim dos compromissos, para saber quando a agenda está ocupada',
            'Criação, atualização e remoção dos eventos agendados pela própria plataforma',
          ],
        },
        {
          title: 'O que a plataforma não acessa',
          list: [
            'Título, descrição, participantes e local dos seus compromissos',
            'Nenhum evento da sua agenda é copiado para a nossa base',
            'Detalhes completos na <a href="/privacy/">Política de Privacidade</a>',
          ],
        },
      ]),
    },
    {
      title: 'Exemplos de uso',
      content: cards([
        {
          title: 'Clínicas e consultórios',
          text: 'Agenda por profissional, auto-agendamento de consultas e lembretes para diminuir as faltas.',
        },
        {
          title: 'Equipes comerciais',
          text: 'Reuniões de apresentação marcadas a partir do funil, já com link do Meet ou do Teams no convite.',
          link: { href: '/crm-whatsapp/', label: 'CRM para WhatsApp' },
        },
        {
          title: 'Imobiliárias e serviços',
          text: 'Visitas e atendimentos agendados na agenda do corretor ou técnico, com lembrete ao cliente.',
        },
      ]),
    },
  ],
  faqs: [
    {
      q: 'O agendamento funciona com o Google Agenda?',
      a: `<p>Sim. O VipDesk se integra ao Google Calendar para consultar a disponibilidade e criar os
        eventos agendados, com link do Google Meet no convite.</p>`,
    },
    {
      q: 'E com Microsoft 365 e Teams?',
      a: `<p>Sim. A integração com Microsoft 365 / Teams funciona da mesma forma, com link do
        Microsoft Teams no convite.</p>`,
    },
    {
      q: 'A plataforma lê o conteúdo dos meus compromissos?',
      a: `<p>Não. Para verificar a disponibilidade, a plataforma lê apenas o início e o fim dos
        intervalos ocupados. Título, descrição, participantes e local não são acessados, e nenhum
        evento da sua agenda é copiado para a nossa base.</p>`,
    },
    {
      q: 'O cliente recebe lembrete do horário?',
      a: '<p>Sim. Confirmação e lembretes são enviados por WhatsApp.</p>',
    },
    {
      q: 'O cliente pode agendar sozinho?',
      a: '<p>Sim, pelo portal público de auto-agendamento, que mostra os horários disponíveis de cada profissional.</p>',
    },
    {
      q: 'Como desconecto minha agenda?',
      a: `<p>Na tela de integração da plataforma ou diretamente na sua conta Google ou Microsoft.
        Para a integração com o Google, a <a href="/privacy/">Política de Privacidade</a> detalha
        que o acesso é encerrado e as credenciais armazenadas são eliminadas após a revogação.</p>`,
    },
  ],
  related: ['/sistema-atendimento-whatsapp/', '/crm-whatsapp/', '/automacao-atendimento/'],
  cta: {
    title: 'Pare de marcar horários na base da conversa',
    text: 'Agende uma demonstração e veja o auto-agendamento, a integração de agenda e os lembretes funcionando.',
  },
});
