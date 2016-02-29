(function iife () {
  var arrlightboxElements = document.querySelectorAll('.js-lightbox-anchor');
  var elLightboxItems = document.querySelector('.js-lightbox-items');
  var elGallerySearch = document.querySelector('.gallery-search');

  /**
   * Gather and store image data for use in lightbox
   */
  document.lightboxData = document.initialLightboxData = (function getImageData () {
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

  /**
   * Event Listeners
   */
  elLightboxItems.addEventListener('click', openLightbox, false);
  elGallerySearch.addEventListener('keyup', filterGallery, false);

  function openLightbox (event) {
    event.preventDefault();
    var target = event.target;

    while (!target.classList.contains('js-lightbox-anchor')) {
      target = target.parentNode;
    }

    var index = target.getAttribute('data-lightbox-index');
    document.lightbox(document.initialLightboxData[index]);
  }

  function filterGallery (event) {
    var searchTerm = event.srcElement.value.trim().toLowerCase();

    document.lightboxData = document.initialLightboxData.filter(function (item) {
      var parentNode = arrlightboxElements[item.index].parentNode;
      var searchTermFound = (
        item.title.indexOf(searchTerm) > -1 ||
        item.caption.indexOf(searchTerm) > -1
      );

      if (searchTermFound) {
        parentNode.classList.remove('gallery-item--hidden');
        parentNode.removeAttribute('style');
      } else {
        parentNode.classList.add('gallery-item--hidden');
        parentNode.addEventListener('transitionend', hide, false);
      }

      function hide () {
        parentNode.style.display = 'none';
        parentNode.removeEventListener('transitionend', hide, false);
      }

      return searchTermFound;
    });
  }
})();
