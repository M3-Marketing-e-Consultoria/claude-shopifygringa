# Free Gift Section

Reconstrucao em HTML/CSS puro da secao de brinde ("FREE GIFT — 3 pairs of premium socks")
usada em uma pagina PageFly.

## Arquivos

- `free-gift-section.html` — o bloco pronto para colar (HTML + `<style>` escopado).
- `free-gift-section.preview.html` — pagina de preview com imagem placeholder, so para conferir o visual.

## Como usar no PageFly

1. No editor do PageFly, arraste o elemento **HTML/Liquid** para onde a secao deve aparecer.
2. Cole todo o conteudo de `free-gift-section.html`.
3. Troque o `src` da `<img>` pela URL da sua imagem:
   Shopify Admin → **Content → Files** → faca upload → copie o link.

## Como usar direto no tema (sem PageFly)

Crie `sections/free-gift.liquid` com o conteudo do arquivo + o bloco
`{% schema %}{ "name": "Free Gift", "settings": [] }{% endschema %}` no final,
e adicione a secao pelo customizador do tema.

## Personalizacao

Todas as cores e medidas estao em CSS variables no topo de `.fg-card`:

| Variavel | Efeito |
|---|---|
| `--fg-badge-bg` | cor do selo "FREE GIFT" |
| `--fg-border` | cor da borda do card |
| `--fg-radius` | arredondamento do card |
| `--fg-media-bg` | fundo cinza atras da imagem |
| `--fg-title-color` | cor do titulo |
| `--fg-text-color` | cor do subtitulo |
| `--fg-max-width` | largura maxima (use `100%` para preencher a coluna) |

A area da imagem usa `aspect-ratio: 16 / 10` com `object-fit: contain`.
Se a sua foto for sangrada (sem fundo proprio), troque para `object-fit: cover`.

O texto herda a fonte do tema (`font-family: inherit`). Para fixar uma fonte,
defina `font-family` em `.fg-card`.
