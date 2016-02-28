/**
 * Gather and store image data for use in lightbox
 */
document.lightboxData = (function getImageData () {
  var lightboxElements = document.querySelectorAll('.js-lightbox-anchor');

  return Array.prototype.map.call(lightboxElements, function (item, index) {
    item.setAttribute('data-lightbox-index', index);
    var image = item.querySelector('.js-lightbox-image');

    return {
      index: index,
      url: item.href,
      title: image.title,
      caption: image.alt
    };
  });
})();

/**
 * Event Listeners
 */
document.querySelector('.js-lightbox-items').addEventListener('click', function (event) {
  var target = event.target;

  while (!target.classList.contains('js-lightbox-anchor')) {
    target = target.parentNode;
  }

  event.preventDefault();
  var index = target.getAttribute('data-lightbox-index');
  document.lightbox(document.lightboxData[index]);
});
