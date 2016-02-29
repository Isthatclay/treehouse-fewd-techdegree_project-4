(function iife () {
  var arrlightboxElements = document.querySelectorAll('.js-lightbox-anchor');
  var elLightboxItems = document.querySelector('.js-lightbox-items');

  /**
   * Gather and store image data for use in lightbox
   */
  document.initialLightboxData = (function getImageData () {
    return Array.prototype.map.call(arrlightboxElements, function (item, index) {
      item.setAttribute('data-lightbox-index', index);
      var image = item.querySelector('.js-lightbox-image');

      return {
        index: index,
        url: item.href,
        title: image.title.trim().toLowerCase(),
        caption: image.alt.trim().toLowerCase()
      };
    });
  })();

  document.lightboxData = document.initialLightboxData;

  /**
   * Event Listeners
   */
  elLightboxItems.addEventListener('click', function openLightbox (event) {
    event.preventDefault();
    var target = event.target;

    while (!target.classList.contains('js-lightbox-anchor')) {
      target = target.parentNode;
    }

    var index = target.getAttribute('data-lightbox-index');
    document.lightbox(document.lightboxData[index]);
  });
})();
