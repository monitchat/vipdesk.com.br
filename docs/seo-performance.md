# Performance e preservação visual

Medição local em 03/11/2026, com Node 26.12.1, Playwright 1.56.1 e Chromium instalado no ambiente: **Google Chrome for Testing 156.0.8078.4**. O download da revisão padrão do Playwright não concluiu e foi interrompido; a variável `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` permitiu usar o navegador disponível. Nenhuma dependência do projeto foi atualizada.

## Método e resultados

Três execuções por URL, mediana, Pixel 7, CPU 4×, latência configurada de 150 ms e vazão configurada de 1,6 Mbps. Cache desativado. `--isolated` substitui requisições de terceiros por 204; analytics é bloqueado em todos os modos. As páginas originais vieram de `git archive HEAD` (commit `d8cc0c0`), servidas na porta 4175; versão alterada na porta 4173. Não é medição de produção nem validação dos widgets reais.

| Página | LCP antes → depois | CLS antes → depois | Maior interação sintética antes → depois | Transferência antes → depois |
| --- | --- | --- | --- | --- |
| Home | 396 → 408 ms | 0 → 0 | 24 → 24 ms | 91 → 92 KiB |
| DeskFlow | 404 → 408 ms | 0 → 0 | 24 → 24 ms | 174 → 175 KiB |
| Artigo multiatendimento | 388 → 392 ms | 0 → 0 | 24 → 16 ms | 81 → 83 KiB |

Resultados brutos: [antes](seo-performance-before.json) e [depois](seo-performance-after.json). Nenhuma falha de request ou erro de console nesses ensaios. As pequenas diferenças de tempo não sustentam uma alegação de melhora de LCP. O artigo recebeu conteúdo adicional; os metadados sociais também acrescentam bytes. A extração do script introduz uma requisição no primeiro acesso e permite reuso de cache entre páginas.

O diagnóstico de interação abre/fecha menu e abre FAQ quando existente. É o maior Event Timing observado nesses cliques, com limite de observação de 16 ms, **não INP de campo**. CLS usa o maior período de deslocamentos, com janela máxima de 5 s e intervalo máximo de 1 s; exclui deslocamentos com entrada recente. O ensaio não cobre toda a visita, formulários reais, chat nem todas as interações.

Conferir o p75 de LCP, INP e CLS no Search Console/CrUX quando houver amostra. A [documentação de Web Vitals](https://web.dev/articles/vitals) distingue as medições de campo e laboratório; o teste local não demonstra aprovação de CWV em produção.

## Alterações e decisões

- Script comum de 1.816 bytes saiu do HTML e passou para asset de 1.912 bytes com comentário, hash de conteúdo e `defer`. Home passou de 49.003 para 47.709 bytes de HTML; DeskFlow de 55.182 para 53.939. Com cache do asset, páginas seguintes não precisam transferir a mesma lógica novamente. O cache real depende da hospedagem; não foi configurado no painel.
- `decoding="async"` nas duas imagens secundárias do DeskFlow. Preservados `loading="lazy"`, WebP, srcset, tamanhos explícitos e vídeo `preload="none"`. Não aplicar lazy loading a uma futura imagem de LCP no topo.
- Fontes locais WOFF2 com `font-display: swap` e preload já estavam corretas. Preservadas identidade tipográfica e licenças.
- Sem bundle de React, hidratação, dependências de runtime ou motivos para introduzir code splitting de framework. A separação do pequeno script comum atende ao reuso sem criar cadeia de módulos no navegador.
- CSS inline minificado existente: 14.481 bytes por página. Coverage pontual em desktop, abrindo menu e FAQ, usou aproximadamente 53% na home, 56% no DeskFlow e 42% no artigo. Isso não é prova de CSS removível: outras rotas, mobile, hover, foco e widget usam regras diferentes. Não remover regras compartilhadas com base em uma única captura nem adicionar ferramenta de purge que arrisque a aparência. Manter CSS inline também evita uma nova requisição bloqueante no primeiro acesso; reavaliar CSS crítico por rota somente com medição adicional.
- GA4, formulário e webchat preservados. O modo sem `--isolated` mantém widgets e bloqueia analytics, mas acesso real e coleta devem ser conferidos após deploy autorizado.
- Cache longo é adequado somente ao JS com hash; manter HTML revalidável e hashes antigos durante transição. Nada foi alterado na Cloudflare.

## Comparação visual

Capturas completas da homepage original e alterada, com imagens lazy carregadas e fontes prontas, foram idênticas byte a byte em desktop 1440×1000 e emulação Pixel 7. Terceiros foram isolados nos dois lados. SHA-256:

- Desktop, antes/depois: `f70146da60f39badcdd16d8facf0e760bd0c04f1df599746a401b3897463f881`.
- Mobile, antes/depois: `334aadb54513d057c949a46da71c909eb64c0188ece52e4a0a7a10f39a16f1f8`.

A seção nova do artigo de multiatendimento também foi inspecionada em celular. A suíte axe/Playwright verifica todas as páginas nos dois tamanhos, incluindo ausência de overflow. Capturas são artefatos temporários de QA, não assets publicados.
