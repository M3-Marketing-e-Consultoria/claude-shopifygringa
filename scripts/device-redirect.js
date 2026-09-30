/* =====================================================================
   Cozatti — redireccion SOLO en la landing de PageFly.

   En la landing:  escritorio -> home | movil -> se queda y la ve.
   En CUALQUIER otra pagina de la tienda: no hace absolutamente nada.

   La lista de paginas esta abajo, en LANDING_PATHS.
   ===================================================================== */
(function () {
  'use strict';

  /* ---------------- Configuracion ---------------- */

  // Las UNICAS rutas donde este script actua. Todo lo demas queda intacto.
  // Agrega una linea por cada landing que quieras tratar igual.
  var LANDING_PATHS = [
    '/products/morral-y-cosmetiquera-100-originales-en-cuero'
  ];

  var TARGET     = 'https://cozatti.shop/';
  var BREAKPOINT = 768;   // px — hasta aqui cuenta como movil

  /* ----------------------------------------------- */

  try {
    var loc    = window.location;
    var search = loc.search;
    var ua     = navigator.userAgent || '';

    // --- 1. LA TRAVA: ¿estamos en una de las landings? ---
    // Normaliza: minusculas, sin barra final, sin prefijo de idioma (/es, /en-co).
    var current = loc.pathname.toLowerCase().replace(/\/+$/, '');
    current = current.replace(/^\/[a-z]{2}(-[a-z]{2})?(?=\/)/, '');

    var onLanding = false;
    for (var i = 0; i < LANDING_PATHS.length; i++) {
      if (current === LANDING_PATHS[i].toLowerCase().replace(/\/+$/, '')) {
        onLanding = true;
        break;
      }
    }
    if (!onLanding) return;   // <-- el resto de la tienda sale por aqui

    // --- 2. De aqui para abajo, ya sabemos que estamos en la landing ---

    // Nunca dentro de un iframe (editor de tema, editor de PageFly)
    if (window.top !== window.self) return;

    // Nunca en el editor de tema de Shopify
    if (window.Shopify && window.Shopify.designMode) return;

    // Nunca en previews
    if (search.indexOf('pf_source') !== -1) return;
    if (search.indexOf('preview_theme_id') !== -1) return;

    // Nunca a los rastreadores: Googlebot, el crawler de Meta y el revisor
    // de landing pages de Google Ads tienen que poder ver la pagina.
    if (/bot|crawl|spider|slurp|bingpreview|facebookexternalhit|facebookcatalog|twitterbot|linkedinbot|whatsapp|telegrambot|embedly|pinterest|applebot|lighthouse|pagespeed|gtmetrix|adsbot/i.test(ua)) return;

    // Valvula de escape para abrirla tu mismo en el computador:
    // ...?noredirect=1
    if (search.indexOf('noredirect') !== -1) return;

    // --- 3. Deteccion de movil ---
    var isMobile;
    var uaData = navigator.userAgentData;

    if (uaData && typeof uaData.mobile === 'boolean') {
      isMobile = uaData.mobile;
    } else {
      isMobile = /Android|iPhone|iPod|Windows Phone|webOS|BlackBerry|Opera Mini|IEMobile/i.test(ua);
      // iPad con iPadOS 13+ se identifica como Macintosh: se delata por el tactil
      if (!isMobile && /iPad|Macintosh/.test(ua) && navigator.maxTouchPoints > 1) isMobile = true;
    }

    // Una ventana angosta tambien cuenta como movil. Va con OR a proposito:
    // ante la duda preferimos NO echar a nadie de la landing.
    if (!isMobile && window.matchMedia('(max-width: ' + BREAKPOINT + 'px)').matches) {
      isMobile = true;
    }

    // --- 4. Movil se queda. Escritorio a la home. ---
    if (isMobile) return;

    // replace() y no href: asi el boton "atras" no lo devuelve a la landing.
    loc.replace(TARGET);

  } catch (e) {
    if (window.console && console.warn) console.warn('device-redirect:', e);
  }
})();
