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


  // добавление тугглера 
  const subNavLis = document.querySelectorAll('.header-nav > ul > li > ul li');

  subNavLis.forEach(li => {
    const ul = li.querySelector('ul');

    if (ul && li.querySelector('ul')) {
      const icon = document.createElement('span');
      icon.setAttribute('class', 'toogler');
      ul.insertAdjacentElement('afterend', icon);
    }
  });

  // открытие/закрытие подменю навигации
  (function() {

    const nav = document.querySelector('.header-nav');
    if (!nav) return;

    const lis = nav.querySelectorAll('li');

    function toggleMenu(li) {
      lis.forEach(otherLi => {
        if (otherLi !== li) {
          const otherUl = otherLi.querySelector('ul');
          if (otherUl) {
            otherUl.classList.remove('open');
            otherLi.classList.remove('open');
          }
        }
      });
      
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

    // lis.forEach(li => {
    //   li.addEventListener('click', (ev) => {
    //     const a = li.querySelector('a');
    //     const ul = li.querySelector('ul');
    //     if (ul && a && ev.target === a) {
    //       ev.preventDefault();
    //     }
    //     toggleMenu(li);
    //   });
    // });

    lis.forEach(li => {
      const a = li.querySelector('a');     
      const icon = li.querySelector('.icon');
    
      if (a) {
        a.addEventListener('click', (ev) => {          
          const href = a.getAttribute('href');
          if (href === '#' || href === 'javascript:void(0)') {
            ev.preventDefault();
            toggleMenu(li);
          }
        });
      }
    
      if (icon) {        
        icon.addEventListener('click', (ev) => {         
          ev.stopPropagation();
          toggleMenu(li);
        });
      }
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
        window.location.href = href;
      });
    });
  })();

  // клик на карточку новостей
  (function() {
    const newsCards = document.querySelectorAll('.news-card');   

    newsCards.forEach(card => {
      card.addEventListener('click', e => {
        if (e.target.tagName === 'A') {
          return;
        }

        const href = card.querySelector('.news-card-title').getAttribute('href');        
        if(href) {
          window.location.href = href;
        }        
      });
    });
  })();

    // клик на карточку сообщества
    (function() {
      const newsCards = document.querySelectorAll('.communities-card');   
  
      newsCards.forEach(card => {
        card.addEventListener('click', e => {
          if (e.target.tagName === 'A') {
            return;
          }
  
          const href = card.querySelector('.communities-card-title').getAttribute('href');        
          if(href) {
            window.location.href = href;
          }        
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
            var videoId = $link.data('video-id');
            var videoURL = `https://www.youtube.com/embed/${videoId}`;
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
  // (function() {
  //   if (!document.querySelector('.poor-vision-btn')) return
    
  //   const poorVisionBtn = document.querySelector('.poor-vision-btn');
  //   const body = document.querySelector('body');

  //   poorVisionBtn.addEventListener('click', () => {
  //     body.classList.toggle('ui-poor-vision');
  //   })
  // })();


  // фиксирование блока при прокрутке
  // (function() {
  //   if (!document.querySelector('.post-wrapper') || !document.querySelector('.post-side')) return
   
  //   let scrollTimer;
  //   let postHeaderBottom = $(".post-head").css("margin-bottom") || $(".article-title").css("margin-bottom") || 0;
    
  //   function handleScroll() {
  //     if (parseInt($(".post-wrapper").offset().top) < $(window).scrollTop()) {
  //       let tops = parseInt($(window).scrollTop() - $(".post-wrapper").offset().top + parseInt(postHeaderBottom));
        
  //       if (tops < $(".post-wrapper").height() - $(".post-side").height()) {
  //         $(".post-side").css("top", tops);
  //       }
  //     } else {
  //       $(".post-side").css("top", 0);
  //     }
  //   }
    
  //   $(function() {
  //     $(window).scroll(function() {
  //       if(!scrollTimer) {
  //         scrollTimer = setTimeout(function() {
  //           handleScroll();
  //           scrollTimer = null;
  //         }, 1);
  //       }
  //     });
  //   });
  // })();

  // фиксирование блока при прокрутке
  if ( $('.post-side').length) {

    $(window).on('scroll', function(){
      var windowOffset = $(window).scrollTop(),
          floatOffset = $('.post-side-spase').offset().top,
          contentHeight = $('.post-wrapper').height(),
          floatHeight = $('.post-side').outerHeight();
          floatStop = floatOffset + contentHeight - floatHeight;

      if (windowOffset > floatOffset && windowOffset < floatStop) {
        $('.post-side').addClass('float').removeClass('flip-bottom');
      } else {
        $('.post-side').removeClass('float').addClass('flip-bottom');

        if (windowOffset < floatStop) {
          $('.post-side').removeClass('flip-bottom');
        }
      }
    });

    $(window).resize(function() {
      var parentWidth = $(".post-side-spase").width();
      $(".post-side").css({"width": parentWidth + "px"});
    }).resize();
  }

  // открытие попапа поиска
  (function() {
    if (!document.querySelector('.header-search') || !document.querySelector('.search-popup') || !document.querySelector('.search-popup-close')) return

    const searchButton = document.querySelectorAll('.header-search');
    const searchPopup = document.querySelector('.search-popup');
    const closePopup = document.querySelectorAll('.search-popup-close');

    searchButton.forEach(btn => {
      btn.addEventListener('click', () => {
        searchPopup.classList.add('active');
        document.querySelector('body').classList.add('non-scroll');
      });
    })

    closePopup.forEach(close => {
      close.addEventListener('click', () => {
        searchPopup.classList.remove('active');
        document.querySelector('body').classList.remove('non-scroll');
      });
    })

    // closePopup.addEventListener('click', () => {
    //   searchPopup.classList.remove('active');
    //   document.querySelector('body').classList.remove('non-scroll');
    // });

  })();

  // меню навигации по тексту
  // (function() {
  //   const menuItems = document.querySelectorAll('.item-menu');
  //   const menuList = document.querySelector('.post-side-navigation-list');

  //   const hash = location.hash;
  //   const params = new URLSearchParams(location.search);
  //   const query = params.toString();
    
  //   if(!menuList) return

  //   menuItems.forEach((item, index) => {      
  //     const li = document.createElement('li');
  //     li.classList.add('post-side-navigation-item');
      
  //     if (index === 0) {
  //       li.classList.add('active');
  //     }
      
  //     li.textContent = item.dataset.title || item.textContent;

  //     li.addEventListener('click', () => {
  //       // menuList.querySelectorAll('.active').forEach(el => {
  //       //   el.classList.remove('active');  
  //       // });        
        
  //       // li.classList.add('active');

  //       item.scrollIntoView({
  //         behavior: 'smooth'  
  //       });
  //     });

  //     menuList.appendChild(li);
  
  //     if(hash && hash.includes('item')) {
  
  //       const index = hash.replace('#item', '') - 1;
        
  //       setTimeout(() => {
  //         document.querySelectorAll('.post-side-navigation-item')[index].click();
  //       }, 1000)
  //     }      
  //   });
  
   
  //   let currentActive = menuList.querySelector('.active');

  //   document.addEventListener('scroll', () => {
  //     let maxVisible = 0;
  //     let mostVisible;
  //     let itemIndex;
  
  //     menuItems.forEach((item, index) => {
  //       const rect = item.getBoundingClientRect();
  //       const windowHeight = window.innerHeight;        
  //       const topVisible = Math.max(0, rect.top);
  //       const bottomVisible = Math.min(windowHeight, rect.bottom);
  //       const visibleHeight = bottomVisible - topVisible;
  //       const visiblePercentage = visibleHeight / rect.height * 100;
  
  //       if (visiblePercentage > maxVisible) {      
  //         mostVisible = item;
  //         maxVisible = visiblePercentage;
  //         itemIndex = index;
  //       }
  
  //     });
  
  //     if (mostVisible && mostVisible !== currentActive) {
  //       if (currentActive) {
  //         currentActive.classList.remove('active');
  //       }
        
  //       if (mostVisible) {
  //         document.querySelectorAll('.post-side-navigation-item')[itemIndex].classList.add('active');
  //         currentActive = document.querySelectorAll('.post-side-navigation-item')[itemIndex];

  //         const url = `${location.pathname}` + (query ? `?${query}` : '') +  `#item${itemIndex+1}`;
  //         history.pushState(null, '', url);
  //       }
  //     } else {
  //       currentActive.classList.remove('active');
  //     }    
  //   });    

  // })();


  // меню навигации по тексту
  (function() {
    const menuItems = document.querySelectorAll('.item-menu');
    const menuList = document.querySelector('.post-side-navigation-list');
    const navigation = document.querySelector('.post-side-navigation');

    const hash = location.hash;
    let params = new URLSearchParams(location.search);
    let query = params.toString();

    const spoiler = params.get('spoiler');    

    if(!menuItems.length && navigation) {
      navigation.classList.add('hidden');
    }
    
    if(!menuList) return

    menuItems.forEach((item, index) => {      
      const li = document.createElement('li');
      li.classList.add('post-side-navigation-item');
      
      if (index === 0) {
        li.classList.add('active');
      }
      
      li.textContent = item.dataset.title || item.textContent;

      li.addEventListener('click', () => {
        item.scrollIntoView({
          behavior: 'smooth'  
        });
      });

      menuList.appendChild(li);
  
      if(hash && hash.includes('item')) {       
  
        const index = hash.replace('#item', '') - 1;
        
        setTimeout(() => {
          document.querySelectorAll('.post-side-navigation-item')[index].click();
        }, 1000)
      }   
      
    });

    

    if (spoiler) {
      const button = document.querySelector(`.ui-btn[data-spoiler="${spoiler}"]`);

      if (button) {
        const content = button.closest('.station-more').querySelector('.station-more-text');

        setTimeout(() => {
          const rect = content.getBoundingClientRect();
          const y = rect.top + window.pageYOffset - 200;
      
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
      
          button.click();
        }, 1000)
      }
    }

    // обновление query при клике на спойлер
    const buttons =  document.querySelectorAll('.station-more-head .ui-btn');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        setTimeout(() => {          
        params = new URLSearchParams(location.search);
        query = params.toString();
        }, 1) 
      })
    })
  
   
    let currentActive = menuList.querySelector('.active');

    document.addEventListener('scroll', () => {
     
      let nextIndex;
    
      menuItems.forEach((item, index) => {    
        const rect = item.getBoundingClientRect();
        
        if(rect.top < 130) {
          nextIndex = index;
        }    
      });
    
      if(nextIndex !== undefined) {        
        currentActive.classList.remove('active');
        
        const nextActive = menuList.children[nextIndex];
        nextActive.classList.add('active');
        
        currentActive = nextActive;

        const url = `${location.pathname}` + (query ? `?${query}` : '') +  `#item${nextIndex+1}`;
        history.pushState(null, '', url);        
      }    
    });  
  })();

  // копирование ссылки на станцию
  (function() {    
    const menuItems = document.querySelectorAll('.item-menu');
    
    menuItems.forEach((item, index) => {      
      const titleElement = item.closest('.station-item-title');

      if (titleElement) {
        const shareButton = titleElement.querySelector('.station-item-title-share');

        shareButton.addEventListener('click', (event) => {
          event.preventDefault();

          const baseUrl = window.location.href.split('#')[0];
         
          const url = `${baseUrl}#item${index + 1}`;
          
          const tmp = document.createElement('textarea');
          document.body.append(tmp);
          
          tmp.value = url;
          tmp.select();
          document.execCommand('copy');
          
          tmp.remove();
        });
      }
    });
  })();

  // меню навигации по тексту
  // (function() {
  //   const items = document.querySelectorAll('.post-wrapper .item-menu');
  //   const menu = document.querySelector('.post-side-navigation-list');
  //   const navigation = document.querySelector('.post-side-navigation');  

  //   if(!menu) return

  //   if(items.length) {
  //     items.forEach(item => {
  //       const li = document.createElement('li');
  //       li.classList.add('post-side-navigation-item');
  //       li.dataset.title = item.dataset.title || item.textContent;
  //       li.textContent = item.dataset.title || item.textContent;      
      
  //       li.addEventListener('click', () => {
  //         item.scrollIntoView({block: 'start', behavior: 'smooth'});
  //       });
      
  //       menu.appendChild(li);
  //     });
      
  //     let activeItem = menu.querySelector('li');    
  //     activeItem.classList.add('active');
  
  //     const hash = location.hash;
  //     const params = new URLSearchParams(location.search);
  //     const query = params.toString();
  
  //     if(hash && hash.includes('item')) {
  
  //       const index = hash.replace('#item', '') - 1;
        
  //       setTimeout(() => {
  //         document.querySelectorAll('.post-side-navigation-item')[index].click();
  //       }, 1000)
  //     }
  
      
  //     const observer = new IntersectionObserver(entries => {
  //       entries.forEach((entry) => {
         
  //         if(entry.isIntersecting) {
  //           const index = entry.target.index;
           
  //           activeItem.classList.remove('active');          
  //           activeItem = document.querySelectorAll('.post-side-navigation-item')[index];
  //           activeItem.classList.add('active');

  //           const url = `${location.pathname}` + (query ? `?${query}` : '') +  `#item${index+1}`;

  //           history.pushState(null, '', url);
  //         }
  //       }); 
  //     });
      
  //     items.forEach((item, index) => {     
  //       item.index = index;  
  //       observer.observe(item);
  //     });
  //   } else {
  //     navigation.classList.add('hidden');
  //   }
  // })();


  // обертка для таблицы
  // (function(){
  //   if (!document.querySelector('article table')) return

  //   let tables = document.querySelectorAll('article table');

  //   tables.forEach((table) => {
  //       let wrapper = document.createElement('div');
  //       wrapper.classList.add('article-table', 'article-table__full');

  //       table.parentNode.insertBefore(wrapper, table);
  //       wrapper.appendChild(table);
  //   })
  // })();

  // копирование ссылки текущей страницы в буфер обмена в блоке "поделиться"
  // (function() {
  //   const shareIcon = document.querySelector('.post-side-share-icon__link');

  //   if(!shareIcon) return
  
  //   shareIcon.addEventListener('click', () => {
  //     navigator.clipboard.writeText(window.location.href);        
  //   });
  // })();

  // копирование ссылки текущей страницы в буфер обмена в блоке "поделиться"
  (function() {
    const shareIcon = document.querySelector('.post-side-share-icon__link');

    if(!shareIcon) return

    let container = document.createElement('div');
    container.style.height = '0';
  
    document.body.append(container);    
  
    shareIcon.addEventListener('click', () => {      
      let url = window.location.href;  
      let tmp = document.createElement('textarea');
  
      container.append(tmp);
      
      tmp.value = url;
      tmp.select();  
      document.execCommand('copy');  
      tmp.remove();
    });  
  })();


  // закрытие плашки "актуальное"

  (function() {    
    const close = document.querySelector('.actual-close');

    if(!close) return;

    close.addEventListener('click', (ev) => {    
      ev.target.closest('.actual').classList.add('hidden');
      document.cookie = "hide_actual=Y;path=/";
    })
  })();

  // слайдер новостей
  (function() {
    if (!document.querySelector('.news-slider')) return
  
    var swiper = new Swiper('.news-slider', {   
      grabCursor: true,    
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 20,
      // autoHeight: true,
      autoplay: true,
      loop: true,
      navigation: {
        nextEl: ".news-slider .nav-mobile-icon__next",
        prevEl: ".news-slider .nav-mobile-icon__prev",
      },     
      pagination: {
        el: ".news-slider .nav-mobile-pagination",
        clickable: true,
        // dynamicBullets: true,
        renderBullet: function (index, className) {
          if (index >= 10) {
            return '';  
          }
          return '<span class="' + className + '"></span>';
        },
      },
      breakpoints: {
        481: {
          pagination: {           
            renderBullet: function (index, className) {
              if (index >= 20) {
                return '';  
              }
              return '<span class="' + className + '"></span>';
            },
          },
        },
        600: {
          pagination: {           
            renderBullet: function (index, className) {
              if (index >= 26) {
                return '';  
              }
              return '<span class="' + className + '"></span>';
            },
          },
        },
        769: {
          slidesPerView: 2,
          spaceBetween: 30,
          autoplay: false,
          loop: false,        
        },
        961: {
          slidesPerView: 2,
          spaceBetween: 30,
          autoplay: false,
          loop: false,
          navigation: {
            nextEl: ".ui-nav__news .ui-nav-item__right",
            prevEl: ".ui-nav__news .ui-nav-item__left",
          },
        }
      }
    });  
  })();

  // слайдер "Важно"
  (function() {
    if (!document.querySelector('.important-slider')) return
  
    var swiper = new Swiper('.important-slider', {   
      grabCursor: true,    
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 20,
      // autoHeight: true,
      autoplay: true,
      loop: true,
      navigation: {
        nextEl: ".important-slider .nav-mobile-icon__next",
        prevEl: ".important-slider .nav-mobile-icon__prev",
      },     
      pagination: {
        el: ".important-slider .nav-mobile-pagination",
        clickable: true,        
      },
      breakpoints: {
        1367: {
          slidesPerView: 2,
          spaceBetween: 30,
          autoplay: false,
          loop: false, 
        },
        1141: {
          slidesPerView: 2,
          spaceBetween: 20,
          autoplay: false,
          loop: false,          
        }
      }
    });  
  })();

  // открытие спойлера
  (function() {
    const buttons = document.querySelectorAll('.station-more-head .ui-btn');

    buttons.forEach(button => {
      const initialText = button.querySelector('span').textContent;      

      button.addEventListener("click", function() { 
        const content = this.closest('.station-more').querySelector('.station-more-text');
        const icon = this.querySelector('.ui-btn-icon');
      
        content.classList.toggle("open");
        icon.classList.toggle("open");        

        if (content.classList.contains('open')) {
          const textHeight = content.scrollHeight;
          content.style.maxHeight = textHeight + 'px';
          button.querySelector('span').textContent = 'Свернуть описание';
          
          // Добавляем параметр
          const url = new URL(window.location);
          url.searchParams.set('spoiler', this.dataset.spoiler);
          history.pushState(null, null, url);
        } else {
          content.style.maxHeight = 0;
          button.querySelector('span').textContent = initialText;
          
          // Удаляем параметр
          const url = new URL(window.location);
          url.searchParams.delete('spoiler');
          history.pushState(null, null, url);
        }
      });
    })  

  })();


  // открытие и закрытие бургер-меню
  (function() {
    const burgerBtn = document.querySelector('.header-burger');
    const burgerBtnIcon = document.querySelector('.header-burger span');
    const burgerMenu = document.querySelector('.burger-menu');
    const burgerMenuMobile = document.querySelector('.burger-menu-mobile');
    const headerNav = document.querySelector('.header-nav');
    const searchField = document.querySelector('.header-search-field');

    const menuLis = document.querySelectorAll('.burger-menu-left li');
    const menuNews = document.querySelector('.burger-menu-news');
    const menuItems = document.querySelectorAll('.burger-menu-middle .burger-menu-middle-item');

    const main = document.querySelector('.main');

    if(!burgerBtn || !burgerMenu) return

    burgerBtn.addEventListener('click', () => {
      burgerMenu.classList.toggle('active');
      burgerMenuMobile.classList.toggle('active');
      burgerBtnIcon.classList.toggle('active');
      headerNav.classList.toggle('hidden');
      searchField.classList.toggle('hidden');
      main.classList.toggle('no-visible-mobile');

      // делаем активным пункт меню "О нас"
      menuLis[0].classList.toggle('active');
      menuItems[0].classList.toggle('active');
      menuNews.classList.toggle('active');

      document.querySelector('.wrapper').classList.toggle('non-scroll');

      // закрытие меню клавишей esc
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          burgerMenu.classList.remove('active');
          burgerMenuMobile.classList.remove('active');
          burgerBtnIcon.classList.remove('active');
          headerNav.classList.remove('hidden');
          searchField.classList.remove('hidden');
          menuLis[0].classList.remove('active');
          menuItems[0].classList.remove('active');
          menuNews.classList.remove('active');
          document.querySelector('.wrapper').classList.remove('non-scroll');
        } 
      });
    })
  })();

  (function() {
    const menuLis = document.querySelectorAll('.burger-menu-left li');
    const subMenuLis = document.querySelectorAll('.burger-menu-middle li');
    const menuItems = document.querySelectorAll('.burger-menu-middle .burger-menu-middle-item');
    const menuImgs = document.querySelectorAll('.burger-menu-image');
    const menuImgsWrapper = document.querySelector('.burger-menu-images');
    const menuNews = document.querySelector('.burger-menu-news');   
   
    // клик на пункт меню
    menuLis.forEach(li => {
      li.addEventListener('click', (event) => {
        let target = event.target;

        const a = li.querySelector('a');
        if (a && a.querySelector('svg')) {
          event.preventDefault();
        }

        if (target.tagName === 'A' && target.querySelector('svg')) {
          event.preventDefault();
        }

        menuItems.forEach(item => {
          item.classList.remove('active');
        });
        
        menuLis.forEach(item => {
          item.classList.remove('active');
        });

        subMenuLis.forEach(item => {
          item.classList.remove('active');
        });

        menuImgs.forEach(item => {
          item.classList.remove('active');
        });

        if(menuImgsWrapper) {
          menuImgsWrapper.classList.remove('active');
        }        

        li.classList.add('active');

        const dataMenuValue = li.getAttribute('data-menu');
        const targetElement = document.querySelector(`.burger-menu-middle [id='${dataMenuValue}']`);        
  
        if (targetElement) {
          targetElement.classList.add('active');
        }

        const dataNews = li.getAttribute('data-news');

        if(dataNews) {
          menuNews.classList.add('active');
        } else {
          menuNews.classList.remove('active');
        }

        const dataMenuValueImage = li.getAttribute('data-image');
    
        if(dataMenuValueImage && menuImgsWrapper) {
          menuImgsWrapper.classList.add('active');         
          menuImgs[0].classList.add('active');        
        }
      })
    })

    // клик на пункт подменю
    subMenuLis.forEach(li => {
      
      li.addEventListener('click', () => {       
        subMenuLis.forEach(item => {
          item.classList.remove('active');
        });

        li.classList.add('active');        
      })
    })

    // наведение на пункт подменю с услугой и отображение соответствующей картики
    subMenuLis.forEach((li) => {          

      li.addEventListener('mouseover', () => {    
        menuImgs.forEach(item => {
          item.classList.remove('active');
        });
        
        subMenuLis.forEach(item => {
          item.classList.remove('active');
        });
    
        li.classList.add('active');
    
        const dataMenuValue = li.getAttribute('data-image');
    
        if(dataMenuValue && menuImgsWrapper) {
          menuImgsWrapper.classList.add('active')
        }
        
        const targetElement = document.querySelector(`.burger-menu-right [id='${dataMenuValue}']`);        
    
        if (targetElement) {
          targetElement.classList.add('active');
        }
      })
    })
  })();

  // мобильное меню
  (function() {
    // добавление тугглера в nav 
    const navLis = document.querySelectorAll('.menu-mobile-nav > ul > li');

    navLis.forEach(li => {
      const a = li.querySelector('a'); // выбираем элемент <a>
      const ul = li.querySelector('ul');

      if (ul && a) { // проверяем, что элементы <ul> и <a> существуют
        const icon = document.createElement('span');
        icon.setAttribute('class', 'icon');
        a.appendChild(icon); // вставляем иконку внутрь элемента <a>
      }
    });

    function deactivateAll() {
      navLis.forEach(li => {
        li.classList.remove('active');
      });
    }

    function toggleMenu(li) {
      if (li.classList.contains('active')) {
        li.classList.remove('active');
      } else {
        deactivateAll();
        li.classList.add('active');
      }
    }

    navLis.forEach(li => {
      const a = li.querySelector('a');     
      const icon = li.querySelector('.icon');
    
      if (a) {
        a.addEventListener('click', (ev) => {          
          const href = a.getAttribute('href');
          if (href === '#' || href === 'javascript:void(0)') {
            ev.preventDefault();
            toggleMenu(li);
          }
        });
      }
    
      if (icon) {       
        icon.addEventListener('click', (ev) => {              
          ev.preventDefault();
          ev.stopPropagation();
          toggleMenu(li);
        });
      }
    });

  })();

  // открытие списка мессендеров в мобильном меню
  (function() {
    const messengersBnts = document.querySelector('.menu-mobile-messengers');
    const order = document.querySelector('.menu-mobile-order');
    const socials = document.querySelector('.menu-mobile-socials');
    const close = document.querySelector('.menu-mobile-socials-close');

    if(!messengersBnts) return;

    function toggleMessengers() {
      order.classList.toggle('hidden');
      socials.classList.toggle('hidden');
    }

    messengersBnts.addEventListener('click', toggleMessengers);

    close.addEventListener('click', toggleMessengers)

  })();

  // поиск
  (function() {
    document.querySelectorAll('.search-block-input').forEach(input => {

      const parent = input.parentElement;
      const clearButton = parent.querySelector('.search-block-clear');

      if(!clearButton) return
    
      input.addEventListener('input', () => {
        if(input.value.trim() !== '') {
          clearButton.classList.add('active');
        } else {
          clearButton.classList.remove('active');
        }
      });
    
      clearButton.addEventListener('click', (event) => {
        event.preventDefault();
        input.value = '';
        clearButton.classList.remove('active'); 
      });
    
    });

  })();

  // видео-прелоадер
  function setCookie(name, value, exp_y, exp_m, exp_d, path, domain, secure) {
    let cookie_string = name + "=" + escape(value);
  
    if (exp_y)
    {
      let expires = new Date(exp_y, exp_m, exp_d);
      cookie_string += "; expires=" + expires.toGMTString();
    }
  
    if (path)
      cookie_string += "; path=" + escape(path);
  
    if (domain)
      cookie_string += "; domain=" + escape(domain);
  
    if (secure)
      cookie_string += "; secure";
  
    document.cookie = cookie_string;
  }
  
  function getCookie(cookie_name) {
    let results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
  
    if (results)
      return (unescape(results[2]));
    else
      return null;
  }
  
  const preloader = document.querySelector('.preloader');
  let logo = document.querySelector('.header-logo');

  if(!preloader) return;
  
  const endPreloader = () => {
    if(preloader) {          
      logo.style.opacity = '0';
      logo.style.transform = 'scale(0)';

      clearTimeout(preload_timeout);
      window.removeEventListener('load', endPreloader); 

      setTimeout(() => {    
        preloader.style.opacity = '0';
        // preloader.style.transform = 'scale(0)';
      }, 3500);
  
      setTimeout(() => {    
        preloader.classList.remove('active');
      }, 4000);
  
      setTimeout(() => {
        preloader.remove();
        logo.style.opacity = '1';
        logo.style.transform = 'scale(1)'; 
      }, 4500);
    }
  };
  
  let preloader_cookie = getCookie('preloader');
  
  if (preloader_cookie === null) {
    setCookie('preloader', true);
    preloader.classList.add('active');
    preload_timeout = setTimeout(endPreloader, 5800);
    window.addEventListener('load', endPreloader);
  } else if(preloader){
    window.addEventListener('load', function() {
      preloader.remove()
    });
  }     

});

// слайдер "Услуги" на мобильном разрешении
(function(){
  const servicesListItems = document.querySelectorAll('.services-list-item');
  const swiperWrapper = document.querySelector('.swiper-wrapper');

  servicesListItems.forEach(item => {

    const slide = document.createElement('div');
    slide.classList.add('swiper-slide', 'services-slide');
    
    slide.appendChild(item.cloneNode(true));
    
    if(swiperWrapper) {
      swiperWrapper.appendChild(slide);
    }    

  });

  // if (!document.querySelector('.services-slider')) return
  

    var swiper = new Swiper('.services-slider', {   
      grabCursor: true,    
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 20,
      // autoHeight: true,
      autoplay: true,
      loop: true,
      navigation: {
        nextEl: ".services-slider .nav-mobile-icon__next",
        prevEl: ".services-slider .nav-mobile-icon__prev",
      },     
      pagination: {
        el: ".services-slider .nav-mobile-pagination",
        clickable: true,        
      },
      breakpoints: {
        600: {
          slidesPerView: 2,
          spaceBetween: 30,         
        }
      }
    });  
})();
