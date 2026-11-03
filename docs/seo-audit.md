# Auditoria inicial — SEO, GEO e AEO

Data: 03/11/2026. Inspeção antes das alterações de implementação. Este relatório complementa os documentos históricos em letras maiúsculas; não descreve um site novo.

## Arquitetura e inventário

- Gerador estático próprio em JavaScript ESM, Node >=20 (ambiente observado: 26.12.1). Não usa React, SPA, SSR em runtime, Vite ou bundler. Sem dependências de produção; Playwright 1.56.1 e axe-core são dependências de desenvolvimento.
- `src/routes.mjs`: 32 páginas indexáveis (16 pt-BR e 16 en) e uma 404. Home, sete soluções por idioma, índice do blog, cinco artigos por idioma e duas páginas legais. As traduções são preservadas.
- `src/lib/layout.mjs`, `components.mjs`, `landing.mjs`, `blog.mjs` e `schema.mjs`: templates compartilhados, navegação, CTAs, HTML semântico e JSON-LD. Artigos em módulos de conteúdo simples, registrados em `src/pages/blog/posts.mjs`.
- `scripts/build.mjs` grava HTML, sitemap e robots na raiz. `--check` compara fonte e saída. Todos os textos principais, links, FAQs e schemas já chegam no HTML, sem executar JS. Formulário e webchat dependem de serviços externos; contato por e-mail permanece disponível.
- Canonical `https://vipdesk.com.br`, `CNAME` consistente. README e `_config.yml` indicam GitHub Pages/Jekyll publicando main/raiz. Cloudflare foi informada pelo solicitante, mas não há configuração de zona, WAF, Workers ou redirects versionada. Não assumir Cloudflare Pages.
- Títulos e descriptions únicos, OG, twitter:card, hreflang recíproco, Organization, WebSite, SoftwareApplication, FAQPage, BreadcrumbList, BlogPosting e VideoObject já existem. Sem avaliações ou preços inventados.
- Sitemap automático exclui 404; lastmod vem de datas de artigos. Robots inicial: `User-agent: *`, `Allow: /`, sitemap. Não há regra específica de GPTBot nem bloqueio privado neste host (aplicação em outro subdomínio).
- GA4 `G-5L7TXDVM7T`, `cta_click` e `generate_lead` já implementados. Preservar integrações e diferenciar intenção de envio confirmado.
- Fontes WOFF2 locais com swap/preload; WebP responsivo, dimensões de imagens e vídeo, lazy loading e vídeo preload=none. CSS e pequeno script compartilhado estão repetidos inline em todas as páginas.

## Achados e prioridade

| Prioridade | Achado | Impacto | Arquivos / ação |
| --- | --- | --- | --- |
| P1 | Acesso real na borda, WAF, redirects e cache sem configuração local verificável | HTML correto não assegura acesso dos bots na Cloudflare | Documentar checklist, auditar produção por leitura, manter pendências explícitas |
| P1 | E2E pressupõe ausência do webchat e usa formulário externo real; teste de envio confirmado ausente | Falsos negativos e dependência de rede; regressões de conversão podem passar | `tests/e2e/site.spec.mjs`: fixtures locais e testes dos fluxos existentes |
| P2 | Robots libera pesquisa implicitamente, sem declaração explícita do OAI-SearchBot | Política de pesquisa pouco explícita para manutenção | `scripts/build.mjs`: grupos de busca explícitos; preservar política wildcard/GPTBot |
| P2 | Twitter só declara tipo; metadados de artigo podem ser mais completos | Dependência do fallback OG e menor clareza editorial | `src/lib/layout.mjs`, `blog.mjs`, `schema.mjs` |
| P2 | Registro do blog não tem estado de rascunho nem validação editorial | Risco de artigo incompleto entrar em índice/sitemap | Registro com exclusão explícita de rascunhos e validação de datas/dados |
| P2 | Script inline repetido e medição envia requests de terceiros sem isolamento | Bytes repetidos e comparação de desempenho pouco reproduzível | Asset JS compartilhado versionado; medição isolada, bloquear analytics de teste |
| P2 | Cinco artigos completos já existem; planejamento não cobre o formato solicitado de 15 pautas | Necessidade de aprofundamento e operação editorial documentada | Melhorar exemplos nos cinco existentes; planejar somente os outros dez |
| P2 | Documentação antiga cita 13/26 páginas e CTA somente por e-mail | Orientação operacional desatualizada | Novos relatórios e atualização da documentação de analytics |
| P3 | Testes não cobrem toda equivalência de FAQ, datas e imagens sociais | Erros de manutenção podem escapar | Ampliar verificações específicas |

## Verificação inicial

`npm run check:sync` e `npm run test:static` passaram antes das alterações. O primeiro ensaio HTTP/E2E foi bloqueado pelo sandbox (`listen EPERM`); será repetido com execução autorizada fora dessa restrição. Chromium exigido pelo Playwright não estava no cache, embora outras revisões estivessem instaladas.

O histórico Git confirma inclusão dos primeiros artigos em 11/10/2026 e alterações posteriores; preservar datas existentes, registrar data de atualização somente nos textos efetivamente revisados. A leitura pública da homepage funcionou via ferramenta web; isso não prova ausência de bloqueio de bots nem o estado do painel da Cloudflare.

## Ordem de implementação

1. Robots e metadados; reforçar geração/indexação do blog.
2. Conteúdo útil nos cinco artigos existentes e plano de 15 pautas sem novas páginas redundantes.
3. Reuso de JS, auditoria e medição reproduzíveis; regressões de navegação e conversão.
4. Build completo, testes estáticos/HTTP/navegador, análise de desempenho e documentação de pendências externas.

Não migrar framework, redesenhar, adicionar dependências de runtime, alterar treinamento de IA ou publicar em produção.
