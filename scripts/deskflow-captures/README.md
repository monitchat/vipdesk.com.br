# Capturas do DeskFlow (assets/deskflow/)

As imagens e o vídeo de `assets/deskflow/` são do **editor real do DeskFlow** (repositório
`deskflow-app`, React + React Flow), abertos localmente com a API inteiramente simulada pelo
Playwright. Nenhuma chamada chega a um backend, nenhum dado de cliente aparece e não é preciso
login: o fluxo exibido é o de `demo-flow.mjs`, montado só com nós que existem na paleta do editor.

## Como regenerar

1. Suba o `deskflow-app` em modo de desenvolvimento (`npm run dev`, Vite) e anote a URL
   (padrão `http://localhost:5173`; a porta do `vite.config.js` é 3000).
2. Neste repositório, com o `npm install` feito (o Playwright vem como dependência de teste):

   ```bash
   DESKFLOW_APP_URL=http://localhost:5173 node scripts/deskflow-captures/capture.mjs stills
   DESKFLOW_APP_URL=http://localhost:5173 node scripts/deskflow-captures/capture.mjs video
   ```

   `CHROME_PATH` aponta para outro Chromium, se o do Playwright não estiver instalado.
   Os arquivos saem em `scripts/deskflow-captures/out/` (ignorado pelo git).
3. Gere os derivados (ImageMagick e ffmpeg), por exemplo:

   ```bash
   O=scripts/deskflow-captures/out; A=assets/deskflow
   magick $O/still-canvas.png -crop 3840x1800+0+0 +repage -resize 1600x -quality 82 $A/editor-1600.webp
   magick $O/still-canvas.png -crop 3840x1800+0+0 +repage -resize 1600x -quality 85 $A/editor-1600.jpg
   # idem para 1200 e 2400 (webp), node-editor-760 (recorte da janela) e palette-454 (recorte do painel)
   ffmpeg -ss 1.5 -i $O/video/*.webm -t 22 -vf "scale=1280:-2,format=yuv420p" -c:v libx264 -crf 27 -movflags +faststart -an $A/demo.mp4
   ffmpeg -ss 1.5 -i $O/video/*.webm -t 22 -vf scale=1280:-2 -c:v libvpx-vp9 -b:v 0 -crf 36 -an $A/demo.webm
   ffmpeg -ss 2.5 -i $O/video/*.webm -frames:v 1 -vf scale=1280:-2 -q:v 3 $A/demo-poster.jpg
   ```

4. Se a duração ou o conteúdo do vídeo mudar, ajuste `assets/deskflow/demo.*.vtt` (legendas) e
   `duration` em `src/lib/deskflow.mjs` (VideoObject).

## Regras

- Só anunciar no site o que a paleta e os executores do DeskFlow têm de fato
  (`deskflow-app/src/components/Sidebar.jsx`, `deskflow-api/src/deskflow/nodes/`).
- Não usar fluxos, nomes ou dados de clientes nas capturas.
