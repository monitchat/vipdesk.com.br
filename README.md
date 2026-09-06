# vipdesk.com.br

Site institucional do VipDesk, servido por GitHub Pages.

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

   E opcionalmente `www` como CNAME para `<usuario>.github.io`.
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
compara esta página com os escopos solicitados.
