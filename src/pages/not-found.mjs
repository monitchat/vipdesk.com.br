// Página 404. O GitHub Pages serve um único /404.html, com status HTTP 404, para qualquer rota
// inexistente — em qualquer idioma. Por isso ela é bilíngue. noindex porque /404.html acessado
// diretamente responde 200.
import { html } from '../lib/html.mjs';
import { allSolutionCards, section } from '../lib/components.mjs';

export default {
  lang: 'pt',
  path: '/404.html',
  output: '404.html',
  indexable: false,
  title: 'Página não encontrada · Page not found — VipDesk',
  description: 'A página que você procurou não existe ou mudou de endereço. The page you are looking for does not exist or has moved.',
  h1: 'Página não encontrada',
  body: html`
<div class="hero hero-interno">
  <div class="wrap">
    <div class="selo">Erro 404</div>
    <h1>Página não encontrada</h1>
    <p class="sub">O endereço que você acessou não existe ou mudou de lugar. Confira o link ou
    siga por um dos caminhos abaixo.</p>
    <div class="acoes">
      <a class="btn btn-claro" href="/">Ir para a página inicial</a>
      <a class="btn btn-fantasma" href="/blog/">Ver o blog</a>
    </div>
    <div lang="en" style="margin-top:34px;padding-top:26px;border-top:1px solid rgba(255,255,255,.25)">
      <p class="sub" style="margin-top:0"><strong>Page not found.</strong> The address you followed
      does not exist or has moved.</p>
      <div class="acoes" style="margin-top:18px">
        <a class="btn btn-claro" href="/en/">Go to the English home page</a>
        <a class="btn btn-fantasma" href="/en/blog/">Visit the blog</a>
      </div>
    </div>
  </div>
</div>
${section({ title: 'Conheça as soluções do VipDesk', content: allSolutionCards('pt') })}
<div lang="en">
${section({ alt: true, title: 'Explore VipDesk solutions', content: allSolutionCards('en') })}
</div>`,
};
