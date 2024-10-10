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
			lazy: true
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
		closeButton: '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg><use xlink:href="images/sprite.svg#ic_close"></use></svg></button>',

		main: `<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">
			<div class="fancybox__backdrop"></div>
			<div class="fancybox__carousel"></div>
			<div class="fancybox__footer"></div>
		</div>`,
	}


	// Modals
	$('body').on('click', '.modal_btn', function(e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: document.getElementById(e.target.getAttribute('data-modal')),
			type: 'inline'
		}])
	})

	$('body').on('click', '.ajax_modal_btn', function(e) {
		e.preventDefault()

		Fancybox.close()

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


					// Product images
					if ($('#product_modal .images').length) {
						const productThumbs = new Swiper('#product_modal .thumbs .swiper', {
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
						})
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
	$('header .mob_menu_btn, .mob_menu .close_btn').click(e => {
		e.preventDefault()

		$('header .mob_menu_btn').toggleClass('active')
		$('body').toggleClass('lock')
		$('.mob_menu').toggleClass('show')

		$('header .mob_menu_btn').hasClass('active')
			? $('.overlay').fadeIn(300)
			: $('.overlay').fadeOut(200)
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

	if (selects) {
		selects.forEach(el => {
			NiceSelect.bind(el, {
				placeholder: el.getAttribute('data-placeholder')
			})

			el.addEventListener('change', () => el.classList.add('selected'))
		})
	}


	// Submit forms
	$('form.custom_submit').submit(function(e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: document.getElementById('success_modal'),
			type: 'inline'
		}])
	})


	// Create
	$('.create .steps .btns .prev_btn').click(function(e) {
		e.preventDefault()

		let step = $(this).closest('.step')

		step.hide().prev().fadeIn(200)
	})

	$('.create .steps .btns .next_btn').click(function(e) {
		e.preventDefault()

		let step = $(this).closest('.step')

		step.hide().next().fadeIn(200)
	})

	$('.create .steps .form').submit(function(e) {
		e.preventDefault()

		let step = $(this).closest('.step')

		step.hide().next().fadeIn(200)
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
			center: [55.815843, 37.581244],
			zoom: 13,
			controls: []
		})

		// Кастомный маркер
		let myPlacemark = new ymaps.Placemark([55.815843, 37.581244], {}, {
			iconLayout : 'default#image',
			iconImageHref : 'images/map_marker.svg',
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