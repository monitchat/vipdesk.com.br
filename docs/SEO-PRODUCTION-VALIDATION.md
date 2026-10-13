# Validação de SEO em produção — VipDesk

## A. Resumo

| Item | Valor |
| --- | --- |
| Data | 11/10/2026 |
| Domínio | https://vipdesk.com.br (e https://app.vipdesk.com.br) |
| Stack | HTML estático gerado por `scripts/build.mjs` (Node, sem dependências de runtime), publicado pelo GitHub Pages (Jekyll da action `jekyll-build-pages`, sem layouts) |
| Páginas verificadas | 13 URLs indexáveis + 404, descobertas pelo sitemap e por rastreamento de links |
| Commit em produção | `4fb6c47` (merge do PR #1), implantado com sucesso às 12:40 UTC de 11/10/2026 (execução 38140103950 do *pages build and deployment*) |

### Os três estados exigidos

| Estado | Situação |
| --- | --- |
| **1. Produção antes da correção** | **NÃO VERIFICADO diretamente.** A política de rede deste ambiente bloqueia `vipdesk.com.br`, `www.vipdesk.com.br`, `app.vipdesk.com.br` e o armazenamento de artefatos do GitHub (proxy responde 403; WebFetch não resolve DNS; DNS-over-HTTPS também bloqueado). Evidência **indireta** obtida pela API do GitHub: o deploy do commit `4fb6c47` terminou com sucesso, e a árvore desse commit é idêntica (`c586112…`) à que foi testada. O build reproduzido com o mesmo gerador do Pages (gem `github-pages` 232, Jekyll 3.10.0, UTF-8) produziu HTML, sitemap e robots **byte a byte iguais** ao repositório. Isso mostra o que o Pages *gerou*, não o que a CDN está *servindo*. |
| **2. Código corrigido e validado localmente** | Validado: build, testes estáticos, auditoria e Playwright verdes; build `github-pages` reproduzido sem diferenças; Lighthouse antes/depois. |
| **3. Produção após a publicação** | **NÃO VERIFICADO.** Depende do merge desta branch na `main` e de uma verificação feita de uma rede com acesso ao domínio (seção I). |

## B. Problemas encontrados

Prioridades: P0 crítico · P1 alto · P2 médio · P3 baixo. "Evidência" indica onde o problema foi observado.

| URL | Problema | Evidência | Prioridade | Correção | Status |
| --- | --- | --- | --- | --- | --- |
| Todas | CSS do Google Fonts bloqueando a renderização; LCP mobile de 2,6–3,0 s (acima da meta de 2,5 s) | Lighthouse 12.8.2 mobile, build local idêntico ao implantado: `render-blocking-insight` estimou ~2,1 s de economia; elemento LCP = `p.sub` (texto do hero) | P2 | Nunito auto-hospedada (mesmos arquivos variáveis do Google, OFL), `@font-face` inline, `preload` do subconjunto latin, remoção dos 2 domínios de terceiros | Corrigido localmente; produção NÃO VERIFICADA |
| Todas | Requisições a terceiros (fonts.googleapis.com / fonts.gstatic.com) enviavam o IP do visitante ao Google (LGPD) | HTML implantado; Lighthouse: 40 KB de terceiros | P2 | Mesma correção acima: 0 requisições a terceiros | Corrigido localmente |
| Todas (CTAs) | “Agendar demonstração” e “Falar com especialista” abrem `mailto:` (atrito) | Auditoria: 18 + 18 CTAs `mailto:comercial@vipphone.com.br` | P1 (conversão) | Não existe agenda, formulário ou endpoint no repositório, e nenhum link de agendamento verificável foi encontrado. Criado `SITE.demoUrl`: um valor troca o destino em todo o site (testado ativado e desativado). O `mailto` continua pré-preenchido, com roteiro de qualificação | **Pendente de informação comercial** (URL de agenda) |
| Todas (CTAs) | Sem caminho para o teste gratuito | Termos citam o teste; nenhuma rota de cadastro verificável (app inacessível daqui) | P1 (conversão) | `SITE.trialUrl` já existia; agora há teste validando a ativação. O acesso ao app continua no cabeçalho, no menu mobile e no rodapé | **Pendente** da URL de cadastro |
| `/inteligencia-artificial-atendimento/` | Página pode não representar todos os recursos de IA (chatbots/agentes) | Revalidado: nenhuma fonte no repositório ou no material institucional publicado descreve chatbot ou agente autônomo. O único resultado web sobre “VIPdesk” com chatbots é de **outra empresa** (VIPdesk Connect, EUA) | P2 | Sem alteração: anunciar chatbot sem confirmação violaria a regra de não inventar recursos. A página já responde “O VipDesk tem chatbot?” sem prometer | **Pendente de confirmação do produto** |
| `/privacy/` | “Encarregado (DPO): .” — nome vazio | Auditoria (`P2 Nome do Encarregado (DPO) vazio`) no HTML implantado | P2 | Não há fonte confiável para o nome no projeto; texto jurídico não alterado. Auditoria agora detecta o campo vazio automaticamente | **Pendente do jurídico** |
| `/assets/css/style.css` | Arquivo do tema padrão (Primer) publicado pelo Pages sem uso | Build `github-pages` 232 | P3 | Nenhuma: inofensivo (não é página, não está no sitemap, nenhuma página o referencia). Mudar o tema pode alterar o comportamento do build | Documentado |
| Busca de marca | A consulta “vipdesk connect” (1 impressão) provavelmente se refere à VIPdesk Connect (EUA), empresa homônima | Busca web | P3 | `alternateName` e dados da Vipphone Software já distinguem a marca; monitorar na Search Console | Documentado |
| `scripts/audit.mjs` (ferramenta) | Falso positivo: “todo/todos” detectado como placeholder “TODO” | Primeira execução da auditoria | — | Regex corrigida (maiúsculas e limites de palavra) | Corrigido |

Itens revalidados **sem problema** no HTML implantado (build reproduzido): status 200 nas 13 URLs, canonical próprio em todas, sitemap válido com 13 URLs canônicas, robots.txt correto, 404 real, 301 de `/pasta` → `/pasta/`, parâmetros de consulta com canonical correto, um H1 por página, title e description únicos, JSON-LD válido, breadcrumbs coerentes, nenhuma página órfã, nenhum link interno quebrado, imagens com alt e dimensões.

## C. Correções implementadas

| Arquivo | Mudança | Justificativa |
| --- | --- | --- |
| `assets/fonts/nunito-latin.woff2`, `nunito-latin-ext.woff2`, `OFL.txt` | Novos | Fonte da marca auto-hospedada, com a licença exigida pela OFL |
| `src/styles.css` | `@font-face` (pesos 400–800 num arquivo variável, `font-display: swap`, `unicode-range`) | Mesma tipografia, sem CSS externo bloqueante |
| `src/lib/layout.mjs` | Remove preconnect/stylesheet do Google; adiciona `preload` da fonte | Elimina a cadeia de 2 domínios de terceiros |
| `src/config.mjs` | `SITE.demoUrl` (null por padrão) | Um ponto único para ligar a agenda de demonstração quando o link existir |
| `scripts/audit.mjs` | Novo | Auditoria somente leitura, reexecutável contra qualquer ambiente (`SEO_BASE_URL`) |
| `scripts/serve.mjs` | MIME `font/woff2` | O servidor de testes imita o Pages também para fontes |
| `playwright.config.mjs` | Aceita `SEO_BASE_URL` (sem servidor local, com 1 nova tentativa) | Os mesmos testes E2E rodam contra produção |
| `tests/e2e/site.spec.mjs` | `Location` absoluto ou relativo aceito; novo teste de “zero terceiros + fonte carregada” | Compatível com o Pages real; protege a correção de performance |
| `tests/static/seo.test.mjs` | Testes de fonte auto-hospedada, de nenhum recurso bloqueante no `<head>` e de CTAs configuráveis | Regressão protegida |
| `package.json` | Scripts `audit`, `audit:prod`, `test:prod`; `npm test` inclui a auditoria | Execução simples após cada deploy |
| HTML gerados (13 páginas + 404) | Regenerados | Reflexo das mudanças acima |

## D. Auditoria técnica

Fonte: `docs/auditoria-build-local.md` (saída de `npm run audit`) e a mesma auditoria executada contra a saída do build `github-pages` (resultado idêntico: P0 = 0, P1 = 0, P2 = 1 [DPO]).

| Verificação | Build local / build Pages reproduzido | Produção real |
| --- | --- | --- |
| Sitemap (HTTP 200, XML válido, 13 URLs HTTPS absolutas, sem duplicatas, sem noindex, sem redirecionamento, `lastmod` só nos artigos) | Aprovado | NÃO VERIFICADO |
| robots.txt (200, `Allow: /`, `Sitemap:` oficial) | Aprovado | NÃO VERIFICADO |
| Canonical (próprio em cada página = `<loc>` do sitemap = `og:url`) | Aprovado | NÃO VERIFICADO |
| Metadados (title, description, H1 únicos; lang; viewport; OG completo) | Aprovado | NÃO VERIFICADO |
| Renderização A: HTML do servidor contém title, description, canonical, H1, texto principal (≥ 120 palavras fora de cabeçalho/rodapé), links e JSON-LD | Aprovado | NÃO VERIFICADO |
| Renderização B: navegador real (Chromium desktop e Pixel 7), sem erros de console, sem overflow, axe WCAG 2.2 AA sem violações, conteúdo visível sem JavaScript | Aprovado | NÃO VERIFICADO |
| JSON-LD (sintaxe, tipos, breadcrumbs = navegação visível, FAQ visível, sem avaliações/preços) | Aprovado | NÃO VERIFICADO |
| HTTP: 404 real, 301 `/crm-whatsapp` → `/crm-whatsapp/`, parâmetros com canonical | Aprovado | NÃO VERIFICADO |
| HTTP → HTTPS e www → apex | Não aplicável localmente | NÃO VERIFICADO |
| Links internos (sem quebrados, sem órfãs, sem redirecionamento) | Aprovado | NÃO VERIFICADO |
| Links externos (app.vipdesk.com.br, páginas do Google) | NÃO VERIFICADO (sem acesso de rede) | NÃO VERIFICADO |
| `Cache-Control` | Não configurável no GitHub Pages (padrão `max-age=600`) | NÃO VERIFICADO |
| Rich Results Test / validator.schema.org | NÃO VERIFICADO (exigem acesso web) | NÃO VERIFICADO |

### app.vipdesk.com.br

NÃO VERIFICADO: inacessível deste ambiente e fora deste repositório. As recomendações continuam em `docs/SEO-AUDIT.md` §6 (login/cadastro públicos indexáveis com title próprio; telas autenticadas com `X-Robots-Tag: noindex`; `robots.txt` próprio sem bloquear o que tiver `noindex`; nunca usar `robots.txt` como controle de acesso).

## E. Performance

Lighthouse 12.8.2, mobile, throttling simulado (padrão Lighthouse), Chromium 141, servidor local com as regras do Pages, mesmo procedimento antes e depois. **Dados de laboratório, não de usuários reais**: INP e CrUX indisponíveis para um site novo. Localmente não há gzip nem CDN (no Pages há), então os tempos absolutos em produção serão diferentes; a comparação vale como antes/depois.

| Página | Perf. antes → depois | FCP | LCP | TBT | CLS | Terceiros |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | 91 → **100** | 2,6 s → **0,8 s** | 2,6 s → **1,3 s** | 0 → 0 | 0 → 0 | 40 KB → **0** |
| `/crm-whatsapp/` | 86 → **100** | 3,0 s → **0,8 s** | 3,0 s → **1,3 s** | 0 → 0 | 0 → 0 | 40 KB → **0** |
| `/sistema-atendimento-whatsapp/` | 90 → **100** | 2,6 s → **0,8 s** | 2,6 s → **1,3 s** | 0 → 0 | 0 → 0 | 40 KB → **0** |
| `/blog/tempo-de-primeira-resposta/` | 93 → **100** | 2,6 s → **0,8 s** | 2,6 s → **1,3 s** | 0 → 0 | 0 → 0 | 40 KB → **0** |

Peso transferido por página (depois): HTML 31–41 KB, fonte 38 KB (uma vez, depois em cache), imagens 3 KB, JavaScript 0 KB externo (≈0,6 KB inline), CSS 0 KB externo (inline). Acessibilidade, Boas práticas e SEO no Lighthouse: 100 nas quatro páginas, antes e depois.

Observação: a medição da etapa anterior (`docs/SEO-VALIDATION.md`, LCP de ~0,55 s) usava um perfil de rede próprio, mais otimista, e **não detectou** que o LCP estava acima da meta. O Lighthouse é a referência a partir de agora.

## F. Conversão

| CTA | Texto | Destino atual | Ocorrências | Situação |
| --- | --- | --- | --- | --- |
| `demo_request` | Agendar demonstração | `mailto:comercial@vipphone.com.br` com assunto e roteiro | 18 (hero + faixa final) | Funcional; troca para link direto ao preencher `SITE.demoUrl` |
| `contact_click` | Falar com especialista | `mailto:` comercial | 18 | Funcional |
| `contact_click` | comercial@vipphone.com.br | `mailto:` comercial | 24 | Funcional (para quem prefere copiar o endereço) |
| `app_access` | Acessar a plataforma | https://app.vipdesk.com.br | 39 | Destino NÃO VERIFICADO (inacessível daqui) |
| `trial_start` | Experimentar grátis | — (oculto) | 0 | Aparece em todo o site ao preencher `SITE.trialUrl` |
| — | Conhecer recursos / Saiba mais | Links internos das páginas comerciais | — | Aprovado (links internos testados) |

Nenhum formulário de produção foi enviado e nenhum registro comercial foi criado durante os testes. O clique registra `cta_click` (desde 13/10/2026 enviado ao Google Analytics 4 via gtag; ver `ANALYTICS.md`).

**Requisitos para remover o atrito do `mailto`** (escolher um):
1. URL pública de agendamento do time comercial — idealmente o portal de auto-agendamento do próprio VipDesk, o que também demonstra o produto → `SITE.demoUrl`.
2. Número de WhatsApp comercial oficial → link `https://wa.me/55DDDNUMERO?text=...` em `SITE.demoUrl`.
3. Um formulário exigiria um endpoint real (por exemplo, a API do próprio VipDesk), com proteção contra spam e aviso de LGPD. Não foi criado porque não há endpoint disponível.

## G. Resultados dos testes

| Comando | Resultado |
| --- | --- |
| `npm run check:sync` | OK — 16 arquivos em dia com a fonte |
| `npm run test:static` | **18 aprovados, 0 reprovados** |
| `npm run audit` (build local) | 13 URLs · **P0 0 · P1 0** · P2 1 (DPO) · P3 0 |
| `SEO_BASE_URL=<saída do build github-pages> npm run audit` | 13 URLs · P0 0 · P1 0 · P2 1 (DPO) |
| `npm run test:e2e` | **76 aprovados, 0 reprovados, 2 pulados** por design (teclado só no desktop; área de toque só no mobile) |
| `SEO_BASE_URL=<saída do build github-pages> npx playwright test` | 74 aprovados, 2 pulados (executado antes do teste novo de terceiros) |
| Testes estáticos com `trialUrl` e `demoUrl` preenchidos (cópia descartável) | 18 aprovados — ativação dos CTAs validada |
| `npm run audit:prod` / `npm run test:prod` | **NÃO EXECUTADOS** — produção inacessível deste ambiente |

Erros encontrados durante o trabalho: a porta 4190 é bloqueada pelo padrão Fetch (`bad port`), o que causou uma falsa falha de rede (trocada por outra porta); e o falso positivo de placeholder (corrigido).

## H. Pendências externas

1. **Acesso de rede**: liberar `vipdesk.com.br`, `www.vipdesk.com.br` e `app.vipdesk.com.br` em *Allowed domains* nas configurações de rede do ambiente Claude Code, ou rodar `npm run audit:prod` e `npm run test:prod` de outra máquina.
2. **Deploy**: merge desta branch na `main` (publica automaticamente pelo Pages). Não realizado.
3. **Search Console** (sem acesso): status de indexação, motivos de exclusão, último rastreamento, consultas, impressões e CTR — nada disso foi verificado nem inferido.
4. **Comercial**: URL de agendamento (`SITE.demoUrl`) e URL de cadastro do teste (`SITE.trialUrl`).
5. **Produto**: confirmar se existe chatbot ou agente de IA autônomo (e como funciona) antes de mudar a página de IA ou criar conteúdo para “chatbot com inteligência artificial”; confirmar API Oficial do WhatsApp, webchat, telefonia e relatórios.
6. **Jurídico**: nome do Encarregado (DPO) e o erro “operadora de a Plataforma” na Política.
7. **Ferramentas do Google**: Rich Results Test, Schema Markup Validator e PageSpeed Insights (dados de campo, quando houver tráfego).

## I. Checklist pós-publicação

De uma máquina com acesso à internet, após o merge e cerca de 1–10 minutos para o Pages publicar:

```bash
# 1. Versão nova no ar (deve aparecer o preload da fonte e nenhuma referência ao Google Fonts)
curl -s https://vipdesk.com.br/ | grep -c 'nunito-latin.woff2'        # esperado: 2
curl -s https://vipdesk.com.br/ | grep -c 'fonts.googleapis.com'      # esperado: 0
curl -sI https://vipdesk.com.br/assets/fonts/nunito-latin.woff2 | head -1   # esperado: 200

# 2. Redirecionamentos e erros
curl -sI http://vipdesk.com.br/            | grep -iE '^(HTTP|location)'   # 301 → https://vipdesk.com.br/
curl -sI https://www.vipdesk.com.br/       | grep -iE '^(HTTP|location)'   # 301 → https://vipdesk.com.br/
curl -sI https://vipdesk.com.br/crm-whatsapp | grep -iE '^(HTTP|location)' # 301 → /crm-whatsapp/
curl -sI https://vipdesk.com.br/nao-existe/ | head -1                       # 404

# 3. Auditoria completa e testes de navegador contra produção (somente leitura)
npm install
npm run audit:prod      # gera seo-audit-producao.md; sai com erro se houver P0/P1
npm run test:prod       # Playwright desktop + mobile contra https://vipdesk.com.br
```

Depois:
- [ ] `audit:prod` sem P0/P1 (o P2 do DPO permanece até o jurídico resolver).
- [ ] `test:prod` verde.
- [ ] Search Console: reenviar `https://vipdesk.com.br/sitemap.xml` e inspecionar a home e as 6 páginas comerciais (a atualização nos resultados do Google não é instantânea).
- [ ] PageSpeed Insights da home e de `/crm-whatsapp/` (mobile) para confirmar LCP ≤ 2,5 s em laboratório real.
- [ ] Rich Results Test na home, em `/crm-whatsapp/` e em um artigo.
- [ ] Clicar manualmente em “Agendar demonstração” e “Acessar a plataforma” no celular e no desktop.
- [ ] Somente então marcar as correções deste documento como “ativas em produção”.
