$.fn.removeClassMask = function(mask) {
  return this.removeClass(function(index, cls) {
      var re = mask.replace(/\*/g, '\\S+');
      return (cls.match(new RegExp('\\b' + re + '', 'g')) || []).join(' ');
  });
};

jQuery(document).ready(function($) {
	

	// var viStartBtn = '<a class="vi-start-btn"><i class="i-eye"></i><span>Версия для слабовидящих</span></a>';

	// $('.f-contacts-items').append(viStartBtn);

	var viBg = '<div class="vi-panel-group">'+
		'<div class="vi-group-title">Цвет сайта</div>'+
		'<div class="vi-group-btns">'+
			'<a href="#" class="vi-bg vi-bg-white active" data-bg="white">A</a>'+
			'<a href="#" class="vi-bg vi-bg-black" data-bg="black">A</a>'+
			'<a href="#" class="vi-bg vi-bg-brown" data-bg="brown">A</a>'+
		'</div></div>';

	var viFz = '<div class="vi-panel-group">'+
		'<div class="vi-group-title">Размер шрифта</div>'+
		'<div class="vi-group-btns">'+
			'<a href="#" class="vi-font-plus">+</a>'+
			'<a href="#" class="vi-font-minus"></a>'+
		'</div></div>';

	var viLs = '<div class="vi-panel-group">'+
		'<div class="vi-group-title">Межбуквенный интервал</div>'+
		'<div class="vi-group-btns">'+
			'<a href="#" class="vi-ls active" data-ls="0">1</a>'+
			'<a href="#" class="vi-ls" data-ls="25">1.25</a>'+
			'<a href="#" class="vi-ls" data-ls="50">1.5</a>'+
		'</div></div>';

	var viLh = '<div class="vi-panel-group">'+
		'<div class="vi-group-title">Междустрочный интервал</div>'+
		'<div class="vi-group-btns">'+
			'<a href="#" class="vi-lh active" data-lh="1">1</a>'+
			'<a href="#" class="vi-lh" data-lh="15">1.5</a>'+
			'<a href="#" class="vi-lh" data-lh="2">2</a>'+
		'</div></div>';

    var viGray = '<div class="vi-panel-group">'+
		'<div class="vi-group-title">Ч/Б гамма</div>'+
		'<div class="vi-group-btns">'+
			'<a href="#" class="vi-gray" data-gray="off">Откл</a>'+
			'<a href="#" class="vi-gray active" data-gray="on">Вкл</a>'+
		'</div></div>';     

	var viImg = '<div class="vi-panel-group">'+
		'<div class="vi-group-title">Изображения</div>'+
		'<div class="vi-group-btns">'+			
			'<a href="#" class="vi-img" data-img="on">Вкл</a>'+
			'<a href="#" class="vi-img active" data-img="off">Откл</a>'+
		'</div></div>';

	var viBtns = viBg + viFz + viLs + viLh + viGray + viImg;

	var viPanel = '<div class="vi-panel"><div class="inner"><div class="flex">'+viBtns+'</div></div></div>';


	var viToggler = '<span class="vi-toggler"></span>';

	$('.wrapper').before(viPanel);
	//добавляем разметку тугглера в дом
	//скрыть, если тугглер присутствует в разметке изначально
	$('#header .navigation').append(viToggler);

	//настройки версии для слабовидящих
	var viConfig = {
		mode: false,
		bg: 'white',
		fz: 18,
		ls: 0,
		lh: 1,
        gray: 'on',
		imgs: 'off'
	};
	//настройки хранимые в LS
	var viCookie;


	//проверяем активность версии + настройки
	setTimeout(function(){
		if( localStorage.getItem('vi') ) {            
			viCookie = JSON.parse(localStorage.getItem('vi'));

			if ( viCookie.mode === true ) {   
				$('.vi-start-btn').addClass('active');
				$('.poor-vision-btn span').text('Обычная версия сайта');
				
				viConfig = viCookie;
				$('.vi-panel').addClass('opened');
				$('html').addClass('vi');
				$('html').addClass('vi-fz-'+viCookie.fz);

				if( viCookie.bg !== '' ) {
					$('html').addClass('vi-bg-'+viCookie.bg);
					$('a.vi-bg').removeClass('active');
					$('a.vi-bg[data-bg='+viCookie.bg+']').addClass('active');
				}
				if ( viCookie.imgs !== '' ) {
					$('html').addClass('vi-img-'+viCookie.imgs);
					$('a.vi-img').removeClass('active');
					$('a.vi-img[data-img='+viCookie.imgs+']').addClass('active');
				}
				if ( viCookie.ls !== '' ) {
					$('html').addClass('vi-ls-'+viCookie.ls);
					$('a.vi-ls').removeClass('active');
					$('a.vi-ls[data-ls='+viCookie.ls+']').addClass('active');
				}
                if ( viCookie.gray !== '' ) {		
					$('html').addClass('vi-gray-'+viCookie.gray);
					$('a.vi-gray').removeClass('active');
					$('a.vi-gray[data-gray='+viCookie.gray+']').addClass('active');
				}
				if ( viCookie.lh !== '' ) {
					$('html').addClass('vi-lh-'+viCookie.lh);
					$('a.vi-lh').removeClass('active');
					$('a.vi-lh[data-lh='+viCookie.lh+']').addClass('active');
				}
			}
		}
	},0);


    // классы по умолчанию
    var defaultClasses = 'vi vi-gray-on vi-img-off vi-lh-1 vi-ls-0 vi-fz-18 vi-bg-white';
	

	//активируем
	$(document).on('click', '.poor-vision-btn',function(e){
		e.preventDefault();
		var span = $(this).find('span');		
		
		// if (span.text() === 'Версия для слабовидящих') {
		if (!localStorage.getItem('vi')) {
			$(this).addClass('active');
			$('html').addClass(defaultClasses);
			$('.vi-panel').addClass('opened');
			
			
			viConfig.mode = true;
			localStorage.setItem('vi',JSON.stringify(viConfig));
			span.text('Обычная версия сайта');
		} else {
			$(this).removeClass('active');
			$('html').removeClass('vi');
			$('html').removeClassMask('vi-*');
			$('.vi-panel').removeClass('opened');
			
			viConfig.mode = false;
			localStorage.removeItem('vi');
			span.text('Версия для слабовидящих');
		}
	});
	$(document).on('click', '.vi-toggler',function(e){
		e.preventDefault();
		
		if (!localStorage.getItem('vi')) {
			$(this).addClass('active');
			$('html').addClass(defaultClasses);
			$('.vi-panel').addClass('opened');
			
			viConfig.mode = true;
			localStorage.setItem('vi',JSON.stringify(viConfig));
		} else {
			$(this).removeClass('active');
			$('html').removeClass('vi');
			$('html').removeClassMask('vi-*');
			$('.vi-panel').removeClass('opened');
			
			viConfig.mode = false;
			localStorage.removeItem('vi');
		}
	});

	/*$(document).on('click','.vi-panel-off',function(){
		$('html').removeClass('vi');
		$('html').removeClassMask('vi-*');
		$('.vi-panel').removeClass('opened');
		viConfig.mode = false;
		localStorage.removeItem('vi');
	});*/

	$(document).on('click','.vi-group-btns a:not(.vi-font-plus, .vi-font-minus)',function(e){
		e.preventDefault();
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
	});


	//шрифт +
	$(document).on('click','a.vi-font-plus',function(){
		var curFz = viConfig.fz + 1;
		
		if (curFz > 10 && curFz < 28) {
			$('html').removeClassMask('vi-fz-*');
			$('html').addClass('vi-fz-'+curFz);
			viConfig.fz = curFz;
			localStorage.setItem('vi',JSON.stringify(viConfig));
		}
	});

	//шрифт -
	$(document).on('click','a.vi-font-minus',function(){
		var curFz = viConfig.fz - 1;
		if (curFz > 10 && curFz < 28) {
			$('html').removeClassMask('vi-fz-*');
			$('html').addClass('vi-fz-'+curFz);
			viConfig.fz = curFz;
			localStorage.setItem('vi',JSON.stringify(viConfig));
		}

	});

	$(document).on('click','a.vi-bg',function(){
		var $bg = $(this).data('bg');
		$('html').removeClassMask('vi-bg-*');
		$('html').addClass('vi-bg-'+$bg);
		viConfig.bg = $bg;
		localStorage.setItem('vi',JSON.stringify(viConfig));
		// $.cookie('vi', JSON.stringify(viConfig), { expires: 1, path: '/' });
	});

	$(document).on('click','a.vi-ls',function(){
		var $ls = $(this).data('ls');
		$('html').removeClassMask('vi-ls-*');
		$('html').addClass('vi-ls-'+$ls);
		viConfig.ls = $ls;
		localStorage.setItem('vi',JSON.stringify(viConfig));
	});

	$(document).on('click','a.vi-lh',function(){        
		var $lh = $(this).data('lh');
		$('html').removeClassMask('vi-lh-*');
		$('html').addClass('vi-lh-'+$lh);
		viConfig.lh = $lh;
		localStorage.setItem('vi',JSON.stringify(viConfig));
	});

    $(document).on('click','a.vi-gray',function(){
        console.log('click')
		var $gray = $(this).data('gray');
		$('html').removeClassMask('vi-gray-*');
		$('html').addClass('vi-gray-'+$gray);
		viConfig.gray = $gray;
		localStorage.setItem('vi',JSON.stringify(viConfig));
	});

	$(document).on('click','a.vi-img',function(){
		var $img = $(this).data('img');
		$('html').removeClassMask('vi-img-*');
		$('html').addClass('vi-img-'+$img);
		viConfig.imgs = $img;
		localStorage.setItem('vi',JSON.stringify(viConfig));
	});

});