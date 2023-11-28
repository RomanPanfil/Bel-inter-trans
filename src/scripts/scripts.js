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
  const navLis = document.querySelectorAll('.header-nav > ul > li');

  navLis.forEach(li => {
    const ul = li.querySelector('ul');

    if (ul && li.querySelector('ul')) {
      const icon = document.createElement('span');
      icon.setAttribute('class', 'icon');
      ul.insertAdjacentElement('afterend', icon);
    }
  });

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

  // переключение табов
  (function() {
    if (!document.querySelector('.ui-tab') || !document.querySelector('.ui-tabs-wrapper')) return

    const tabs = document.querySelectorAll('.ui-tab');
    const tabsPanel = document.querySelectorAll('.ui-tabs-wrapper');

    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        
        let tabId = this.getAttribute('data-tab');
        
        tabs.forEach(item => {
          item.classList.remove('active');
        });
        
        this.classList.add('active');

        tabsPanel.forEach(panel => {
        if(panel.id === tabId) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });

      });
    });
  })();

  // клик на контакт
  (function() {
    const contactCards = document.querySelectorAll('.contacts-card');   

    contactCards.forEach(card => {
      card.addEventListener('click', e => {
        if (e.target.tagName === 'A') {
          return;
        }

        const href = card.getAttribute('data-href');
        console.log(href);
        window.location.href = href;
      });
    });
  })();

  // Открытие попапа галлереи
  $(document).on("click", ".mfp-link__gallery", function () {     
    var gallery = $(this).closest('.post-gallery');      
    var links = gallery.find('.mfp-link__gallery');      
    var a = $(this); 
    var index = links.index(a);

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

  // Открытие попапа
  $(document).on("click", ".mfp-link", function() {
    var $link = $(this);
    // Если ссылка с классом .video-link
    if($link.hasClass('video-link')) {
      // Открыть попап
      $.magnificPopup.open({
        items: {
          src: $link.attr("data-href"),  
        },
        type: 'ajax',
        // Код для видео
        callbacks: {
          ajaxContentAdded: function() {
            var videoURL = $link.data('video');
            $(this.content).find('iframe').attr('src', videoURL);

            document.documentElement.style.overflow = 'hidden'
          },
          close: function() {
            document.documentElement.style.overflow = ''
          }
        }
      });
    } else {
      // Обычное открытие
      $.magnificPopup.open({
        items: { src: $link.attr("data-href") },
        type: "ajax",
        overflowY: "scroll",
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in',
        ajax: {
          tError: "Error. Not valid url",
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
            document.documentElement.style.overflow = ''
          }
        }
      });
    }
    return false;
  });

  // версия для слабовидящих
  (function() {
    if (!document.querySelector('.poor-vision-btn')) return
    
    const poorVisionBtn = document.querySelector('.poor-vision-btn');
    const body = document.querySelector('body');

    poorVisionBtn.addEventListener('click', () => {
      body.classList.toggle('ui-poor-vision');
    })
  })();


  // фиксирование блока при прокрутке
  (function() {
    if (!document.querySelector('.post-wrapper') || !document.querySelector('.post-side')) return
   
    let scrollTimer;
    let postHeaderBottom = $(".post-head").css("margin-bottom") || $(".article-title").css("margin-bottom") || 0;
    
    function handleScroll() {
      if (parseInt($(".post-wrapper").offset().top) < $(window).scrollTop()) {
        let tops = parseInt($(window).scrollTop() - $(".post-wrapper").offset().top + parseInt(postHeaderBottom));
        
        if (tops < $(".post-wrapper").height() - $(".post-side").height()) {
          $(".post-side").css("top", tops);
        }
      } else {
        $(".post-side").css("top", 0);
      }
    }
    
    $(function() {
      $(window).scroll(function() {
        if(!scrollTimer) {
          scrollTimer = setTimeout(function() {
            handleScroll();
            scrollTimer = null;
          }, 1);
        }
      });
    });
  })();


  // открытие попапа поиска
  (function() {
    if (!document.querySelector('.header-search') || !document.querySelector('.search-popup') || !document.querySelector('.search-popup-close')) return

    const searchButton = document.querySelector('.header-search');
    const searchPopup = document.querySelector('.search-popup');
    const closePopup = document.querySelector('.search-popup-close');

    searchButton.addEventListener('click', () => {
      searchPopup.classList.add('active');
      document.querySelector('body').classList.add('non-scroll');
    });

    closePopup.addEventListener('click', () => {
      searchPopup.classList.remove('active');
      document.querySelector('body').classList.remove('non-scroll');
    });

  })();

  // меню навигации по тексту
  (function() {
    const menuItems = document.querySelectorAll('.item-menu');
    const menuList = document.querySelector('.post-side-navigation-list');
    
    if(!menuList) return

    menuItems.forEach((item, index) => {      
      const li = document.createElement('li');
      li.classList.add('post-side-navigation-item');
      
      if (index === 0) {
        li.classList.add('active');
      }
      
      li.textContent = item.dataset.title || item.textContent;

      li.addEventListener('click', () => {
        menuList.querySelectorAll('.active').forEach(el => {
          el.classList.remove('active');  
        });        
        
        li.classList.add('active');

        item.scrollIntoView({
          behavior: 'smooth'  
        });
      });

      menuList.appendChild(li);
    });
  
   
    let currentActive = menuList.querySelector('.active');

    document.addEventListener('scroll', () => {
      let maxVisible = 0;
      let mostVisible;
      let itemIndex;
  
      menuItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const windowHeight = window.innerHeight;        
        const topVisible = Math.max(0, rect.top);
        const bottomVisible = Math.min(windowHeight, rect.bottom);
        const visibleHeight = bottomVisible - topVisible;
        const visiblePercentage = visibleHeight / rect.height * 100;
  
        if (visiblePercentage > maxVisible) {      
          mostVisible = item;
          maxVisible = visiblePercentage;
          itemIndex = index;
        }
  
      });
  
      if (mostVisible && mostVisible !== currentActive) {
        if (currentActive) {
          currentActive.classList.remove('active');
        }
        
        if (mostVisible) {
          document.querySelectorAll('.post-side-navigation-item')[itemIndex].classList.add('active');
          currentActive = document.querySelectorAll('.post-side-navigation-item')[itemIndex];
        }
      }  
    });

  })();

  // обертка для таблицы
  (function(){
    if (!document.querySelector('article table')) return

    let tables = document.querySelectorAll('article table');

    tables.forEach((table) => {
        let wrapper = document.createElement('div');
        wrapper.classList.add('article-table', 'article-table__full');

        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    })
  })();
  

});

