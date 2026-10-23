# vipdesk.com.br

Site institucional do VipDesk, servido por GitHub Pages.

O HTML publicado é **gerado** a partir de `src/` por um script Node sem dependências de
runtime e fica versionado na raiz do repositório (o GitHub Pages continua publicando a
`main` / raiz, sem etapa de build no servidor).

## Estrutura

```
src/
  config.mjs        dados institucionais, URLs, CTAs (inclui trialUrl e demoUrl, pendentes)
  i18n.mjs          idiomas (pt na raiz, en em /en/) e textos de interface traduzidos
  navigation.mjs    páginas comerciais por idioma (menu, rodapé, cards)
  routes.mjs        todas as páginas, nos dois idiomas; calcula os hreflang
  styles.css        estilos (inline em cada página no build)
  lib/              layout, componentes, template de landing page, blog, JSON-LD,
                    deskflow.mjs (faixa da home, imagens, vídeo e VideoObject do DeskFlow)
  pages/            conteúdo: home, solucoes/, blog/ (artigos/ e en/), en/ (home e solutions/),
                    legal/ (texto jurídico em *.body.html; tradução em *.en.body.html)
scripts/
  build.mjs         gera *.html, sitemap.xml e robots.txt   (--check só compara)
  serve.mjs         servidor local que imita o GitHub Pages (404 real, 301 de /pasta)
  measure.mjs       medição de laboratório (LCP, CLS, bytes)
  audit.mjs         auditoria de SEO reexecutável (SEO_BASE_URL=https://vipdesk.com.br)
  make-images.py    gera favicons, ícone 2x e imagem Open Graph a partir da marca
  deskflow-captures/ capturas reais do editor DeskFlow usadas em assets/deskflow/ (ver README)
tests/static/       testes de SEO sobre o HTML gerado (node --test)
tests/e2e/          testes de navegador e acessibilidade (Playwright + axe-core)
docs/               auditoria, estratégia e validação de SEO
_config.yml         impede o Jekyll do Pages de publicar src/, docs/, tests/ etc.
```

## Editar o site

```bash
npm install       # só para os testes
# edite arquivos em src/
npm run build     # regenera o HTML na raiz
npm test          # sincronia + testes estáticos + Playwright
npm run serve     # http://localhost:4173
npm run audit     # auditoria de SEO do build local (sitemap, canonical, links, 404...)

# depois de publicar, de uma máquina com acesso à internet (somente leitura):
npm run audit:prod   # mesma auditoria contra https://vipdesk.com.br -> seo-audit-producao.md
npm run test:prod    # testes Playwright contra produção
```

Para ligar CTAs diretos, preencha em `src/config.mjs`: `trialUrl` (cadastro do teste
gratuito) e/ou `demoUrl` (agenda de demonstração) e rode o build.

Commite a fonte e os arquivos gerados juntos. Não edite os `index.html` gerados à mão:
`npm run check:sync` acusa qualquer diferença entre eles e `src/`.

Novo artigo: crie `src/pages/blog/artigos/<slug>.mjs`, registre em
`src/pages/blog/posts.mjs` e rode o build (sitemap, índice do blog e links relacionados
são atualizados sozinhos). Nova página comercial: crie em `src/pages/solucoes/`,
registre em `src/navigation.mjs` e `src/routes.mjs`.

Versão em inglês: toda página indexável tem uma `key` igual à da sua tradução; os testes falham
se faltar a página equivalente em algum idioma. Detalhes e riscos para o mercado dos EUA em
[`docs/INTERNATIONAL-SEO.md`](docs/INTERNATIONAL-SEO.md).

Google Analytics 4 (ID em `src/config.mjs` → `ga4Id`): ver [`docs/ANALYTICS.md`](docs/ANALYTICS.md).

Documentação de SEO: [`docs/SEO-PRODUCTION-VALIDATION.md`](docs/SEO-PRODUCTION-VALIDATION.md),
[`docs/SEO-AUDIT.md`](docs/SEO-AUDIT.md),
[`docs/SEO-STRATEGY.md`](docs/SEO-STRATEGY.md), [`docs/SEO-VALIDATION.md`](docs/SEO-VALIDATION.md).

## Publicar

1. Suba este diretório num repositório **público** (Pages gratuito exige público).
2. *Settings → Pages → Source*: `main` / raiz.
3. *Custom domain*: `vipdesk.com.br` (o arquivo `CNAME` já está aqui).
4. No DNS do domínio, registros **A** para o apex — CNAME não funciona na raiz:

   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

   E opcionalmente `www` como CNAME para `<usuario>.github.io` (o Pages redireciona
   `www` para o apex).
5. Aguarde o certificado e marque **Enforce HTTPS**.

## Por que o conteúdo é o que é

Esta página também serve de *home page* na verificação do app no Google
(tela de consentimento OAuth). Por isso ela precisa, obrigatoriamente:

- identificar o produto **pelo nome** e descrever o que ele faz;
- ter uma seção sobre a **integração de agenda**, que é o que justifica os
  escopos `calendar.events` e `calendar.freebusy` pedidos ao usuário;
- linkar Política de Privacidade e Termos de Uso;
- identificar a empresa responsável.

Se for reescrever o texto, preserve esses quatro pontos — o revisor do Google
compara esta página com os escopos solicitados. Há um teste automatizado
(`tests/static/seo.test.mjs`) que falha se algum deles sumir da home.

As páginas comerciais só descrevem funcionalidades documentadas neste site
(home, Termos e Política). Antes de anunciar um recurso novo, confirme que ele
existe no produto.

A página `/deskflow/` (e `/en/deskflow/`) descreve o DeskFlow, o editor visual de fluxos
embutido no VipDesk, a partir da implementação real (`deskflow-app` e `deskflow-api`).
Ele é apresentado como recurso do VipDesk, não como produto ou assinatura à parte. As
capturas de `assets/deskflow/` são do editor real, sem dados de clientes
(`scripts/deskflow-captures/README.md`).
