// Página 404. O GitHub Pages serve /404.html com status HTTP 404 para qualquer rota
// inexistente. noindex porque /404.html acessado diretamente responde 200.
import { html } from '../lib/html.mjs';
import { allSolutionCards, section } from '../lib/components.mjs';

export default {
  path: '/404.html',
  output: '404.html',
  indexable: false,
  title: 'Página não encontrada — VipDesk',
  description: 'A página que você procurou não existe ou mudou de endereço. Conheça as soluções do VipDesk.',
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
  </div>
</div>
${section({ title: 'Conheça as soluções do VipDesk', content: allSolutionCards() })}`,
};
