# Google Analytics 4 — VipDesk

Instalado em 13/10/2026. Documentação revisada em 03/11/2026; ver também [monitoramento de SEO](seo-monitoring.md).

## O que está instalado

- Propriedade GA4: **`G-5L7TXDVM7T`** (configurada em `src/config.mjs` → `SITE.ga4Id`).
- Tag gtag.js padrão do Google, igual à fornecida pelo painel do GA4, logo após o `<meta viewport>`
  de **todas** as páginas: 16 em português, 16 em inglês e a 404.
- Carregamento assíncrono (`async`): não bloqueia a renderização da página.
- Medição automática do GA4: `page_view` e, se a "Medição otimizada" estiver ligada na
  propriedade, rolagem, cliques de saída etc.
- Evento personalizado **`cta_click`**, enviado em todo clique num botão comercial:

| Parâmetro | Valores |
| --- | --- |
| `cta_type` | `demo_request` (Agendar demonstração / Book a demo), `contact_click` (Falar com especialista / e-mail comercial), `app_access` (Acessar a plataforma / Log in), `trial_start` (quando o teste grátis for ligado) |
| `cta_location` | `hero`, `faixa_final`, `topo`, `menu_movel`, `rodape`, `artigo`, `blog`, `*_email`; na home e em /deskflow/: `deskflow_home`, `deskflow_editor`, `deskflow_integracoes`, `deskflow_exemplos` |
| `link_url` | destino do botão |

`cta_click` é um **clique** (intenção). Em português, "Agendar demonstração" leva ao formulário; em inglês, abre o e-mail.
O clique não garante envio ou agendamento. Não use esse evento como "lead".

O evento existente **`generate_lead`** observa a confirmação `.vd-msg-ok` após submit do
formulário e inclui `form_id` e `lead_source`. Os testes verificam falha, sucesso e reenvio
com widget simulado; a confirmação real do serviço precisa ser validada após publicação.

## Configurar no painel do GA4 (manual)

1. **Admin → Definições personalizadas → Criar dimensões personalizadas** (escopo de evento):
   `cta_type` e `cta_location`. Sem isso, os parâmetros não aparecem nos relatórios.
2. **Eventos-chave:** se quiser acompanhar intenção de demonstração, crie um evento derivado
   (ex.: `demo_click`, quando `event_name = cta_click` e `cta_type = demo_request`) e marque-o como
   evento-chave, chamando-o claramente de "clique", não de "lead".
3. **Filtrar tráfego interno:** Admin → Fluxos de dados → Configurar tag → Definir tráfego interno
   (IPs da empresa) e ativar o filtro.
4. **Separar idiomas:** filtre por "Caminho da página" que começa com `/en/`.
5. **Vincular a Search Console** (Admin → Links de produtos) para ver consultas orgânicas no GA4.

## Verificar depois do deploy

1. Abra https://vipdesk.com.br e veja **Relatórios → Tempo real**: sua visita deve aparecer em
   até cerca de 1 minuto.
2. Use o **Tag Assistant** (tagassistant.google.com) ou **Admin → DebugView** e clique em
   "Agendar demonstração": deve aparecer `cta_click` com `cta_type = demo_request`.
3. Repita em https://vipdesk.com.br/en/.

O recebimento dos eventos na propriedade GA4 **não foi verificado**: não houve acesso ao painel.
A auditoria HTTP pública de 03/11/2026 conseguiu ler o site; isso não comprova coleta no GA4.

## Testes automatizados

- `tests/static/seo.test.mjs`: cada página tem exatamente uma tag gtag.js com o ID configurado,
  um `gtag('config')`, carregamento assíncrono e nenhum GTM duplicando a medição.
- `tests/e2e/site.spec.mjs`: o `config` roda nas páginas, e o clique no CTA envia `cta_click` com
  os parâmetros certos.
- **Os testes nunca enviam dados ao GA4:** o gtag.js é substituído por um script vazio e as coletas
  são descartadas, inclusive em `npm run test:prod`. Assim os testes não poluem os relatórios.

## Privacidade e LGPD (pendente, precisa de decisão)

- O GA4 usa cookies (`_ga`, `_ga_*`) e envia dados de navegação ao Google, incluindo transferência
  internacional.
- A Política de Privacidade (item 11) menciona cookies "para métricas de uso" e o item 5 cita
  "serviços de monitoramento", mas **não nomeia o Google Analytics**. Recomendação: o jurídico
  atualizar a Política (PT e EN) citando o Google Analytics, a finalidade e como desativar.
- **Banner de consentimento:** recomendado para a LGPD e necessário para visitantes de regiões com
  exigência de consentimento prévio (ex.: Europa). Com ele, o ideal é usar o *Consent Mode v2* do
  Google (`gtag('consent', 'default', …)`) antes do `config`. Não foi implementado porque muda o
  volume de dados coletados e depende de decisão jurídica/comercial.

## Impacto em performance

O gtag.js é carregado de forma assíncrona. As medições de 03/11/2026 bloqueiam analytics
para não gerar visitas sintéticas; portanto não medem seu custo real. Veja
[performance de SEO](seo-performance.md) para LCP, CLS, bytes e limites dos ensaios.
Conferir dados de campo no Search Console/CrUX após publicação.
