# device-redirect.js

Manda al visitante de ESCRITORIO a la home (`https://cozatti.shop/`).
El visitante de MOVIL se queda y ve la landing normalmente.

## Donde ponerlo

### Opcion A — en el `<head>` del tema (recomendado)

Es la unica que evita el parpadeo: el visitante nunca llega a ver la pagina
que no le tocaba.

Shopify Admin -> **Online Store -> Themes -> ... -> Edit code** -> `layout/theme.liquid`.
Pega esto **dentro de `<head>`, lo mas arriba posible**, antes de cualquier CSS:

```liquid
{%- if template contains 'product'
   and product.handle == 'morral-y-cosmetiquera-100-originales-en-cuero' -%}
  <script>
    /* pega aqui el contenido de device-redirect.js */
  </script>
{%- endif -%}
```

El `{% if %}` limita el redirect a esa sola pagina de producto. Sin el, el
script corre en toda la tienda — funciona igual (el guardia n.o 6 evita el
bucle), pero estarias echando gente de la home y de las demas paginas.

### Opcion B — en el Custom JS de PageFly

Mas rapido, pero **parpadea**: PageFly inyecta el script al final del `<body>`,
asi que la pagina se pinta y recien despues salta el redirect.

Editor de PageFly -> ajustes de la pagina -> **Custom JavaScript** -> pegar el
contenido del archivo (sin las etiquetas `<script>`).

Si prefieres esta, dimelo y la instalo yo con la herramienta de PageFly.

## Como probarlo

| Que probar | Como |
|---|---|
| Que el movil se queda | Abre la landing en el telefono |
| Que el escritorio se va | Abrela en el computador: debe saltar a la home |
| Abrirla igual en escritorio | Agrega `?noredirect=1` al final de la URL |
| Que el editor sigue vivo | Abre el editor de PageFly: no debe redirigir |

## Lo que el script ya evita

1. **Bucle infinito** — no redirige si ya estas en la home.
2. **Romper los editores** — no corre dentro de un iframe, ni en el editor de
   tema de Shopify, ni en la vista previa de PageFly.
3. **Rebotar a los rastreadores** — Googlebot, el crawler de Meta y el revisor
   de landing pages de Google Ads pasan sin redirect. Esto importa: si rebotas
   al revisor de Google Ads, te pueden rechazar la campana.
4. **Atrapar al visitante** — usa `location.replace()`, asi el boton "atras" no
   lo devuelve a la pagina de la que acaba de salir.
5. **Romper la pagina** — todo va dentro de un `try/catch`.

## Un aviso honesto

Un redirect por dispositivo le muestra a Google contenido distinto segun quien
entra. Hecho en el cliente y con los rastreadores exentos, como aqui, en general
no se trata como cloaking — pero la pagina de producto deja de posicionar por si
misma, porque todo el trafico de escritorio termina en la home. Si la landing va
a recibir trafico pago de Meta o Google (que es casi todo movil), el costo es
bajo. Si esperas trafico organico de escritorio, conviene revisarlo.
