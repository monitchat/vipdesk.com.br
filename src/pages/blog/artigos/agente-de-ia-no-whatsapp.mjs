// Apoia: /deskflow/ e /inteligencia-artificial-atendimento/ (intenção informacional: "agente de
// IA no WhatsApp", "IA com WhatsApp"). Só recursos existentes no DeskFlow e no VipDesk.
export default {
  key: 'post-ai-agent-whatsapp',
  slug: 'agente-de-ia-no-whatsapp',
  title: 'Agente de IA no WhatsApp: O Que Faz e Quando Usar',
  description:
    'O que é um agente de IA no WhatsApp, como ele difere de um chatbot de menu e da IA de apoio, quando vale usar e como manter a conversa sob controle.',
  h1: 'Agente de IA no WhatsApp: o que ele faz e quando usar',
  published: '2026-10-23',
  solutions: ['/deskflow/', '/inteligencia-artificial-atendimento/', '/sistema-atendimento-whatsapp/'],
  summary: `um agente de IA no WhatsApp conversa com o cliente seguindo instruções suas e aciona
    ferramentas: consultar dados, criar um negócio, agendar, transferir. Vale usar para dúvidas
    abertas e consultas variadas; não vale para o que é previsível, que um fluxo de menu resolve
    melhor, nem para o que exige responsabilidade humana. O segredo é cercá-lo com regras.`,
  body: `
<p>“IA no WhatsApp” virou um termo guarda-chuva. Ele cobre desde um robô que responde “oi” até um
agente que consulta o estoque, cria o pedido e agenda a entrega. Este artigo separa os tipos,
explica o que um <strong>agente de IA</strong> faz de fato numa conversa de WhatsApp e dá critérios
para decidir onde ele vale a pena.</p>

<h2>Três coisas diferentes que chamam de “IA no WhatsApp”</h2>
<table class="comparativo">
  <thead>
    <tr><th>Tipo</th><th>O que faz</th><th>Quem decide a resposta</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Chatbot de fluxo</strong></td><td>Segue um diagrama: menu, perguntas, condições, ações.</td><td>O desenho do fluxo. Mesma entrada, mesma saída.</td></tr>
    <tr><td><strong>IA de apoio ao atendente</strong></td><td>Resume a conversa, sugere uma resposta, classifica o contato.</td><td>O atendente, que revisa e envia.</td></tr>
    <tr><td><strong>Agente de IA</strong></td><td>Conversa com o cliente, interpreta pedidos e aciona ferramentas.</td><td>O modelo, dentro das instruções e ferramentas que você definiu.</td></tr>
  </tbody>
</table>
<p>Os três convivem. Numa operação bem montada, o fluxo cuida do previsível, o agente das dúvidas
abertas e a IA de apoio acelera o atendente quando a conversa chega a uma pessoa.</p>

<h2>O que um agente de IA faz numa conversa</h2>
<p>Um agente é um bloco de conversa livre com três ingredientes:</p>
<ol>
  <li><strong>Instruções.</strong> Um texto seu dizendo quem ele é, o que pode e o que não pode fazer, o tom e quando transferir. É o documento mais importante do projeto.</li>
  <li><strong>Memória da conversa.</strong> Ele considera as mensagens recentes e um resumo do que veio antes, para não perguntar duas vezes a mesma coisa.</li>
  <li><strong>Ferramentas.</strong> Ações que ele pode acionar quando a conversa pede: buscar na base de conhecimento, consultar uma API, criar um negócio no CRM, consultar e marcar um horário, gerar um link de pagamento, aplicar uma tag, transferir para um departamento ou encerrar.</li>
</ol>
<p>Na prática, a conversa fica assim: o cliente pergunta “tem o modelo X em azul?”, o agente
aciona a ferramenta de consulta ao catálogo, lê a resposta e responde com o que encontrou. Se o
cliente diz “quero”, ele cria o negócio no CRM e passa para um vendedor. Nada disso foi roteirizado
como menu; foi definido como ferramentas disponíveis e regras de uso.</p>

<h2>Quando um agente vale a pena</h2>
<ul>
  <li><strong>Dúvidas abertas sobre a sua empresa</strong>, respondidas a partir de uma base de conhecimento: políticas, produtos, prazos, documentação.</li>
  <li><strong>Consultas variadas ao mesmo sistema</strong>, em que um menu ficaria enorme: “qual o status do pedido”, “quando vence a fatura”, “tem horário na quinta”.</li>
  <li><strong>Texto livre em vez de opções</strong>: pessoas que escrevem o problema com as próprias palavras, inclusive por áudio transcrito.</li>
  <li><strong>Qualificação de leads</strong> com perguntas que mudam conforme a resposta anterior.</li>
</ul>

<h2>Quando não usar (ou usar com cuidado)</h2>
<ul>
  <li><strong>O que é previsível.</strong> Horário de funcionamento e segunda via não precisam de modelo de linguagem; um fluxo de menu é mais barato, mais rápido e não erra.</li>
  <li><strong>Promessas com consequência.</strong> Preço negociado, prazo garantido, cancelamento, reembolso. Deixe para uma pessoa, ou limite o agente a coletar e transferir.</li>
  <li><strong>Cliente irritado.</strong> Reclamação pede escuta humana. Configure o agente para transferir ao detectar o tom, ou nem o coloque nesse ramo.</li>
  <li><strong>Sem base de conhecimento.</strong> Agente sem fonte confiável inventa. Alimente-o com os seus documentos e limite as respostas a eles.</li>
</ul>

<h2>Como manter o agente sob controle</h2>
<p>O risco de um agente não é ele “pensar demais”; é ele operar sem cerca. Cinco cercas que
funcionam:</p>
<ol>
  <li><strong>Fluxo em volta do agente.</strong> Antes dele, identifique o cliente e o assunto com blocos determinísticos. Depois dele, execute as ações pelo fluxo, não pela IA. No <a href="/deskflow/">DeskFlow</a>, o agente é um bloco entre outros.</li>
  <li><strong>Ferramentas mínimas.</strong> Dê só as ferramentas que aquele agente precisa. Um agente de suporte não precisa criar negócios no CRM.</li>
  <li><strong>Transferência explícita.</strong> Uma ferramenta de “transferir para humano” com critérios escritos nas instruções: quando não souber, quando o cliente pedir, quando houver reclamação.</li>
  <li><strong>Limite de iterações e de tempo.</strong> Evita conversas em círculo e custos inesperados.</li>
  <li><strong>Teste com conversas reais anonimizadas</strong> antes de publicar, e leia os logs nas primeiras semanas. As instruções melhoram a cada revisão.</li>
</ol>

<h2>Custo e provedor</h2>
<p>Um agente consome chamadas a um modelo de linguagem a cada mensagem. No VipDesk, você usa a
chave de API do provedor escolhido pela sua empresa (OpenAI, Google Gemini ou Anthropic), paga
diretamente ao provedor pelo uso e escolhe o modelo por fluxo. Por isso vale a regra do item
anterior: o que o fluxo resolve sem IA, resolva sem IA.</p>

<h2>Um exemplo completo</h2>
<p>Uma assistência técnica recebe no WhatsApp pedidos de orçamento, consultas de status e
reclamações.</p>
<ul>
  <li>O <strong>fluxo</strong> cumprimenta, pede o CPF e consulta o cadastro por API.</li>
  <li>Um <strong>roteador por IA</strong> lê a primeira mensagem e separa: orçamento, status, reclamação.</li>
  <li><strong>Status</strong> é resolvido pelo fluxo com uma consulta à API, sem agente.</li>
  <li><strong>Orçamento</strong> vai para um agente de IA com a base de conhecimento de serviços e preços de referência; quando o cliente aceita, o agente cria o negócio no CRM e transfere para a equipe.</li>
  <li><strong>Reclamação</strong> não passa pelo agente: o fluxo aplica a tag, altera o status do chamado e transfere para o supervisor.</li>
</ul>
<p>O resultado é uma operação em que a IA responde o que varia, o fluxo responde o que se
repete e a equipe recebe o que exige julgamento, com o contexto completo.</p>
<p class="destaque">No VipDesk, os agentes de IA são montados no <a href="/deskflow/">DeskFlow</a>
e trabalham ao lado da <a href="/inteligencia-artificial-atendimento/">IA de apoio ao
atendente</a>. Na demonstração, mostramos um agente configurado com o seu cenário.</p>
`,
};
