WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function () {
	// First section slider
	let firstSectionSlider = document.querySelector('.first_section .slider .swiper')

	if (firstSectionSlider) {
		new Swiper('.first_section .slider .swiper', {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			lazy: true,
			on: {
				activeIndexChange: swiper => {
					let number = 0

					if ((swiper.realIndex + 1) < 10) {
						number = '0' + (swiper.realIndex + 1)
					}

					setTimeout(() => $(swiper.el).find('.number').text(number))
				}
			}
		})
	}


	// Materials slider
	const materialsSliders = [],
		materials = document.querySelectorAll('.materials .swiper')

	materials.forEach((el, i) => {
		el.classList.add('materials_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			lazy: true,
			breakpoints: {
				0: {
					spaceBetween: 16,
					slidesPerView: 2
				},
				480: {
					spaceBetween: 20,
					slidesPerView: 2
				},
				768: {
					spaceBetween: 20,
					slidesPerView: 3
				},
				1024: {
					spaceBetween: 20,
					slidesPerView: 4
				}
			},
			on: {
				init: swiper => {
					setTimeout(() => {
						$(swiper.el).find('.swiper-button-next, .swiper-button-prev').css(
							'top', $(swiper.el).find('.thumb').outerHeight() * 0.5
						)
					})
				},
				resize: swiper => {
					setTimeout(() => {
						$(swiper.el).find('.swiper-button-next, .swiper-button-prev').css(
							'top', $(swiper.el).find('.thumb').outerHeight() * 0.5
						)
					})
				}
			}
		}

		materialsSliders.push(new Swiper('.materials_s' + i, options))
	})


	// Models slider
	const modelsSliders = [],
		models = document.querySelectorAll('.create .models .swiper')

	models.forEach((el, i) => {
		el.classList.add('models_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			lazy: true,
			breakpoints: {
				0: {
					spaceBetween: 16,
					slidesPerView: 2
				},
				480: {
					spaceBetween: 20,
					slidesPerView: 2
				},
				768: {
					spaceBetween: 20,
					slidesPerView: 3
				},
				1024: {
					spaceBetween: 20,
					slidesPerView: 4
				}
			}
		}

		modelsSliders.push(new Swiper('.models_s' + i, options))
	})


	// Smooth scrolling to anchor
	const scrollBtns = document.querySelectorAll('.scroll_btn')

	if (scrollBtns) {
		scrollBtns.forEach(element => {
			element.addEventListener('click', e => {
				e.preventDefault()

				let anchor = element.getAttribute('data-anchor')

				$('header .mob_menu_btn').removeClass('active')
				$('body').removeClass('lock')
				$('.mob_menu').removeClass('show')
				$('.overlay').fadeOut(200)

				document.getElementById(anchor).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				}, 1000)
			})
		})
	}


	// Mini popups
	$('.mini_modal_btn').click(function(e) {
		e.preventDefault()

		const modalId = $(this).data('modal-id')

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
			$('.mini_modal').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		} else {
			$('.mini_modal_btn').removeClass('active')
			$(this).addClass('active')

			$('.mini_modal').removeClass('active')
			$(modalId).addClass('active')

			if (is_touch_device()) $('body').css('cursor', 'pointer')
		}
	})

	// Close the popup when clicking outside of it
	$(document).click(e => {
		if ($(e.target).closest('.modal_cont').length === 0) {
			$('.mini_modal, .mini_modal_btn').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		}
	})


	// Tabs
	var locationHash = window.location.hash

	$('body').on('click', '.tabs .btn', function(e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			let parent = $(this).closest('.tabs_container'),
				content = $(this).data('content'),
				activeTab = parent.find(`.tabs:not(.mob_tabs) .btn[data-content="${content}"]`),
				mobActiveTab = parent.find(`.tabs.mob_tabs .btn[data-content="${content}"]`),
				activeTabContent = $(content),
				level = $(this).data('level')

			parent.find('.tabs:not(.mob_tabs) .btn').removeClass('active')
			parent.find('.tabs.mob_tabs .btn').removeClass('active')

			parent.find('.tab_content.' + level).removeClass('active')

			activeTab.addClass('active')
			mobActiveTab.addClass('active')
			activeTabContent.addClass('active')

			parent.find('.tabs.mob_tabs .current span').text($(this).find('span').text())

			$('.mini_modal, .mini_modal_btn').removeClass('active')
			if (is_touch_device()) $('body').css('cursor', 'default')
		}
	})


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: 'Закрыть',
		NEXT: 'Следующий',
		PREV: 'Предыдущий',
		MODAL: 'Вы можете закрыть это модальное окно нажав клавишу ESC'
	}

	Fancybox.defaults.tpl = {
		closeButton: '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg><use xlink:href="https://rafkanian.ru/wp-content/themes/raten/images/sprite.svg#ic_close"></use></svg></button>',
		spinner: '9999',
		main: `<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">
			<div class="fancybox__backdrop"></div>
			<div class="fancybox__carousel"></div>
			<div class="fancybox__footer"></div>
		</div>`,
	}


	// Modals
	$('body').on('click', '.modal_btn', function(e) {
		e.preventDefault()

		//Fancybox.close()

		if($(this).data("modal")=="quike_buy_modal"){
			$("#quike_buy_modal input[name='title']").val($(this).data("title"));
		}

		if($(this).data("modal")=="order_modal"){
			$("#order_modal input[name='title']").val($(this).data("title"));

			let chars = "";
			chars += "Цвет: " + $("#product_modal .color input:checked + div span").data("name") + "\n";
			chars += "Размер: " + $("#product_modal select[name='product_size']").val() + "\n";
			chars += "Цена: " + $("#product_modal .price").text();

			$("#order_modal input[name='chars']").val(chars);
		}

		Fancybox.show([{
			src: document.getElementById(e.target.getAttribute('data-modal')),
			type: 'inline'
		}])
	})

	$('body').on('click', '.ajax_modal_btn', function(e) {
		e.preventDefault()

		//Fancybox.close()

		Fancybox.show([{
			src: e.target.getAttribute('data-href'),
			type: 'ajax',
		}], {
			on: {
				done: () => {
					// Custom select - Nice select
					const selects = document.querySelectorAll('#product_modal select')

					if (selects) {
						selects.forEach(el => {
							NiceSelect.bind(el, {
								placeholder: el.getAttribute('data-placeholder')
							})

							el.addEventListener('change', () => el.classList.add('selected'))
						})
					}

					$('.product_info .vals input').on('change', function (e) {
						$(".product_info .row .images").hide();
						$("."+$(this).data("images")).show();

						$(".product_info .data .description .text_block").html($(this).data("desc"));
						$(".product_info .data .price").html($(this).data("price") + " ₽");
						$(".product_info .data .art span").html($(this).data("art"));
					});

					// Product images
					if ($('#product_modal .images').length) {

						const products_thumbSliders = [],
							products_thumb = document.querySelectorAll('#product_modal .thumbs .swiper')

						products_thumb.forEach((el, i) => {
							el.classList.add('products_thumb_s' + i)

							let options = {
								loop: true,
								speed: 500,
								watchSlidesProgress: true,
								slideActiveClass: 'active',
								slideVisibleClass: 'visible',
								slidesPerView: 'auto',
								direction: 'vertical',
								spaceBetween: 20
							}

							products_thumbSliders.push(new Swiper('.products_thumb_s' + i, options))
						})

						const productsSliders = [],
							products = document.querySelectorAll('#product_modal .big .swiper')

						products.forEach((el, i) => {
							el.classList.add('products_s' + i)

							let options = {
								loop: true,
								speed: 500,
								watchSlidesProgress: true,
								slideActiveClass: 'active',
								slideVisibleClass: 'visible',
								spaceBetween: 0,
								slidesPerView: 1,
								navigation: {
									nextEl: '.swiper-button-next',
									prevEl: '.swiper-button-prev'
								},
								thumbs: {
									swiper: products_thumbSliders[i]
								}
							}

							productsSliders.push(new Swiper('.products_s' + i, options))
						})


						/*const productThumbs = new Swiper('#product_modal .thumbs .swiper', {
							loop: true,
							speed: 500,
							watchSlidesProgress: true,
							slideActiveClass: 'active',
							slideVisibleClass: 'visible',
							slidesPerView: 'auto',
							direction: 'vertical',
							spaceBetween: 20
						})

						new Swiper('#product_modal .big .swiper', {
							loop: true,
							speed: 500,
							watchSlidesProgress: true,
							slideActiveClass: 'active',
							slideVisibleClass: 'visible',
							spaceBetween: 0,
							slidesPerView: 1,
							navigation: {
								nextEl: '.swiper-button-next',
								prevEl: '.swiper-button-prev'
							},
							thumbs: {
								swiper: productThumbs
							}
						})*/
					}
			  	}
			}
		})
	})


	// Zoom images
	Fancybox.bind('.fancy_img', {
		Image: {
			zoom: false
		},
		Thumbs: {
			autoStart: false
		}
	})


	// Accordion
	$('body').on('click', '.accordion .accordion_item .head', function(e) {
		e.preventDefault()

		let item = $(this).closest('.accordion_item'),
			accordion = $(this).closest('.accordion')

		if (item.hasClass('active')) {
			item.removeClass('active').find('.data').slideUp(300)
		} else {
			accordion.find('.accordion_item').removeClass('active')
			accordion.find('.data').slideUp(300)

			item.addClass('active').find('.data').slideDown(300)
		}
	})


	// Mob. menu
	$('header .mob_menu_btn').click(e => {
		e.preventDefault()

		$('header .mob_menu_btn').toggleClass('active')
		$('body').toggleClass('lock')
		$('header .mob_menu').toggleClass('show')
	})


	// Phone input mask
	const phoneInputs = document.querySelectorAll('input[type=tel]')

	if (phoneInputs) {
		phoneInputs.forEach(el => {
			IMask(el, {
				mask: '+{7} (000) 000-00-00',
				lazy: true
			})
		})
	}


	// Focus when clicking on the field name
	const formLabels = document.querySelectorAll('form .label')

	if (formLabels) {
		formLabels.forEach(el => {
			el.addEventListener('click', e => {
				e.preventDefault()

				el.closest('.line').querySelector('.input, textarea').focus()
			})
		})
	}


	// Custom select - Nice select
	const selects = document.querySelectorAll('.create select')
	var niceArr = [];
	if (selects) {
		selects.forEach(el => {
			var ints = NiceSelect.bind(el, {
				placeholder: el.getAttribute('data-placeholder')
			})
			el.addEventListener('change', () => el.classList.add('selected'))
			niceArr.push(ints);
		})
	}

	// Submit forms
	/*$('form.custom_submit').submit(function(e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: document.getElementById('success_modal'),
			type: 'inline'
		}])
	})*/

	$('.wpcf7 .submit_btn').on('click',function(){
	    setTimeout(() => {
	    	$(this).prop("disabled",true);
	    }, 0);
	});

	$('.wpcf7').on('wpcf7invalid wpcf7spam wpcf7mailsent wpcf7mailfailed', function () {
	    $('.wpcf7 .submit_btn').prop("disabled",false);
	});


	document.addEventListener( 'wpcf7mailsent', function( event ) {
		if ( '164' == event.detail.contactFormId ) {
			$('.step').hide()
			$(".step4").fadeIn(200);
		}
		else
		{
			Fancybox.close()
			Fancybox.show([{
				src: '#success_modal',
				type: 'inline'
			}])
		}

		$('.wpcf7 .submit_btn').prop("disabled",false);

	}, false );

	$(".wpcf7 input[type='checkbox']:not(input[name='agree[]'])").on('change', function (e) {
		$(this).closest(".wpcf7").find(".wpcf7-form-control-wrap:not(span[data-name='agree'])").removeClass("checked");
		if($(this).prop('checked'))
		{
			$(this).closest(".wpcf7-form-control-wrap").addClass("checked");
		}
		else
		{
			$(this).closest(".wpcf7-form-control-wrap").removeClass("checked");
		}
	});

	//$(".wpcf7 input[name='radio-15']").closest(".wpcf7-form-control-wrap").addClass("checked");

	$(".wpcf7 input[name='agree[]']").closest(".wpcf7-form-control-wrap").addClass("checked");

	$(".wpcf7 input[name='agree[]']").on('change', function (e) {
		//$('span[data-name="agree"]').removeClass("checked");
		if($(this).closest(".wpcf7-form-control-wrap").hasClass("checked"))
		{
			$(this).closest(".wpcf7-form-control-wrap").removeClass("checked");
		}
		else
		{
			$(this).closest(".wpcf7-form-control-wrap").addClass("checked");
		}
	});


	// Create
	$('.create .steps .btns .prev_btn').click(function(e) {
		e.preventDefault()

		let step = $(this).closest('.step')

		if (step.hasClass('step3')) {
			let clone = step.find('.final_model_image svg').clone()

			step.find('.final_model_image svg').remove()
			$('.create .steps .step2 .model_image').html(clone)

		}

		step.hide().prev().fadeIn(200)
	})

	$('.create .steps .btns .next_btn').click(function(e) {
		e.preventDefault()

		let step = $(this).closest('.step')

		if (step.hasClass('step2')) {
			let clone = step.find('.model_image svg').clone()

			step.find('.model_image svg').remove()
			$('.create .steps .final_model_image').html(clone)
		}

		/*Добавляем в форму инфу*/
		if (step.hasClass('step2')) {
			$(".step3 input[name='title']").val($(".step1 input[name='model']:checked + div").find(".name span").text());

			let chars = "";
			chars += "Шнурки: " + $(".step2 #laces_modal input:checked").data("name") + "\n";

			chars += "Материал 1: " + $(".step2 #material1_modal input:checked").data("name") + " | " + $(".material1 select option:selected").text() + "\n";
			chars += "Материал 2: " + $(".step2 #material2_modal input:checked").data("name") + " | " + $(".material2 select option:selected").text() + "\n";
			chars += "Материал 3: " + $(".step2 #material3_modal input:checked").data("name") + " | " + $(".material3 select option:selected").text() + "\n";

			$(".step3 input[name='chars']").val(chars);
		}

		step.hide().next().fadeIn(200)
	})

	/*$('.create .steps .form').submit(function(e) {
		e.preventDefault()

		let step = $(this).closest('.step')

		step.hide().next().fadeIn(200)
	})*/

	$('#material1 #fill1, #material2 #fill2, #material3 #fill3').attr('fill', '#fff')

	$(".model").on("change", function() {
	    let svg = $(this).data("svg");
	    $(".model_image").html(svg);
	    // Create - default colors
		$('#material1 #fill1, #material2 #fill2, #material3 #fill3').attr('fill', '#fff')
		$('.create .steps .model_materials .laces .color .current span').css('background-color', "#fff")
		$('.create .steps .model_materials .material1 .color .current span').css('background-color', "#fff")
		$('.create .steps .model_materials .material2 .color .current span').css('background-color', "#fff")
		$('.create .steps .model_materials .material3 .color .current span').css('background-color', "#fff")


		niceArr.forEach(ele => {
			//console.log(ele);
			ele.destroy();
		});

		niceArr = [];
		if (selects) {
			selects.forEach(el => {
				var ints = NiceSelect.bind(el, {
					placeholder: el.getAttribute('data-placeholder')
				})
				el.addEventListener('change', () => el.classList.add('selected'))
				niceArr.push(ints);
			})
		}
	});



	// Create - set laces color
	$('.create .steps .model_materials .laces .color label').click(function(e) {
		let color = $(this).find('input').val(),
			step = $(this).closest('.step')

		step.find('#laces').css('fill', color)
		$('.create .steps .model_materials .laces .color .current span').css('background-color', color)
	})


	// Create - set material 1 color
	$('.create .steps .model_materials .material1 .color label').click(function(e) {
		let color = $(this).find('input').val(),
			step = $(this).closest('.step')

		console.log(color);

		step.find('#material1 #fill1').css('fill', color)
		$('.create .steps .model_materials .material1 .color .current span').css('background-color', color)
	})


	// Create - set material 2 color
	$('.create .steps .model_materials .material2 .color label').click(function(e) {
		let color = $(this).find('input').val(),
			step = $(this).closest('.step')

		step.find('#material2 #fill2').css('fill', color)
		$('.create .steps .model_materials .material2 .color .current span').css('background-color', color)

	})


	// Create - set material 3 color
	$('.create .steps .model_materials .material3 .color label').click(function(e) {
		let color = $(this).find('input').val(),
			step = $(this).closest('.step')

		step.find('#material3 #fill3').attr('fill', color)
		$('.create .steps .model_materials .material3 .color .current span').css('background-color', color)
	})


	// Create - set material 1
	$('.create .steps .model_materials .material1 .material select').change(function(e) {
		let material = $(this).val(),
			step = $(this).closest('.step')

		step.find('#material1 *:not(:first-child)').hide()
		step.find('#material1 #' + material).fadeIn(200)
	})


	// Create - set material 2
	$('.create .steps .model_materials .material2 .material select').change(function(e) {
		let material = $(this).val(),
			step = $(this).closest('.step')

		step.find('#material2 *:not(:first-child)').hide()
		step.find('#material2 #' + material).fadeIn(200)
	})


	// Create - set material 3
	$('.create .steps .model_materials .material3 .material select').change(function(e) {
		let material = $(this).val(),
			step = $(this).closest('.step')

		step.find('#material3 *:not(:first-child)').hide()
		step.find('#material3 #' + material).fadeIn(200)
	})

	$(".load_more").click(function(e) {
        e.preventDefault();

        $(this).prev().find(".product.hide").each(function(i,elem) {
            if(i==12)
            {
                return false;
            }
            $(elem).removeClass("hide");
        });

        if($(this).prev().find(".product.hide").length==0)
        {
            $(this).hide();
        }
    });


	// Filter
	$('.filter_btn, #filter .close_btn, .overlay').click(function(e) {
		e.preventDefault()

		$('#filter').toggleClass('show')

		$('#filter').hasClass('show')
			? $('.overlay').fadeIn(300)
			: $('.overlay').fadeOut(200)
	})
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth


		// Mob. version
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 390) document.getElementsByTagName('meta')['viewport'].content = 'width=390, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})



// Map
function initMap() {
	ymaps.ready(() => {
		let myMap = new ymaps.Map('map', {
			center: [59.949588, 30.266809],
			zoom: 13,
			controls: []
		})

		// Кастомный маркер
		let myPlacemark = new ymaps.Placemark([59.949588, 30.266809], {}, {
			iconLayout : 'default#image',
			iconImageHref : 'https://rafkanian.ru/wp-content/themes/raten/images/map_marker.svg',
			iconImageSize : [32, 38],
			iconImageOffset : [-16, -38],
		})

		myMap.geoObjects.add(myPlacemark)

		myMap.controls.add('zoomControl', {
			position : {
				right : '20px',
				top   : '20px'
			}
		})

		myMap.behaviors.disable('scrollZoom')
	})
}