(function () {
  'use strict';

  /**
   * Get device width of users screen
   */
  function effectiveDeviceWidth() {
    var deviceWidth = window.screen.width;

    if (navigator.userAgent.indexOf('Android') >= 0 && window.devicePixelRatio) {
      deviceWidth = deviceWidth / window.devicePixelRatio;
    }

    return deviceWidth;
  }

  /**
   * Check if element is scrolled into view
   */
  function isScrolledIntoView (el, cutFromBottom) {
    var elemTop = el.getBoundingClientRect().top;
    var elemBottom = null;

    if (typeof cutFromBottom !== 'undefined') {
      elemBottom = el.getBoundingClientRect().bottom - cutFromBottom;
    } else {
      elemBottom = el.getBoundingClientRect().bottom;
    }

    var isVisible = (elemTop < window.innerHeight) && (elemBottom >= 0);

    return isVisible;
  };

  /**
   * Change background/src attribute
   */
  function loadImage (element) {
    var isImg = (element.nodeName.toLowerCase() === 'img');

    if (element.getAttribute('data-src-small') !== null && ops.width <= 768) {
      if (isImg) {
        element.setAttribute('src', element.getAttribute('data-src-small'));
      } else {
        element.style.backgroundImage = 'url(' + element.getAttribute('data-src-small')+ ')';
      }
    } else if (element.getAttribute('data-src-medium') !== null && (ops.width > 768 && ops.width <= 1024)) {
      if (isImg) {
        element.setAttribute('src', element.getAttribute('data-src-medium'));
      } else {
        element.style.backgroundImage = 'url(' + element.getAttribute('data-src-medium')+ ')';
      }
    } else {
      if (isImg) {
        element.setAttribute('src', element.getAttribute('data-src'));
      } else {
        element.style.backgroundImage = 'url(' + element.getAttribute('data-src')+ ')';
      }
    }
    element.classList.remove(ops.selector);
  }

  var ops = {};

  var Lazyload = function (opt) {
    ops.selector = opt.selector;
    ops.scrollLoad = opt.scrollLoad;
    ops.width = effectiveDeviceWidth();
    this.load();
  };

  Lazyload.prototype.load = function () {
    var lazyImages = [].slice.call(document.querySelectorAll('.' + ops.selector));

    function checkImages () {
      console.log('checking');
      [].slice.call(lazyImages).forEach(function (image, i) {
        if (isScrolledIntoView(image)) {
          lazyImages.splice(lazyImages.indexOf(image), 1)
          loadImage(image);
        }
      });

      if (lazyImages.length === 0) {
        window.removeEventListener('scroll', checkImages);
      }
    }

    if (ops.scrollLoad) {
      window.addEventListener('scroll', checkImages);
      checkImages();
    } else {
      lazyImages.forEach(function (image) {
        loadImage(image);
      });
    }
  }

  window.Lazyload = Lazyload;

})(typeof window !== 'undefined' ? window : this);
