# Auditoria de SEO — vipdesk.com.br

Data da auditoria: 11/10/2026. Escopo: este repositório (`monitchat/vipdesk.com.br`).

## 1. Arquitetura encontrada

| Item | Situação encontrada |
| --- | --- |
| Framework | Nenhum. HTML estático escrito à mão. |
| Páginas | 3: `/` (`index.html`), `/privacy/`, `/terms/` |
| Renderização | HTML estático completo — todo o conteúdo já vinha no HTML inicial (rastreável sem JavaScript). |
| Roteamento | Diretórios com `index.html` (`/privacy/`, `/terms/`). |
| Build | Inexistente. |
| Hospedagem | GitHub Pages com domínio próprio (`CNAME` = `vipdesk.com.br`), Jekyll padrão do Pages. |
| Estilos | CSS inline em cada página (duplicado nas 3), fonte Nunito via Google Fonts. |
| JavaScript | Nenhum. |
| Analytics / GTM | Nenhum. |
| Dados estruturados | Nenhum. |
| Restrição de conteúdo | O README exige que a home mantenha nome do produto, seção de integração de agenda (escopos `calendar.events` e `calendar.freebusy`), links para Privacidade/Termos e identificação da empresa, porque é a “home page” da verificação OAuth do Google. |

**Decisão:** não migrar de framework. HTML estático no GitHub Pages já entrega
conteúdo rastreável, TTFB baixo e zero JavaScript obrigatório. Para escalar de 3 para
13 páginas sem duplicar cabeçalho/rodapé/SEO à mão, foi criado um **gerador estático
em Node sem dependências de runtime** (`scripts/build.mjs` + `src/`), que escreve o
HTML final na raiz do repositório. Assim, o processo de publicação do GitHub Pages
**não muda** (continua `main` / raiz).

## 2. Problemas confirmados

Gravidade: **Alta** = impede/atrasa descoberta ou indexação; **Média** = prejudica
relevância, CTR ou experiência; **Baixa** = melhoria.

| # | Problema | Gravidade | Evidência | Solução aplicada |
| --- | --- | --- | --- | --- |
| 1 | Sem `robots.txt` | Média | Arquivo inexistente no repositório; servidor local que reproduz o Pages devolve 404. | `robots.txt` gerado com `Allow: /` e `Sitemap:`. |
| 2 | Sem `sitemap.xml` | Alta | Arquivo inexistente. | Sitemap gerado a partir da lista de rotas, só com páginas indexáveis e canônicas. |
| 3 | Sem `<link rel="canonical">` | Média | Nenhuma das 3 páginas tinha. `og:url` da home sem barra final. | Canonical absoluto em todas as páginas indexáveis, igual ao `<loc>` do sitemap e ao `og:url`. |
| 4 | Apenas 1 página comercial | Alta | Todo o produto descrito só na home; sem páginas para intenções como “CRM para WhatsApp”, “atendimento omnichannel”. Dados do Search Console confirmam: ~95% dos cliques identificados são de buscas pela marca. | 6 páginas comerciais + blog com 3 artigos. |
| 5 | Sem página 404 personalizada | Média | Não havia `404.html`; o Pages exibiria a 404 genérica do GitHub, sem navegação de volta. | `404.html` com navegação para soluções, `noindex` (pois `/404.html` direto responde 200). |
| 6 | Sem `og:image` / Twitter Card | Média | Compartilhamentos sem imagem. | Imagem 1200×630 da marca (`assets/og-vipdesk.png`) + `twitter:card`. |
| 7 | Sem dados estruturados | Média | Nenhum JSON-LD. | `Organization`, `WebSite`, `WebPage`, `SoftwareApplication`, `BreadcrumbList`, `FAQPage`, `BlogPosting`. |
| 8 | Navegação some no mobile | Média | CSS original: `.nav-links { display: none }` abaixo de 860px, sem menu alternativo. | Menu mobile com `<details>` (funciona sem JS), fecha com Esc/clique fora. |
| 9 | Link interno com redirecionamento | Baixa | `terms/index.html` linkava `/privacy` (sem barra) → 301 para `/privacy/`. | Link corrigido. Teste impede links internos sem barra final. |
| 10 | Imagens sem dimensões | Baixa | `<img>` do logo sem `width/height`; arquivo de 447×291 exibido a 34px de altura (11 KB). | Ícone redimensionado para 2× (104×68; 3,4 KB em WebP, 5,7 KB PNG) com `width`/`height`. |
| 11 | Favicon não quadrado e sem `/favicon.ico` | Baixa | Ícone 447×291 usado como favicon; `/favicon.ico` inexistente (404 em toda visita de navegador). | `favicon.ico` (16/32/48), `favicon-32.png` e `apple-touch-icon.png`. |
| 12 | H1 da home pouco descritivo para busca | Média | “Todo o atendimento da sua empresa em um só lugar” não diz o que é o produto. | H1: “Plataforma de atendimento omnichannel com WhatsApp, CRM e inteligência artificial”. A frase original foi mantida na introdução de Recursos. |
| 13 | Recursos sem aprofundamento nem links | Média | Cards da home sem destino. | Cada card leva à página comercial correspondente. |
| 14 | Sem FAQ | Baixa | — | FAQ visível na home e em cada página comercial (com `FAQPage`). |
| 15 | Sem “pular para o conteúdo” e sem estilo de foco | Baixa | — | Skip link e `:focus-visible` com o teal da marca. |
| 16 | CTA principal pouco explícito | Média | Hero com “Falar com um especialista” → âncora; e-mail só no fim. | “Agendar demonstração” (mailto com assunto e roteiro de qualificação) + “Falar com especialista” em todos os heros e faixas de CTA. |
| 17 | Tabela rolável inacessível por teclado | Baixa | Detectado pelo axe-core no teste mobile da página omnichannel. | `tabindex="0"`, `role="region"` e `aria-label`. |

### Itens verificados sem problema

- HTTPS/www/HTTP: não verificáveis daqui (ver limitações); configuração recomendada abaixo.
- Conteúdo no HTML inicial: já estava correto e foi mantido (sem dependência de JavaScript).
- Idioma (`lang="pt-BR"`) e viewport: corretos nas 3 páginas originais.
- Links externos: apenas Google (políticas) e `app.vipdesk.com.br`.

## 3. Problemas pendentes (exigem decisão ou acesso humano)

| # | Pendência | Por quê | Recomendação |
| --- | --- | --- | --- |
| P1 | URL de cadastro do teste gratuito | Os Termos citam teste gratuito por prazo determinado, mas a rota pública de cadastro não pôde ser verificada. | Informar a URL e preencher `SITE.trialUrl` em `src/config.mjs`: o CTA “Experimentar grátis” passa a aparecer em todo o site automaticamente. |
| P2 | Chatbot autônomo | O site só documenta IA de apoio (triagem, resumo, sugestão, classificação). A página sugerida `/chatbot-inteligencia-artificial` anunciaria algo não confirmado. | Criada `/inteligencia-artificial-atendimento/`. Se existir chatbot/agente que responda sozinho, documentar o funcionamento real e então criar a página de chatbot. |
| P3 | API Oficial do WhatsApp | Os Termos recomendam a API Oficial, mas não confirmam que a plataforma oferece essa conexão. | Confirmar. Se sim, explicitar nas páginas de WhatsApp (diferencial relevante). |
| P4 | Webchat | Aparece na definição de “Canais” dos Termos, mas não na home. | Confirmar antes de anunciar. |
| P5 | Telefonia | Citada na home, sem detalhes (URA, gravação, ramais etc.). | Descrever os recursos reais para criar conteúdo próprio. |
| P6 | Relatórios e indicadores | Não documentados no site. Não foram anunciados. | Se houver dashboards/relatórios, documentar para incluir nas páginas. |
| P7 | Capturas de tela do produto | Não há imagens reais da plataforma no repositório; não foram criados mockups falsos. | Fornecer screenshots (sem dados de clientes) para hero e páginas comerciais. |
| P8 | Nome do Encarregado (DPO) | Política de Privacidade, item 12: “Encarregado (DPO): .” com nome vazio. Texto jurídico não foi alterado. | Jurídico preencher o nome. |
| P9 | Erro de digitação jurídico | Política, item 1: “operadora de a Plataforma”. Não alterado (texto jurídico). | Jurídico revisar. |
| P10 | Medição (GA4/GTM) | Não existe ferramenta instalada; instalar exige ID da conta e banner de consentimento (LGPD). | Ver `SEO-STRATEGY.md` → Mensuração. Os cliques de CTA já são registrados em `window.dataLayer`. |
| P11 | Perfis sociais oficiais | Nenhum perfil citado no site. Não foram inventados `sameAs`. | Informar URLs oficiais para incluir no JSON-LD `Organization`. |
| P12 | Depoimentos e casos | Nenhum caso autorizado disponível. Nada foi inventado. | Coletar casos com autorização escrita. |

## 4. Limitações de verificação

- **Produção inacessível deste ambiente**: o proxy de rede bloqueia `vipdesk.com.br` e
  `app.vipdesk.com.br` (HTTP 403 no túnel). Portanto **não foram verificados ao vivo**:
  status HTTP em produção, redirecionamentos HTTP→HTTPS e www→sem www, certificado,
  cabeçalhos e o `robots.txt` do app. Todo comportamento HTTP foi verificado num
  servidor local que reproduz as regras do GitHub Pages (`scripts/serve.mjs`) e com o
  build real do Jekyll.
- **Search Console**: sem acesso. Os números abaixo são os informados pelo proprietário.
- **Repositório do app** (`app.vipdesk.com.br`): fora do escopo desta tarefa; as
  funcionalidades foram validadas somente pelo que está publicado neste site (home,
  Termos e Política). Recomendações para o app estão na seção 6.
- **Core Web Vitals de campo** (CrUX): sem dados; site novo e sem tráfego suficiente.
  Só há medições de laboratório (ver `SEO-VALIDATION.md`).
- **Ferramentas oficiais de dados estruturados** (Rich Results Test / Schema Validator):
  exigem URL pública ou acesso à web que este ambiente não tem. A validação foi feita
  por testes automatizados (ver `SEO-VALIDATION.md`); rodar as ferramentas oficiais
  após o deploy.
- **Volume de busca/dificuldade**: sem acesso a Keyword Planner, Semrush ou Ahrefs.

## 5. Métricas disponíveis (informadas pelo proprietário, Search Console)

| Indicador | Valor |
| --- | ---: |
| Cliques orgânicos | 61 |
| Impressões | 198 |
| CTR | 30,8% |
| Posição média | ≈ 30 (não confirmada) |

Consultas: `vipdesk` (42 cliques / 106 impr.), `vip desk` (5 / 24), `vipdesk connect` (0 / 1).
Páginas: `https://vipdesk.com.br/` (59 / 197), `https://app.vipdesk.com.br/` (2 / 41).

Leitura: praticamente todo o tráfego é de marca e cai na home. O CTR alto é típico de
busca de marca e não indica desempenho em buscas genéricas. O `alternateName: "Vip Desk"`
foi adicionado ao `WebSite` para reforçar a variação com espaço.

## 6. Recomendações para `app.vipdesk.com.br` (não implementadas aqui)

O subdomínio recebeu 41 impressões, provavelmente da tela de login. Recomendações:

1. **Login e cadastro públicos**: podem continuar indexáveis, mas com `<title>` e
   meta description claros (“Entrar no VipDesk”), `<link rel="canonical">` para a própria
   URL e link visível para `https://vipdesk.com.br/`. Não devem competir com a home.
2. **Telas autenticadas e rotas internas**: responder com `X-Robots-Tag: noindex` (ou
   `<meta name="robots" content="noindex">`). Não bloquear essas rotas no `robots.txt`,
   senão o Google não lê o `noindex`.
3. **Controle de acesso** continua sendo autenticação no servidor — `robots.txt` e
   `noindex` não protegem dados.
4. **Dados de clientes** (portais públicos de auto-agendamento, links de proposta etc.):
   avaliar caso a caso; por padrão `noindex`, a menos que o cliente queira o portal
   encontrável.
5. Criar um `robots.txt` próprio no app (cada subdomínio tem o seu), sem `Sitemap` do
   domínio principal.
6. Na Search Console, preferir uma **propriedade de domínio** (`vipdesk.com.br`) para
   ver site e app juntos.
