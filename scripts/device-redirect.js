/* =====================================================================
   Cozatti — el visitante de ESCRITORIO se va a la home.
   El visitante de MOVIL se queda y ve la landing normalmente.
   ===================================================================== */
(function () {
  'use strict';

  var TARGET     = 'https://cozatti.shop/';
  var BREAKPOINT = 768;   // px — hasta aqui cuenta como movil

  try {
    var loc    = window.location;
    var path   = loc.pathname;
    var search = loc.search;
    var ua     = navigator.userAgent || '';

    // 1. Nunca dentro de un iframe (editor de tema, editor de PageFly).
    //    Sin esto no podrias editar la pagina desde el computador.
    if (window.top !== window.self) return;

    // 2. Nunca en el editor de tema de Shopify
    if (window.Shopify && window.Shopify.designMode) return;

    // 3. Nunca en la vista previa de PageFly ni en previews de tema
    if (path.indexOf('/apps/pagefly') === 0) return;
    if (search.indexOf('pf_source') !== -1) return;
    if (search.indexOf('preview_theme_id') !== -1) return;

    // 4. Nunca a los rastreadores. Googlebot, el crawler de Meta y el
    //    revisor de landing pages de Google Ads TIENEN que ver la pagina:
    //    si los rebotas, te pueden rechazar la campana y el SEO cae.
    if (/bot|crawl|spider|slurp|bingpreview|facebookexternalhit|facebookcatalog|twitterbot|linkedinbot|whatsapp|telegrambot|embedly|pinterest|applebot|lighthouse|pagespeed|gtmetrix|adsbot/i.test(ua)) return;

    // 5. Valvula de escape, para que tu puedas abrirla en el computador:
    //    https://cozatti.shop/products/...?noredirect=1
    if (search.indexOf('noredirect') !== -1) return;

    // 6. Si ya estamos en la home, no redirigir. Esto evita el bucle
    //    infinito si el script termina cargado en toda la tienda.
    var target = document.createElement('a');
    target.href = TARGET;
    if (loc.hostname === target.hostname &&
        path.replace(/\/+$/, '') === target.pathname.replace(/\/+$/, '')) return;

    // 7. Deteccion de movil
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

    // 8. Es movil -> se queda. Es escritorio -> a la home.
    if (isMobile) return;

    // replace() y no href: asi el boton "atras" no lo devuelve a la landing,
    // lo que lo dejaria rebotando entre las dos paginas.
    loc.replace(TARGET);

  } catch (e) {
    // Pase lo que pase, el redirect nunca debe romper la pagina.
    if (window.console && console.warn) console.warn('device-redirect:', e);
  }
})();
