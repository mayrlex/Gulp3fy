import Swiper, { Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination]);

if (document.querySelector('.swiper')) {
	Swiper('.swiper', {
		// ### Navigation ###
		navigation: {
			nextEl: '.swiper__btn-next',
			prevEl: '.swiper__btn-prev',
			disabledClass: 'swiper__btn--disabled',
		},

		// ### Pagination ###
		pagination: {
			el: '.swiper__pagination',
			clickable: true,
		},

		// ### Controlls ###
		// >>>>>>>>>>>>>>>>>
		keyboard: {
			enable: true,
			onlyInViewport: true,
			pageUpDown: true,
		},

		mousewheel: {
			sensivity: 1,
		},
		// >>>>>>>>>>>>>>>>>

		// Options
		direction: 'horizontal',
		loop: true,
		speed: 800,
		autoplay: {
			delay: 5000,
		},

		// Media
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 15,
			},

			576: {
				slidesPerView: 2,
				spaceBetween: 15,
			},

			768: {
				slidesPerView: 3,
				spaceBetween: 20,
			},

			992: {
				slidesPerView: 4,
				spaceBetween: 20,
			},

			1200: {
				slidesPerView: 5,
				spaceBetween: 30,
			},
		},
	});
}
