// Helpers mínimos de template. O conteúdo das páginas é escrito por nós (confiável);
// `esc` é usado para atributos e textos vindos de dados.

const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (value) => String(value).replace(/[&<>"']/g, (c) => ENTITIES[c]);

const flatten = (v) => (v == null || v === false ? '' : Array.isArray(v) ? v.map(flatten).join('') : String(v));

// Template literal que aceita arrays (ex.: itens.map(...)) e ignora null/false.
export const html = (strings, ...values) =>
  strings.reduce((out, s, i) => out + s + (i < values.length ? flatten(values[i]) : ''), '');

// Texto puro a partir de HTML (para JSON-LD de FAQ e contagem de palavras).
export const stripTags = (s) =>
  String(s)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .replace(/\s+([.,;:!?)])/g, '$1')
    .trim();

// Serializa JSON-LD com segurança dentro de <script>.
export const jsonForScript = (data) => JSON.stringify(data).replace(/</g, '\\u003c');

const MONTHS = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto',
  'setembro', 'outubro', 'novembro', 'dezembro'];
export const formatDate = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} de ${MONTHS[m - 1]} de ${y}`;
};
