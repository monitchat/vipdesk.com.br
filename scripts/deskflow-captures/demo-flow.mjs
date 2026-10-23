// Fluxo de demonstração usado nas capturas. Só tipos de nó que existem na paleta do DeskFlow
// (deskflow-app/src/components/Sidebar.jsx). Renderizado pelo editor real com a API simulada; nenhum dado de cliente.
const n = (id, type, x, y, data) => ({ id, type, position: { x, y }, data });
const e = (id, source, target, extra = {}) => ({ id, source, target, ...extra });

export const nodes = [
  n('node_start', 'start', 0, 300, { label: 'Início' }),
  n('node_1', 'message', 230, 300, { label: 'Boas-vindas', message: 'Olá! Sou o assistente virtual. Para começar, me diga seu nome.' }),
  n('node_2', 'input', 470, 300, { label: 'Capturar nome', message: 'Qual é o seu nome?', input_type: 'text', context_key: 'nome' }),
  n('node_3', 'router', 700, 280, {
    label: 'Menu principal',
    message: '${{nome}}, como posso ajudar?\n1 - Pedir orçamento\n2 - Suporte técnico\n3 - Falar com um atendente',
    ai_fallback: true,
    error_message: 'Não entendi. Responda com 1, 2 ou 3.',
    options: [
      { id: 'opt_orcamento', label: '1 · Orçamento', value: '1' },
      { id: 'opt_suporte', label: '2 · Suporte', value: '2' },
      { id: 'opt_atendente', label: '3 · Atendente', value: '3' },
    ],
  }),
  // Ramo 1: orçamento → integração → CRM → vendas
  n('node_4', 'input', 980, 20, { label: 'Produto de interesse', message: 'Qual produto você quer cotar?', input_type: 'text', context_key: 'produto' }),
  n('node_5', 'api_request', 1220, 20, { label: 'Consultar tabela de preços', method: 'GET', url: 'https://api.suaempresa.com.br/precos?produto=${{produto}}', context_key: 'tabela' }),
  n('node_7', 'crm_deal_create', 1520, 0, { label: 'Criar negócio no CRM', title: 'Orçamento — ${{produto}}', value: '${{tabela.preco}}', source: 'whatsapp' }),
  n('node_8', 'set_tags', 1800, 0, { label: 'Marcar lead', tags: [{ id: 1, tag: 'lead-whatsapp', color: '#7e3e97' }, { id: 2, tag: 'orçamento', color: '#00a9b7' }], apply_contact: true }),
  n('node_9', 'transfer', 2060, 0, { label: 'Transferir para Vendas', department_id: 'Vendas', distribute: true, message: 'Vou te passar para um vendedor agora.' }),
  // Ramo 2: suporte com agente de IA
  n('node_10', 'ai_agent', 980, 300, {
    label: 'Agente de suporte',
    ai_provider: 'openai',
    prompt: 'Você é o suporte técnico da empresa. Responda com base na base de conhecimento. Se não resolver, transfira para o suporte humano.',
    tools: [{ type: 'knowledge', name: 'Base de conhecimento' }, { type: 'transfer', name: 'Transferir para Suporte' }, { type: 'apply_tag', name: 'Aplicar tag' }],
  }),
  // Ramo 3: atendente humano
  n('node_11', 'set_ticket_status', 980, 600, { label: 'Status: aguardando atendente', status_id: 'Em atendimento' }),
  n('node_12', 'transfer', 1250, 580, { label: 'Transferir para Atendimento', department_id: 'Atendimento', distribute: true }),
  n('node_13', 'end', 1520, 620, { label: 'Finalizar' }),
];

export const edges = [
  e('e_start_1', 'node_start', 'node_1'),
  e('e_1_2', 'node_1', 'node_2'),
  e('e_2_3', 'node_2', 'node_3'),
  e('e_3_4', 'node_3', 'node_4', { sourceHandle: 'opt_orcamento' }),
  e('e_3_10', 'node_3', 'node_10', { sourceHandle: 'opt_suporte' }),
  e('e_3_11', 'node_3', 'node_11', { sourceHandle: 'opt_atendente' }),
  e('e_4_5', 'node_4', 'node_5'),
  e('e_5_7', 'node_5', 'node_7', { data: { condition: { type: 'context', key: 'tabela.preco', operator: 'exists' }, label: 'Tem preço' } }),
  e('e_7_8', 'node_7', 'node_8', { sourceHandle: 'success' }),
  e('e_8_9', 'node_8', 'node_9'),
  e('e_11_12', 'node_11', 'node_12'),
  e('e_12_13', 'node_12', 'node_13', { sourceHandle: 'success' }),
];

export const flow = {
  id: 777,
  name: 'Orçamento, suporte e atendimento humano',
  description: 'Fluxo de demonstração: qualifica o contato, consulta preços por API, cria o negócio no CRM e transfere para a equipe.',
  flow_type: 'agent',
  is_active: true,
  execution_mode: 'passive',
  priority: 0,
  allowed_accounts: [],
  has_draft_changes: false,
  draft_data: null,
  data: { nodes, edges, tags: [] },
  created_at: '2026-10-01T12:00:00Z',
  updated_at: '2026-10-20T12:00:00Z',
};
