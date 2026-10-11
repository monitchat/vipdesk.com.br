// Intenção: "sistema de atendimento WhatsApp" + "WhatsApp com múltiplos atendentes".
// As duas intenções foram consolidadas aqui para evitar duas páginas quase idênticas
// (ver docs/SEO-STRATEGY.md, mapa de palavras-chave).
import { landingPage } from '../../lib/landing.mjs';
import { html } from '../../lib/html.mjs';
import { list, steps, panels, cards } from '../../lib/components.mjs';

export default landingPage({
  path: '/sistema-atendimento-whatsapp/',
  title: 'Sistema de Atendimento WhatsApp para Equipes | VipDesk',
  description:
    'Atenda pelo WhatsApp com vários atendentes no mesmo número: fila compartilhada, histórico por contato, chamados com SLA e automações no VipDesk.',
  h1: 'Sistema de atendimento pelo WhatsApp para equipes com vários atendentes',
  lead: `Coloque toda a equipe no mesmo número de WhatsApp, com fila compartilhada, histórico
    completo de cada cliente, chamados com prazo e a conversa ligada ao funil de vendas.`,
  sections: [
    {
      title: 'Quando o WhatsApp da empresa vira gargalo',
      intro: `O WhatsApp é o canal preferido de muitos clientes, mas um celular compartilhado não foi
        feito para uma equipe inteira. Os sintomas costumam ser os mesmos:`,
      content: list([
        'Um aparelho passando de mão em mão, ou vários números pessoais falando em nome da empresa.',
        'Conversas sem dono: duas pessoas respondem o mesmo cliente, ou ninguém responde.',
        'Quando o atendente sai de férias ou deixa a empresa, o histórico vai junto.',
        'Ninguém sabe quanto tempo o cliente está esperando nem quais pedidos estão atrasados.',
        'Pedidos de orçamento se perdem entre mensagens e nunca chegam ao time comercial.',
        'O gestor não tem como acompanhar a operação sem ler conversa por conversa.',
      ]),
    },
    {
      title: 'Como o VipDesk organiza as conversas',
      intro: 'Cada mensagem segue um caminho claro, do primeiro contato até a resolução ou a venda.',
      content: steps([
        {
          title: 'A conversa entra numa fila compartilhada',
          text: `Mensagens de WhatsApp — e também de Instagram, Facebook, Telegram e e-mail — chegam
            na mesma fila, visível para a equipe autorizada.`,
        },
        {
          title: 'Um atendente assume com o histórico completo',
          text: `Quem assume vê tudo o que já aconteceu com aquele contato, inclusive conversas
            iniciadas por outros canais ou atendidas por colegas.`,
        },
        {
          title: 'Pedidos viram chamados com prazo',
          text: `Quando a demanda precisa de acompanhamento, o atendente abre um chamado a partir da
            própria conversa, com categoria e prazos de primeira resposta e de resolução.`,
        },
        {
          title: 'Interesse de compra vira oportunidade',
          text: `Se a conversa é uma venda, ela segue para o funil do CRM, com proposta, contrato e
            follow-ups automáticos.`,
        },
      ]),
    },
    {
      title: 'Vários atendentes, um só número, com controle',
      intro: `Atendimento compartilhado só funciona quando cada pessoa sabe o que é dela e o gestor
        enxerga o todo.`,
      content: panels([
        {
          title: 'Organização da equipe',
          text: 'A operação deixa de depender de um aparelho ou de uma pessoa.',
          list: [
            'Fila compartilhada entre os atendentes autorizados',
            'Histórico unificado por contato, que permanece na plataforma',
            'Chamados com categorias para separar assuntos e responsáveis',
          ],
        },
        {
          title: 'Controle e segurança',
          text: 'Cada pessoa acessa apenas o que o seu perfil permite.',
          list: [
            'Acesso por perfil de usuário',
            'Registro de auditoria das ações',
            'Credenciais de integração armazenadas de forma criptografada',
          ],
        },
      ]),
    },
    {
      title: 'Distribuição e acompanhamento de prazos',
      intro: `O que não tem prazo não é acompanhado. No VipDesk, atendimento e vendas têm relógio
        e alertas.`,
      content: panels([
        {
          title: 'Chamados com SLA',
          list: [
            'Prazos de primeira resposta e de resolução por chamado',
            'Alertas antes do vencimento',
            'Escalonamento automático quando o prazo está em risco',
          ],
        },
        {
          title: 'Leads distribuídos entre vendedores',
          list: [
            'Distribuição automática de leads entre a equipe comercial',
            'Prazo definido para o primeiro contato',
            'Redistribuição automática quando o vendedor não responde',
          ],
        },
      ]),
    },
    {
      title: 'Automação e produtividade no dia a dia',
      intro: 'Menos trabalho repetitivo para a equipe, sem tirar dela as decisões importantes.',
      content: cards([
        {
          title: 'Follow-ups automáticos',
          text: `Sequências de acompanhamento por etapa do funil, com passos de espera que são
            cancelados sozinhos quando o cliente responde.`,
          link: { href: '/automacao-atendimento/', label: 'Automação de atendimento' },
        },
        {
          title: 'Resumos e sugestões com IA',
          text: `A inteligência artificial resume conversas longas e sugere respostas, que o
            atendente revisa antes de enviar.`,
          link: { href: '/inteligencia-artificial-atendimento/', label: 'IA no atendimento' },
        },
        {
          title: 'Agendamento na conversa',
          text: `Horários consultados na agenda real do profissional, com confirmação e lembretes
            enviados por WhatsApp.`,
          link: { href: '/agendamento-whatsapp/', label: 'Agendamento pelo WhatsApp' },
        },
      ]),
    },
    {
      title: 'Como o número de WhatsApp é conectado',
      content: html`<div class="texto">
        <p>O número pode ser conectado à plataforma pela leitura de QR Code. Esse método usa
        interfaces baseadas no WhatsApp Web, que <strong>não são homologadas pela Meta</strong>,
        e por isso envolve risco de bloqueio ou desconexão do número, a critério do WhatsApp.</p>
        <p>Para operações críticas, os nossos <a href="/terms/">Termos de Uso</a> recomendam a
        API Oficial do WhatsApp (WhatsApp Business API / Cloud API), sujeita às regras e tarifas da
        Meta. Na demonstração, o time comercial ajuda a avaliar o caminho mais adequado para o seu
        volume e o seu tipo de operação.</p>
      </div>`,
    },
  ],
  faqs: [
    {
      q: 'Vários atendentes podem usar o mesmo número de WhatsApp?',
      a: `<p>Sim. As conversas do número entram numa fila compartilhada e cada atendente autorizado
        pode assumir um contato, com o histórico completo. A quantidade de usuários depende do
        plano contratado; o time comercial informa as opções disponíveis.</p>`,
    },
    {
      q: 'O que acontece com o histórico quando um atendente sai da empresa?',
      a: `<p>O histórico fica registrado por contato na plataforma, e não no aparelho de quem
        atendeu. Basta remover o acesso do usuário: as conversas continuam disponíveis para quem
        assumir o atendimento.</p>`,
    },
    {
      q: 'Consigo atender Instagram, Facebook e e-mail na mesma tela?',
      a: `<p>Sim. WhatsApp, Instagram, Facebook, Telegram e e-mail entram na mesma fila, com
        histórico unificado por contato. Veja o
        <a href="/atendimento-omnichannel/">atendimento omnichannel</a>.</p>`,
    },
    {
      q: 'Como acompanho se os clientes estão sendo respondidos a tempo?',
      a: `<p>Com chamados com SLA: cada chamado tem prazo de primeira resposta e de resolução,
        alerta antes de vencer e escalonamento automático. Para leads, há prazo de primeiro
        contato e redistribuição quando o vendedor não responde.</p>`,
    },
    {
      q: 'Dá para transformar uma conversa em venda?',
      a: `<p>Sim. A conversa pode seguir para o funil de vendas, com propostas, contratos, metas e
        follow-ups automáticos. Saiba mais sobre o <a href="/crm-whatsapp/">CRM para WhatsApp</a>.</p>`,
    },
    {
      q: 'Existe risco de bloqueio do número?',
      a: `<p>Na conexão por QR Code, sim: é um método não homologado pela Meta e o bloqueio pode
        ocorrer a critério do WhatsApp, como detalham os <a href="/terms/">Termos de Uso</a>. Para
        operações críticas, a recomendação é a API Oficial do WhatsApp. Respeitar o consentimento
        dos contatos e evitar envios em massa não solicitados também é obrigatório.</p>`,
    },
  ],
  related: ['/crm-whatsapp/', '/atendimento-omnichannel/', '/automacao-atendimento/'],
  posts: ['/blog/whatsapp-varios-atendentes/', '/blog/tempo-de-primeira-resposta/'],
  cta: {
    title: 'Organize o WhatsApp da sua equipe',
    text: 'Agende uma demonstração e veja a fila, o histórico e os prazos funcionando com o fluxo da sua empresa.',
  },
});
