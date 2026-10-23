// Apoia: /deskflow/ e /sistema-atendimento-whatsapp/ (intenção informacional: "chatbot para
// WhatsApp", "automação de fluxo no WhatsApp"). Só recursos existentes no DeskFlow e no VipDesk.
export default {
  key: 'post-whatsapp-chatbot',
  slug: 'chatbot-whatsapp-sem-programar',
  title: 'Como Criar um Chatbot para WhatsApp sem Programar',
  description:
    'Passo a passo para montar um chatbot de WhatsApp num construtor visual de fluxos: menu, captura de dados, integração via API, IA e transferência para a equipe.',
  h1: 'Como criar um chatbot para WhatsApp sem programar',
  published: '2026-10-23',
  solutions: ['/deskflow/', '/sistema-atendimento-whatsapp/', '/automacao-atendimento/'],
  summary: `um chatbot de WhatsApp é um fluxo: gatilho, menu, perguntas, condições e ações. Com um
    construtor visual, você monta esse fluxo arrastando blocos, liga a conta do WhatsApp, testa num
    ambiente simulado e publica. O ponto mais importante é definir quando a conversa vai para uma
    pessoa.`,
  body: `
<p>Boa parte das mensagens que chegam ao WhatsApp de uma empresa são previsíveis: horário de
funcionamento, status de um pedido, segunda via, agendar um horário, falar com vendas. Um
<strong>chatbot para WhatsApp</strong> resolve esse volume sem fila e sem espera, e entrega para a
equipe só o que precisa de gente. Este guia mostra como montar um, do zero, num
<strong>construtor visual de fluxos</strong>, sem escrever código.</p>

<h2>O que é um chatbot de fluxo</h2>
<p>Um chatbot de fluxo é um diagrama que roda: cada bloco é uma etapa (enviar uma mensagem,
fazer uma pergunta, consultar um sistema, transferir) e cada seta é uma transição, com ou sem
condição. Quando o cliente manda uma mensagem, o fluxo começa no bloco de início e segue as setas
até terminar ou até entregar a conversa a um atendente.</p>
<p>Isso é diferente de uma inteligência artificial que responde livremente. O fluxo é
determinístico: a mesma resposta leva sempre ao mesmo lugar. A IA pode entrar em pontos
específicos, como veremos adiante, mas a espinha dorsal do chatbot é o fluxo.</p>

<h2>Passo 1: defina o que o chatbot resolve e o que ele não resolve</h2>
<p>Liste os cinco motivos mais frequentes de contato. Para cada um, decida: o chatbot resolve
sozinho, resolve com uma consulta a outro sistema, ou só coleta os dados e transfere? Esse
mapeamento evita o erro mais comum, que é tentar automatizar tudo e frustrar quem precisava de
uma pessoa.</p>
<ul>
  <li><strong>Resolve sozinho:</strong> horário, endereço, formas de pagamento, política de troca.</li>
  <li><strong>Resolve com consulta:</strong> status do pedido, saldo, segunda via, disponibilidade de horário.</li>
  <li><strong>Coleta e transfere:</strong> reclamações, negociações, qualquer coisa fora do roteiro.</li>
</ul>

<h2>Passo 2: desenhe o fluxo antes de configurar</h2>
<p>Num papel ou no próprio editor, desenhe a conversa como um diagrama: boas-vindas, menu
principal, um ramo por opção e, em cada ramo, as perguntas, as consultas e o encerramento ou a
transferência. Um bom fluxo inicial tem poucos níveis de menu e um caminho claro para “falar com
um atendente” em qualquer ponto.</p>

<h2>Passo 3: monte o chatbot no construtor visual</h2>
<p>No <a href="/deskflow/">DeskFlow</a>, o construtor de fluxos do VipDesk, os blocos ficam numa
paleta e são arrastados para o canvas. Os que você vai usar primeiro:</p>
<ol>
  <li><strong>Início:</strong> o gatilho. O fluxo começa quando chega uma mensagem na conta de WhatsApp vinculada a ele.</li>
  <li><strong>Mensagem de texto:</strong> a saudação. Use variáveis como o nome do contato para personalizar.</li>
  <li><strong>Menu (router):</strong> opções numeradas. Cada opção vira uma saída do bloco; a saída de erro cobre respostas inesperadas.</li>
  <li><strong>Botões e listas:</strong> alternativas ao menu digitado, dentro dos limites do WhatsApp (botões têm no máximo três opções).</li>
  <li><strong>Capturar dados:</strong> pergunta e valida a resposta (CPF, número do pedido, e-mail) e guarda numa variável da conversa.</li>
  <li><strong>Condição (se/senão):</strong> decide o caminho a partir de uma variável, como “cliente cadastrado” ou “valor maior que”.</li>
  <li><strong>Transferir:</strong> entrega a conversa a um departamento, com distribuição entre os atendentes disponíveis.</li>
  <li><strong>Finalizar:</strong> encerra o fluxo e limpa o contexto da conversa.</li>
</ol>
<p>As condições também podem ficar nas próprias setas (igual a, contém, resposta positiva, só
dígitos, expressão regular), o que mantém o diagrama enxuto.</p>

<h2>Passo 4: conecte o chatbot aos seus sistemas</h2>
<p>É aqui que o chatbot deixa de ser um menu e passa a resolver. O bloco de requisição HTTP
chama a API do seu sistema (ERP, e-commerce, agenda, sistema próprio) com os dados que o cliente
informou, e a resposta vira variável para as próximas mensagens:</p>
<p class="destaque">“Seu pedido <code>\${{pedido.numero}}</code> está <code>\${{pedido.status}}</code>
e deve chegar em <code>\${{pedido.previsao}}</code>.”</p>
<p>Guarde credenciais como segredos (nunca no texto do fluxo), trate a saída de erro da chamada
(transfira para um atendente em vez de deixar o cliente sem resposta) e use o teste individual do
bloco para conferir a resposta da API antes de publicar.</p>

<h2>Passo 5: use IA só onde ela ajuda</h2>
<p>Dois usos valem a pena desde o início:</p>
<ul>
  <li><strong>Entender texto livre no menu.</strong> Se o cliente escreve “minha entrega atrasou” em vez de digitar “2”, a IA escolhe a opção correspondente. Quem digita o número segue direto, sem IA.</li>
  <li><strong>Responder dúvidas a partir da sua base de conhecimento.</strong> Um agente de IA com acesso aos seus documentos responde perguntas abertas e transfere quando não sabe.</li>
</ul>
<p>Mantenha a IA cercada pelo fluxo: validações determinísticas antes, ações controladas depois e
sempre um caminho para a equipe. O artigo
<a href="/blog/agente-de-ia-no-whatsapp/">agente de IA no WhatsApp: o que faz e quando usar</a>
detalha os critérios.</p>

<h2>Passo 6: decida como a conversa chega à equipe</h2>
<p>O melhor chatbot é o que sabe parar. Defina:</p>
<ul>
  <li>Quais opções do menu transferem direto e para qual departamento.</li>
  <li>O que acontece fora do horário: uma condição com a hora atual avisa, registra o pedido e, se for o caso, marca o chamado para a manhã seguinte.</li>
  <li>Quantas tentativas o cliente tem antes de a conversa ir para uma pessoa.</li>
</ul>
<p>Num sistema de atendimento como o VipDesk, o atendente recebe a conversa na mesma fila do
<a href="/sistema-atendimento-whatsapp/">WhatsApp com vários atendentes</a>, com o histórico do que
o chatbot já perguntou. Ninguém pede o CPF de novo.</p>

<h2>Passo 7: teste, publique e ative</h2>
<ol>
  <li><strong>Teste no playground</strong>, com sessões simuladas, antes de qualquer cliente ver o fluxo.</li>
  <li><strong>Publique</strong> quando estiver satisfeito. As alterações ficam em rascunho até lá, e o histórico de versões permite voltar atrás.</li>
  <li><strong>Vincule a conta de WhatsApp</strong> ao fluxo e ative. Uma conta fica em um único fluxo ativo por vez.</li>
  <li><strong>Acompanhe os logs de execução</strong> nos primeiros dias e ajuste as mensagens de erro e os pontos de transferência.</li>
</ol>

<h2>Sobre a conexão do WhatsApp</h2>
<p>O chatbot roda na conta de WhatsApp conectada à plataforma. Para operações críticas, a
recomendação dos <a href="/terms/">Termos de Uso</a> do VipDesk é a API Oficial do WhatsApp, que
também é a que permite enviar templates aprovados em fluxos agendados, como lembretes e cobranças.
A conexão por QR Code existe, mas envolve risco de bloqueio do número.</p>

<h2>Erros comuns</h2>
<ul>
  <li><strong>Menu com muitos níveis.</strong> Três toques para chegar a “falar com atendente” já é demais.</li>
  <li><strong>Sem saída de erro.</strong> Toda consulta a sistema e todo menu precisam de um caminho para respostas inesperadas.</li>
  <li><strong>Automatizar a reclamação.</strong> Cliente irritado quer gente. Colete o mínimo e transfira.</li>
  <li><strong>Esquecer o pós-transferência.</strong> O atendente precisa ver o que o chatbot já fez; se não vê, o cliente repete tudo.</li>
</ul>
<p class="destaque">No VipDesk, o chatbot é montado no <a href="/deskflow/">DeskFlow</a>, com
menus, captura de dados, integração via API, agentes de IA e transferência para a equipe no mesmo
WhatsApp. Na demonstração, montamos o fluxo com o seu cenário.</p>
`,
};
