# vipdesk.com.br

Site institucional do VipDesk, servido por GitHub Pages.

O HTML publicado é **gerado** a partir de `src/` por um script Node sem dependências de
runtime e fica versionado na raiz do repositório (o GitHub Pages continua publicando a
`main` / raiz, sem etapa de build no servidor).

## Estrutura

```
src/
  config.mjs        dados institucionais, URLs, CTAs (inclui trialUrl, ainda pendente)
  navigation.mjs    lista das páginas comerciais (menu, rodapé, cards)
  routes.mjs        todas as páginas do site (base do build e do sitemap)
  styles.css        estilos (inline em cada página no build)
  lib/              layout, componentes, template de landing page, blog, JSON-LD
  pages/            conteúdo: home, solucoes/, blog/, legal/ (texto jurídico em *.body.html)
scripts/
  build.mjs         gera *.html, sitemap.xml e robots.txt   (--check só compara)
  serve.mjs         servidor local que imita o GitHub Pages (404 real, 301 de /pasta)
  measure.mjs       medição de laboratório (LCP, CLS, bytes)
  make-images.py    gera favicons, ícone 2x e imagem Open Graph a partir da marca
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
```

Commite a fonte e os arquivos gerados juntos. Não edite os `index.html` gerados à mão:
`npm run check:sync` acusa qualquer diferença entre eles e `src/`.

Novo artigo: crie `src/pages/blog/artigos/<slug>.mjs`, registre em
`src/pages/blog/posts.mjs` e rode o build (sitemap, índice do blog e links relacionados
são atualizados sozinhos). Nova página comercial: crie em `src/pages/solucoes/`,
registre em `src/navigation.mjs` e `src/routes.mjs`.

Documentação de SEO: [`docs/SEO-AUDIT.md`](docs/SEO-AUDIT.md),
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
