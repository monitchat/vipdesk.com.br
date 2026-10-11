# Validação de SEO — VipDesk

Executado em 11/10/2026, Node 22.22, Playwright 1.56.1 (Chromium), axe-core 4.10.

## 1. Comandos

```bash
npm install          # só dependências de teste (Playwright, axe-core)
npm run build        # gera HTML, sitemap.xml e robots.txt a partir de src/
npm test             # check:sync + test:static + test:e2e
npm run check:sync   # falha se os arquivos publicados estiverem desatualizados em relação a src/
npm run test:static  # node --test: metadados, canonical, sitemap, robots, links, JSON-LD
npm run test:e2e     # Playwright (desktop + Pixel 7) contra servidor que reproduz o GitHub Pages
npm run serve        # http://localhost:4173 com as mesmas regras do GitHub Pages
node scripts/measure.mjs <urls...>   # medição de laboratório (LCP, CLS, bytes)
```

## 2. Resultados dos testes

| Suíte | Resultado |
| --- | --- |
| `check:sync` | OK — 16 arquivos em dia com a fonte |
| `test:static` (16 testes) | **16 aprovados, 0 reprovados** |
| `test:e2e` (76 casos: 38 × desktop/mobile) | **74 aprovados, 0 reprovados, 2 pulados** por design (teste de teclado físico no mobile; área de toque só no mobile) |
| Build real do Jekyll 4.4 (`jekyll build`) | Publica só os 25 arquivos públicos; HTML idêntico ao gerado; `src/`, `docs/`, `tests/`, `scripts/` e `package.json` excluídos |

Falhas encontradas e corrigidas durante a implementação:

- Description dos Termos (67 caracteres) e da 404 (59) curtas → reescritas.
- axe-core (mobile): `scrollable-region-focusable` na tabela comparativa de `/atendimento-omnichannel/` → região focável com rótulo.
- Botão “Menu” mobile sem padding (especificidade CSS) → corrigido, conferido por screenshot.

### O que os testes cobrem

**Metadados:** title (≤ 65), description (70–160), um único H1, `lang="pt-BR"`, viewport,
ausência de meta keywords, unicidade de title/description/H1 entre páginas, Open Graph
completo com imagem existente, Twitter Card.

**Canonical e indexação:** canonical absoluto HTTPS sem www igual à própria URL, ao
`og:url` e ao `<loc>` do sitemap; nenhuma página indexável com `noindex`; 404 com
`noindex` e sem canonical.

**Sitemap/robots:** XML bem formado (inclusive por `DOMParser` no navegador), URLs
absolutas, únicas, só indexáveis, todas respondendo 200 **sem redirecionar**, `lastmod`
só em artigos; robots com `Allow: /` e `Sitemap:`.

**Navegação:** todos os links internos e âncoras resolvem; nenhum link interno sem barra
final (evita 301); nenhuma página órfã; links externos restritos a destinos conhecidos;
menu (desktop e mobile) leva às 6 páginas comerciais e fecha com Esc; skip link é o
primeiro foco; FAQ abre.

**HTTP:** 13 rotas respondem 200 com H1 e canonical no HTML inicial; URL inexistente →
**404 real** com página personalizada (inclusive em caminho profundo, com imagens
carregando); `/crm-whatsapp` → **301** para `/crm-whatsapp/`; arquivos de código e docs → 404.

**Renderização:** conteúdo e FAQ visíveis com JavaScript desabilitado; sem erros de
console; sem overflow horizontal em 1280px e 412px (Pixel 7); botões com ≥ 44px de altura
no mobile.

**Acessibilidade:** axe-core com regras WCAG 2.0/2.1/2.2 A e AA em todas as 13 páginas,
desktop e mobile — 0 violações.

**Dados estruturados:** um bloco JSON-LD válido por página; `Organization`, `WebSite` e
`WebPage`/`CollectionPage` em todas; `SoftwareApplication` na home; `BreadcrumbList`
idêntico ao breadcrumb visível; `FAQPage` só com perguntas e respostas visíveis;
`BlogPosting` com data real (não futura), autor e data visível; proibição de
`aggregateRating`, `review` e `offers`.

**Conversão:** CTAs de demonstração/contato apontam para `mailto:comercial@vipphone.com.br`
com assunto; acesso ao app aponta para `https://app.vipdesk.com.br`; clique registra
`cta_click` no `dataLayer` com tipo, local e página.

**Requisitos da verificação OAuth do Google na home:** nome do produto, seção `#agenda`
com Google Calendar e o texto sobre leitura apenas de início/fim, links para Privacidade e
Termos, razão social e CNPJ.

## 3. URLs e metadados

| URL | Title (caracteres) | H1 | Description (car.) | Robots |
| --- | --- | --- | ---: | --- |
| `/` | VipDesk \| Plataforma de Atendimento Omnichannel, CRM e IA (57) | Plataforma de atendimento omnichannel com WhatsApp, CRM e inteligência artificial | 141 | index |
| `/sistema-atendimento-whatsapp/` *(nova)* | Sistema de Atendimento WhatsApp para Equipes \| VipDesk (54) | Sistema de atendimento pelo WhatsApp para equipes com vários atendentes | 144 | index |
| `/crm-whatsapp/` *(nova)* | CRM para WhatsApp: Funil, Leads e Propostas \| VipDesk (53) | CRM para WhatsApp: do primeiro contato ao contrato fechado | 145 | index |
| `/atendimento-omnichannel/` *(nova)* | Plataforma de Atendimento Omnichannel \| VipDesk (47) | Plataforma de atendimento omnichannel: todos os canais numa fila só | 146 | index |
| `/automacao-atendimento/` *(nova)* | Automação de Atendimento ao Cliente e SLA \| VipDesk (51) | Automação de atendimento ao cliente sem perder o toque humano | 140 | index |
| `/agendamento-whatsapp/` *(nova)* | Agendamento pelo WhatsApp com Lembretes \| VipDesk (49) | Agendamento pelo WhatsApp com confirmação, lembretes e agenda integrada | 139 | index |
| `/inteligencia-artificial-atendimento/` *(nova)* | Inteligência Artificial no Atendimento \| VipDesk (48) | Inteligência artificial no atendimento, com o atendente no controle | 143 | index |
| `/blog/` *(nova)* | Blog VipDesk: Atendimento, WhatsApp e Vendas (44) | Blog do VipDesk | 122 | index |
| `/blog/whatsapp-varios-atendentes/` *(nova)* | Como Organizar o Atendimento no WhatsApp com Vários Atendentes (62) | Como organizar o atendimento pelo WhatsApp com vários atendentes | 148 | index |
| `/blog/tempo-de-primeira-resposta/` *(nova)* | Como Reduzir o Tempo de Primeira Resposta no Atendimento (56) | Como reduzir o tempo de primeira resposta no atendimento | 152 | index |
| `/blog/integrar-atendimento-e-funil-de-vendas/` *(nova)* | Como Integrar o Atendimento ao Funil de Vendas (46) | Como integrar o atendimento ao funil de vendas | 141 | index |
| `/terms/` | Termos de Uso — VipDesk (23) | Termos de Uso e Condições de Serviço | 136 | index |
| `/privacy/` | Política de Privacidade — VipDesk (33) | Política de Privacidade e Proteção de Dados | 117 | index |
| `/404.html` *(nova)* | Página não encontrada — VipDesk (31) | Página não encontrada | 91 | noindex |

As meta descriptions completas estão em cada arquivo de `src/pages/`.

## 4. Dados estruturados

| Página | Tipos |
| --- | --- |
| Home | Organization, WebSite, WebPage (about → SoftwareApplication), SoftwareApplication, FAQPage |
| Páginas comerciais | Organization, WebSite, WebPage, BreadcrumbList, FAQPage |
| Blog | Organization, WebSite, CollectionPage, BreadcrumbList |
| Artigos | Organization, WebSite, WebPage, BreadcrumbList, BlogPosting |
| Termos/Privacidade | Organization, WebSite, WebPage, BreadcrumbList |

Observações:
- `SoftwareApplication` **não** tem `offers` nem `aggregateRating` porque não há preço
  público nem avaliações reais. Por isso a home **não é elegível** ao resultado
  enriquecido de software do Google — decisão consciente para não inventar dados.
- `FAQPage` está correto, mas o Google restringe o resultado enriquecido de FAQ a sites
  governamentais e de saúde; não se espera exibição.
- Validação com as ferramentas oficiais (Rich Results Test, validator.schema.org) **não
  foi executada**: exigem URL pública ou acesso à web, indisponíveis neste ambiente.
  Fazer após o deploy (ver pendências).

## 5. Performance (laboratório)

Método: `scripts/measure.mjs`, Chromium emulando Pixel 7, rede 1,6 Mbps / 150 ms de
latência, CPU 4× mais lenta, cache desabilitado, mediana de 3 execuções, servidor local.
Não são dados de campo (CrUX/INP indisponíveis para um site novo).

| Página | Versão | FCP | LCP | CLS | Transferido | Nós DOM |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| `/` | antes | 528 ms | 528 ms | 0 | 66 KB | 135 |
| `/` | depois | 576 ms | 576 ms | 0 | 85 KB | 389 |
| `/privacy/` | antes | 520 ms | 520 ms | 0 | 65 KB | 118 |
| `/privacy/` | depois | 536 ms | 536 ms | 0 | 75 KB | 244 |
| `/crm-whatsapp/` | nova | 552 ms | 552 ms | 0 | 76 KB | 315 |
| `/blog/tempo-de-primeira-resposta/` | nova | 556 ms | 556 ms | 0 | 74 KB | 261 |

Leitura honesta: o site original já era muito leve. As páginas ficaram ~10–19 KB maiores
por terem mais conteúdo, menu de soluções, rodapé completo e JSON-LD; o LCP de laboratório
variou dentro de ~50 ms e segue muito abaixo da meta de 2,5 s; CLS continua 0. Não há
melhoria de velocidade a declarar — o ganho é de conteúdo sem regressão relevante.

Otimizações aplicadas: ícone do cabeçalho reduzido de 11,4 KB (447×291) para 3,4 KB WebP
/ 5,7 KB PNG com `width`/`height`; CSS único minificado e inline (sem requisição
bloqueante extra); JavaScript mínimo (≈ 0,6 KB inline, não bloqueante para conteúdo);
menus e FAQ com `<details>` nativo; `/favicon.ico` deixa de gerar 404. A fonte Nunito
continua no Google Fonts com `display=swap` e 4 pesos, como no original — auto-hospedar
pode economizar uma conexão (avaliar depois com dados de campo).

## 6. Pendências manuais

1. **Deploy** (não realizado — exige autorização): ver seção 7.
2. **GitHub Pages**: confirmar *Enforce HTTPS* marcado e, se houver registro `www`, que ele
   é CNAME para `<usuario>.github.io` (o Pages redireciona `www` → apex automaticamente
   quando o domínio customizado é o apex). Testar após o deploy:
   ```bash
   curl -sI http://vipdesk.com.br/        # esperado 301 → https://vipdesk.com.br/
   curl -sI https://www.vipdesk.com.br/   # esperado 301 → https://vipdesk.com.br/
   curl -sI https://vipdesk.com.br/crm-whatsapp      # 301 → /crm-whatsapp/
   curl -sI https://vipdesk.com.br/nao-existe/       # 404
   curl -s  https://vipdesk.com.br/robots.txt
   curl -s  https://vipdesk.com.br/sitemap.xml
   ```
3. **Search Console**: enviar `https://vipdesk.com.br/sitemap.xml`; inspecionar URL e
   solicitar indexação da home e das 6 páginas comerciais. Não foi feito (sem acesso);
   indexação não pode ser garantida.
4. **Rich Results Test** e **Schema Markup Validator** na home, numa página comercial e num artigo.
5. **PageSpeed Insights** na home e numa página comercial para obter dados de laboratório
   oficiais (e de campo, quando houver).
6. **Pré-visualização social**: testar a URL no depurador de compartilhamento do
   Facebook/LinkedIn para conferir a imagem OG.
7. **Data dos artigos**: estão com 11/10/2026 (data em que foram escritos). Se o deploy
   ocorrer em outra data, ajustar `published` em `src/pages/blog/artigos/*.mjs` e rodar
   `npm run build`.
8. **Aprovação de conteúdo** pelo time de produto/comercial das 6 páginas e 3 artigos.
9. Pendências de produto P1–P12 em `SEO-AUDIT.md` (URL do teste grátis, chatbot, API
   Oficial, webchat, telefonia, relatórios, screenshots, DPO, GTM/consentimento, perfis sociais).
10. **Verificação OAuth do Google**: a home manteve todos os elementos exigidos (há teste
    automatizado para isso), mas como o H1 e a estrutura mudaram, conferir se o processo de
    verificação está concluído ou se o revisor precisa ser avisado.

## 7. Instruções de publicação

O processo do GitHub Pages não muda (branch `main`, raiz). Os arquivos gerados são
versionados, então publicar = fazer merge na `main`.

1. Revisar e aprovar o PR desta branch.
2. Antes do merge, garantir `npm test` verde (o `check:sync` impede publicar HTML
   desatualizado em relação a `src/`).
3. Fazer merge na `main`; o GitHub Pages publica automaticamente.
4. Executar as verificações da seção 6.

Para editar o site daqui em diante: alterar arquivos em `src/`, rodar `npm run build`,
`npm test` e commitar a fonte **e** os arquivos gerados juntos. Não edite os `index.html`
gerados à mão — o `check:sync` vai acusar a diferença.
