# Bloques — Trío Vélez Dama en Cuero

Producto: https://cozatti.shop/products/trio-velez
Reemplazan a `landing/blocos/`, que estaba escrito para OTRO producto
(Morral y Cosmetiquera, 2 piezas, $159.000).

## Orden de pegado

| # | Archivo | Qué es |
|---|---|---|
| 0 | `00-base.html` | Fuentes y colores. **Va primero.** |
| 1 | `01-oferta.html` | Hero, precio, contador |
| 2 | `02-garantias.html` | 4 sellos |
| 3 | `03-problema.html` | Comparativa vs bolsos comunes |
| 4 | `04-el-trio.html` | "Recibes TODO esto" + medidas — foto 1 |
| 5 | `05-calidad.html` | Cada detalle refleja calidad — foto 5 |
| 6 | `06-galeria.html` | Galería 2×2 — fotos 7, 8, 9, 10 |
| 7 | `07-colores.html` | Marrón / Amarillo / Negro + CTA — fotos 2, 3, 4 |
| 8 | `08-regalo.html` | Una pieza para cada plan + regalo — foto 6 |
| 9 | `09-testimonios.html` | Reseñas (vacío a propósito) |
| 10 | `10-faq.html` | Preguntas frecuentes |
| 11 | `11-cierre.html` | CTA final — foto 11 |

## Datos verificados

Confirmados contra la Admin API de la tienda:

- Precio: **$187.900**
- Colores: **Marron · Amarillo · Negro**

Tomados de los creativos del cliente:

- Bolso de Mano: 30 alto × 35 ancho × 12 fondo cm
- Bolso Carriel: 20 alto × 25 ancho × 7 fondo cm
- Cosmetiquera: 10 alto × 20 ancho × 8 fondo cm
- Tula de regalo incluida
- 5 años de garantía · envío gratis 24/48 h · pago contra entrega

## Fotos

Las 11 URLs las entregó el cliente y están puestas en los bloques. El
reparto se hizo por el orden y el agrupamiento con que llegaron, NO
mirando las fotos: esta sesión no puede abrir el CDN de la tienda (el
proxy niega `cozatti.shop` y `cdn.shopify.com`). Hay que verificarlo a
ojo en el preview.

Las tres `Gemini_Generated_Image_*` llegaron juntas y son tres, así que
se asignaron a los tres colores.

## Lo que falta llenar

3 reseñas (`REEMPLAZA ESTE TEXTO` en `09-testimonios.html`).

## Discrepancia de precio sin resolver

Los creativos dicen **de $659.900**; la página en vivo dice **$650.900**.
La cuenta solo cuadra con $650.900 ($187.900 + $463.000). Los bloques usan
$650.900. Si el precio tachado correcto es $659.900, el ahorro es $472.000.

## Preview

`landing/preview-trio.html` muestra los 11 bloques uno debajo del otro a
ancho de celular (430 px), con las fuentes incrustadas y recuadros beige
donde faltan las fotos. Es un archivo generado: se abre en cualquier
navegador, no necesita internet.

## Sin botones

Los bloques no traen ningún botón, ni `<button>`, ni `onclick`, ni
referencia a `#rsi_buy_now_button`. La compra va por el botón flotante
que la tienda ya pone en la página.
