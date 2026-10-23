// Intenção: "construtor visual de fluxos / automação visual de processos de atendimento e CRM".
// Apresenta o DeskFlow como o mecanismo de automações visuais do VipDesk. Só recursos verificados na
// implementação (deskflow-app e deskflow-api, outubro de 2026). A página /automacao-atendimento/
// continua focada nos problemas comerciais e nas regras nativas (SLA, follow-ups, distribuição).
import { landingPage } from '../../lib/landing.mjs';
import { html } from '../../lib/html.mjs';
import { list, steps, cards as cardsIn, demoButton, contactButton } from '../../lib/components.mjs';
import { editorImage, dialogImage, paletteImage, demoVideo, videoObject, deskflowText } from '../../lib/deskflow.mjs';

const lang = 'pt';
const cards = (items) => cardsIn(items, lang);
const t = deskflowText(lang);
// Três painéis lado a lado (a grade de cards acomoda 3 colunas; .duas só 2).
const trio = (items) => html`<div class="grade">${items.map((p) => html`<div class="painel"><h3>${p.title}</h3>${list(p.list)}</div>`)}</div>`;
const ctas = (location) => html`<div class="acoes-inline">${demoButton(location, lang, 'btn-primario')}${contactButton(location, lang, 'btn-linha')}</div>`;

const page = landingPage({
  lang,
  path: '/deskflow/',
  title: 'DeskFlow: Construtor Visual de Fluxos de Atendimento | VipDesk',
  description:
    'Monte workflows de atendimento e CRM no editor visual do VipDesk: gatilhos, condições, ações nos chamados e no funil, integração via API e agentes de IA.',
  h1: 'DeskFlow: o construtor visual de fluxos do VipDesk',
  lead: `Arraste blocos, conecte etapas e automatize processos inteiros de atendimento, CRM e integrações
    sem escrever código. O DeskFlow faz parte do VipDesk e abre dentro da plataforma.`,
  sections: [
    {
      id: 'editor',
      title: 'Um editor visual para desenhar o atendimento',
      intro: `Cada fluxo é um diagrama: os blocos são as etapas (enviar mensagem, perguntar, consultar um
        sistema, criar um negócio) e as setas são as transições, com ou sem condição. O que está no
        canvas é exatamente o que roda nos canais.`,
      content: html`
        <figure class="moldura">${editorImage(lang, { eager: true })}</figure>
        <p class="legenda">${t.editorCaption}</p>
        <div class="grade" style="margin-top:36px">
          ${cards([
            { title: 'Arrastar, conectar, configurar', text: 'Paleta de componentes por categoria, busca de blocos, zoom, minimapa, desfazer e refazer, copiar e colar, grupos e anotações no canvas.' },
            { title: 'Rascunho e publicação', text: 'As alterações ficam em rascunho com salvamento automático. Você publica quando quiser e pode voltar a uma versão anterior pelo histórico.' },
            { title: 'Teste antes de ativar', text: 'Playground com sessões simuladas, teste individual de chamadas de API, contexto da conversa visível e logs de execução por fluxo.' },
            { title: 'Organização e trabalho em equipe', text: 'Pastas, lixeira com restauração, exportação e importação em JSON, comentários no fluxo e indicação de quem está editando.' },
          ])}
        </div>
        ${ctas('deskflow_editor')}`,
    },
    {
      id: 'gatilhos-condicoes-acoes',
      title: 'Gatilhos, condições e ações',
      intro: 'Todo fluxo começa com um gatilho, decide o caminho com condições e executa ações nos canais, no VipDesk ou em outros sistemas.',
      content: html`
        ${trio([
          {
            title: 'Gatilhos: o que inicia o fluxo',
            list: [
              '<strong>Mensagem recebida</strong> em um canal conectado ao VipDesk, como o WhatsApp. O fluxo responde no mesmo canal.',
              '<strong>Agendamento:</strong> execução por intervalo, diária ou semanal, com janela de horário, bloqueio de fins de semana, feriados e datas específicas, para uma lista de números, um grupo de contatos ou um arquivo CSV.',
              '<strong>Chamada por API:</strong> outro sistema inicia o fluxo para um número informado, enviando dados de contexto.',
            ],
          },
          {
            title: 'Condições: por onde a conversa segue',
            list: [
              '<strong>Se/senão</strong> com operadores de igualdade, comparação, “contém”, “existe”, lista e expressão regular sobre qualquer dado da conversa.',
              '<strong>Condições na própria seta:</strong> igual a, contém, valor do contexto, resposta positiva, só dígitos ou regex, sem precisar de um bloco a mais.',
              '<strong>Menu com opções numeradas</strong> e, se quiser, uma IA que escolhe a opção quando o cliente escreve com as próprias palavras.',
            ],
          },
          {
            title: 'Ações: o que o fluxo faz',
            list: [
              'Mensagens de texto, botões, listas, mídia e templates aprovados do WhatsApp.',
              'Captura e validação de dados (nome, CPF, número, e-mail) guardados como variáveis da conversa.',
              'Variáveis e expressões em qualquer campo, com funções prontas para datas, moeda, textos e listas; loops sobre listas e pausas de até 5 minutos.',
              'Ações no VipDesk, consultas a outros sistemas e agentes de IA, descritos abaixo.',
            ],
          },
        ])}`,
    },
    {
      id: 'integracao-api',
      title: 'Integração de sistemas via API',
      intro: 'O bloco de requisição HTTP consulta e grava dados em ERP, e-commerce, sistemas internos e qualquer serviço com API, e a resposta vira variável para os próximos passos.',
      content: html`
        <div class="lado-a-lado">
          <div class="texto">
            ${list([
              '<strong>GET, POST, PUT, PATCH e DELETE</strong> com cabeçalhos, parâmetros de consulta e corpo montados com as variáveis do fluxo.',
              '<strong>Autenticação</strong> por token Bearer, usuário e senha, chave de API no cabeçalho ou na URL, sessão com login automático e token obtido de um endpoint de login.',
              '<strong>Resposta no contexto:</strong> escolha o campo da resposta (por exemplo <code>itens[0].preco</code>) e use nas mensagens e condições seguintes. Saídas separadas para sucesso e erro.',
              '<strong>Credenciais guardadas</strong> como segredos cifrados, referenciadas por nome, nunca escritas no fluxo.',
              '<strong>Alerta de falha</strong> enviado para um webhook quando uma integração começa a dar erro.',
              '<strong>Fontes de dados e base de conhecimento:</strong> importe registros por API, planilhas CSV ou arquivos do Google Drive para a IA consultar nas conversas.',
            ])}
            <p style="margin-top:20px">Para quem programa, há blocos customizados em Python executados em ambiente isolado e conexão com servidores MCP, que expõem ferramentas aos agentes de IA.</p>
            ${ctas('deskflow_integracoes')}
          </div>
          <div>
            <div class="painel">
              <h3>Exemplo: consulta de pedido</h3>
              <p>O cliente informa o número do pedido. O fluxo chama a API do seu sistema com esse número, salva o status em uma variável e responde “Seu pedido ${'${{pedido.status}}'} sai em ${'${{pedido.previsao}}'}”. Se a API falhar, a saída de erro transfere para um atendente.</p>
            </div>
          </div>
        </div>`,
    },
    {
      id: 'nos-vipdesk',
      title: 'Blocos específicos do VipDesk',
      intro: 'Além das mensagens e integrações, o fluxo age diretamente na operação: chamados, CRM, agenda, pagamentos, Kanban e telefonia, sem copiar dados entre telas.',
      content: html`
        <div class="lado-a-lado invertido">
          <div>
            <figure class="moldura estreita">${paletteImage(lang)}</figure>
            <p class="legenda">Categoria “Atendimento” da paleta de componentes.</p>
          </div>
          <div>
            ${cards([
              { title: 'Chamados e equipe', text: 'Transferir para um departamento (com distribuição entre atendentes), alterar o status e o responsável do chamado, aplicar tags no contato e no chamado, transferir a conversa para outro fluxo.' },
              { title: 'CRM de vendas', text: 'Criar negócio no funil com título, valor e origem preenchidos pela conversa; mover o negócio de etapa ou de pipeline quando o cliente avança.' },
              { title: 'Agenda e Kanban', text: 'Criar agendamento na agenda do VipDesk (profissional, serviço e horário) e abrir ou mover cards no Kanban para tarefas que precisam de acompanhamento.' },
              { title: 'Pagamento e telefonia', text: 'Gerar link de pagamento ou Pix pelo provedor configurado no VipDesk e conferir se foi pago; originar ligação com áudio gravado ou conectar o atendente ao cliente.' },
            ])}
            <figure class="moldura" style="max-width:380px;margin-top:28px">${dialogImage(lang)}</figure>
            <p class="legenda">Configuração do bloco “Criar Negócio (CRM)”: título, valor e origem aceitam variáveis da conversa.</p>
          </div>
        </div>`,
    },
    {
      id: 'ia',
      title: 'Inteligência artificial dentro do fluxo',
      intro: 'A IA entra onde faz diferença, com a conversa determinística em volta. Você usa a chave de API do seu provedor (OpenAI, Google Gemini ou Anthropic).',
      content: cards([
        { title: 'Agente de IA com ferramentas', text: 'Um bloco de conversa livre com instruções suas e ferramentas que ele pode acionar: consultar uma API, buscar na base de conhecimento, criar negócio, aplicar tag, agendar, gerar link de pagamento ou transferir para um humano.' },
        { title: 'Classificação de intenção', text: 'O bloco de roteamento por IA lê a mensagem e escolhe entre as saídas que você definiu (“2ª via”, “suporte”, “cancelar”), com resposta de fallback.' },
        { title: 'Base de conhecimento', text: 'Documentos e registros importados viram respostas fundamentadas: a IA responde só com base no material da sua empresa.' },
        { title: 'Áudio e imagem', text: 'Transcrição automática de áudios recebidos e leitura de imagens pelo agente, para o fluxo entender o que o cliente mandou.' },
      ]),
    },
    {
      id: 'exemplos',
      title: 'Exemplos de fluxos',
      intro: 'Três fluxos montados só com os blocos descritos nesta página.',
      content: html`
        ${steps([
          {
            title: 'Atendimento: menu com IA só quando precisa',
            text: `O cliente escreve no WhatsApp. O fluxo cumprimenta pelo nome, oferece um menu numerado e, se
              a pessoa responde com texto livre, a IA escolhe a opção. Consultas simples são respondidas
              por API; fora do horário comercial, uma condição com a hora atual avisa e registra o pedido;
              dentro dele, transfere para o departamento certo com distribuição entre atendentes.`,
          },
          {
            title: 'CRM: do primeiro contato ao vendedor',
            text: `O fluxo pergunta nome, produto de interesse e prazo. Com as respostas, cria o negócio no
              funil com título e valor preenchidos, aplica a tag de origem e transfere para a equipe de
              vendas. Quando o cliente confirma a proposta em outra conversa, outro fluxo move o negócio
              para a etapa seguinte e gera o link de pagamento.`,
          },
          {
            title: 'Chamados: status, responsável e escalonamento',
            text: `Um cliente relata um problema. O fluxo coleta os dados, aplica a tag do tipo de ocorrência,
              altera o status do chamado e o entrega ao departamento responsável. Se a API do sistema de
              campo confirma uma visita, o fluxo informa a data; se não responde, escalona para o gestor
              por transferência. Os prazos de SLA e os alertas de vencimento continuam com as
              <a href="/automacao-atendimento/">regras nativas de automação do VipDesk</a>.`,
          },
        ])}
        ${ctas('deskflow_exemplos')}`,
    },
    {
      id: 'video',
      title: 'Veja o DeskFlow em ação',
      intro: 'Pouco mais de vinte segundos no editor: o fluxo de demonstração, a configuração de um bloco do CRM, a paleta de componentes de atendimento e um agente de IA.',
      content: html`
        ${demoVideo(lang)}
        <p class="legenda">Gravação do editor com um fluxo de demonstração, sem dados de clientes. O vídeo não tem áudio; as legendas descrevem cada etapa.</p>`,
    },
  ],
  faqs: [
    {
      q: 'O DeskFlow é um produto separado do VipDesk?',
      a: `<p>Não. O DeskFlow é o mecanismo de automações visuais do VipDesk e abre dentro da própria
        plataforma, com o mesmo login. Os fluxos atuam nos canais, nos chamados, no CRM e na agenda da
        sua conta.</p>`,
    },
    {
      q: 'Preciso saber programar para usar?',
      a: `<p>Não. Os fluxos são montados arrastando e configurando blocos. Variáveis e condições usam uma
        sintaxe simples, com sugestões ao digitar. Quem programa pode, opcionalmente, criar blocos
        customizados em Python.</p>`,
    },
    {
      q: 'Qual a diferença entre o DeskFlow e as regras de automação do VipDesk?',
      a: `<p>As <a href="/automacao-atendimento/">regras nativas</a> cuidam de distribuição de leads,
        follow-ups por etapa do funil, prazos de SLA e escalonamento. O DeskFlow é para processos
        desenhados por você: conversas guiadas, consultas a outros sistemas, decisões condicionais e
        ações encadeadas no CRM e nos chamados. Os dois trabalham juntos.</p>`,
    },
    {
      q: 'Dá para integrar com o meu sistema?',
      a: `<p>Sim, por API. O bloco de requisição HTTP faz chamadas GET, POST, PUT, PATCH e DELETE com
        autenticação por token, usuário e senha, chave de API ou sessão, e a resposta fica disponível
        para o resto do fluxo. Outros sistemas também podem iniciar um fluxo por API.</p>`,
    },
    {
      q: 'Como testo um fluxo antes de ativar?',
      a: `<p>No playground, com sessões simuladas e o contexto da conversa visível, sem mandar mensagem a
        clientes. As chamadas de API podem ser testadas uma a uma. As alterações ficam em rascunho até
        você publicar, e o histórico permite voltar a uma versão anterior.</p>`,
    },
    {
      q: 'A inteligência artificial é obrigatória?',
      a: `<p>Não. Um fluxo pode ser totalmente determinístico, com menus, condições e integrações. Os
        blocos de IA são opcionais e usam a chave de API do provedor escolhido pela sua empresa (OpenAI,
        Google Gemini ou Anthropic).</p>`,
    },
    {
      q: 'Em quais canais o fluxo responde?',
      a: `<p>Nos canais conectados à sua conta do VipDesk. O fluxo é vinculado às contas em que deve
        atuar, e cada conta fica em um único fluxo ativo por vez. Fluxos agendados também podem enviar
        mensagens a partir de uma lista de números, de um grupo de contatos ou de um arquivo CSV.</p>`,
    },
  ],
  related: ['/automacao-atendimento/', '/crm-whatsapp/', '/inteligencia-artificial-atendimento/'],
  posts: ['/blog/integrar-atendimento-e-funil-de-vendas/'],
  cta: {
    title: 'Veja um fluxo montado para a sua operação',
    text: 'Na demonstração, desenhamos com você um processo real da sua equipe no DeskFlow, do gatilho à ação no CRM ou no chamado.',
  },
});

page.jsonLd.push(videoObject(lang, page.path));

export default page;
