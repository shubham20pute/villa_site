// Minimal JS for the local clone. Bootstrap's carousel works via data attributes,
// but we can add a small initializer if needed.
document.addEventListener('DOMContentLoaded', function () {
  // Example: set carousel interval (ms)
  try {
    var el = document.querySelector('#heroCarousel');
    if (el && bootstrap && bootstrap.Carousel) {
      // eslint-disable-next-line no-unused-vars
      var carousel = new bootstrap.Carousel(el, { interval: 4000, ride: 'carousel' });
    }
  } catch (e) {
    // bootstrap may not be present in test environments; ignore errors
    // console.warn(e);
  }

  // attach handlers after DOM ready
  var offcanvasEl = document.getElementById('navDrawer');
  if (!offcanvasEl) return;

  // fallback backdrop element for when Bootstrap is not available
  var fallbackBackdrop = null;
  function createFallbackBackdrop() {
    if (fallbackBackdrop) return;
    fallbackBackdrop = document.createElement('div');
    fallbackBackdrop.className = 'fallback-backdrop';
    document.body.appendChild(fallbackBackdrop);
  }
  function removeFallbackBackdrop() {
    if (!fallbackBackdrop) return;
    fallbackBackdrop.remove();
    fallbackBackdrop = null;
  }

  // helper to get or create the bootstrap offcanvas instance at runtime
  function getBsOff() {
    if (window.bootstrap && bootstrap.Offcanvas) {
      try {
        return bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  // open button (hamburger)
  var openBtn = document.getElementById('drawerToggleBtn');
  if (openBtn) {
    openBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var bsOff = getBsOff();
      if (bsOff && typeof bsOff.show === 'function') {
        bsOff.show();
      } else {
        // fallback: add show class + backdrop
        offcanvasEl.classList.add('show');
        document.body.classList.add('offcanvas-open'); // optional to prevent scroll
        createFallbackBackdrop();
      }
    });
  }

  // close button (circle) inside drawer
  var closeBtn = document.getElementById('drawerCloseBtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var bsOff = getBsOff();
      if (bsOff && typeof bsOff.hide === 'function') {
        bsOff.hide();
      } else {
        offcanvasEl.classList.remove('show');
        document.body.classList.remove('offcanvas-open');
        removeFallbackBackdrop();
      }
    });
  }

  // close when clicking any drawer link/contact link
  offcanvasEl.querySelectorAll('.drawer-link, .drawer-contact a').forEach(function (el) {
    el.addEventListener('click', function () {
      var bsOff = getBsOff();
      if (bsOff && typeof bsOff.hide === 'function') {
        bsOff.hide();
      } else {
        offcanvasEl.classList.remove('show');
        document.body.classList.remove('offcanvas-open');
        removeFallbackBackdrop();
      }
    });
  });

  // Cleanup fallback backdrop if Bootstrap hides the offcanvas (so styles are consistent)
  offcanvasEl.addEventListener('hidden.bs.offcanvas', function () {
    removeFallbackBackdrop();
    document.body.classList.remove('offcanvas-open');
  });

  // ADDED: make header sticky with semi-opaque background when scrolling
  var header = document.querySelector('.site-header');
  if (header) {
    var scrollThreshold = 24; // px scrolled before applying sticky style
    function onScrollToggleHeader() {
      if (window.scrollY > scrollThreshold) {
        if (!header.classList.contains('scrolled')) header.classList.add('scrolled');
      } else {
        if (header.classList.contains('scrolled')) header.classList.remove('scrolled');
      }
    }
    // initial check in case page is loaded scrolled
    onScrollToggleHeader();
    window.addEventListener('scroll', onScrollToggleHeader, { passive: true });
  }
});
