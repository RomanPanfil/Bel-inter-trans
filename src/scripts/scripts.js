const FARBA = {
  //lazy load для сторонних либ
  lazyLibraryLoad(scriptSrc, linkHref, callback) {
    let script;
    const domScript = document.querySelector(`script[src="${scriptSrc}"]`);
    const domLink = document.querySelector(`link[href="${linkHref}"]`);

    if (!domScript) {
      script = document.createElement("script");
      script.src = scriptSrc;
      document.querySelector("#wrapper").after(script);
    }

    if (linkHref !== "" && !domLink) {
      let style = document.createElement("link");
      style.href = linkHref;
      style.rel = "stylesheet";
      document.querySelector("link").before(style);
    }

    if (!domScript) {
      script.onload = callback;
    } else {
      domScript.onload = callback;
    }
  }
};


document.addEventListener('DOMContentLoaded', () => {
   // form styler
   $('.ui-select').styler();

   // добавление тугглера в nav
  (function() {
    if(!document.querySelector('.header-nav li')) return

    const lis = document.querySelectorAll('.header-nav li');

    lis.forEach(li => {
      const ul = li.querySelector('ul');

      if (ul && li.querySelector('ul')) {
        const icon = document.createElement('span');
        icon.setAttribute('class', 'icon');
        ul.insertAdjacentElement('afterend', icon);
      }
    });
  })();

  // открытие/закрытие подменю навигации
  (function() {

    const nav = document.querySelector('.header-nav');
    if (!nav) return;

    const lis = nav.querySelectorAll('li');

    function toggleMenu(li) {
      const ul = li.querySelector('ul');
      if (ul) {
        ul.classList.toggle('open');
        li.classList.toggle('open');
      }
    }

    function closeAllMenus() {
      lis.forEach(li => {
        const ul = li.querySelector('ul');
        if (ul) {
          ul.classList.remove('open');
          li.classList.remove('open');
        }
      });
    }

    lis.forEach(li => {
      li.addEventListener('click', () => {
        toggleMenu(li); 
      });
    });

    document.addEventListener('click', e => {
      if (!nav.contains(e.target)) {
        closeAllMenus();
      }
    });

  })();
});

// Открытие попапа галлереи
$(document).on("click", ".mfp-link__gallery", function () {
  var a = $(this);

  var index = $(this).index();
  let links = a.parent().children();

  $.magnificPopup.open({
    items: { src: a.attr("data-href"), links, index },
    type: "ajax",
    overflowY: "scroll",
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in',
    ajax: {
      tError: "Error. Not valid url"     
    },
    callbacks: {
      open: function () {
        setTimeout(function(){
          $('.mfp-wrap').addClass('not_delay');
          $('.mfp-popup').addClass('not_delay');
        },700);

        document.documentElement.style.overflow = 'hidden'
      },

      close: function() {
        document.documentElement.style.overflow = '';
        
         // сброс данных
          popupData = null;
          links = null;
          index = null;
      }
    }
  });
  return false;
});