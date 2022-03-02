import Swiper, { Navigation, Pagination, Keyboard } from 'swiper';

const swiper = new Swiper('.swiper', {
	modules: [Navigation, Pagination, Keyboard],

	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},

	navigation: {
		// nextEl: '.swiper-button-next',
		// prevEl: '.swiper-button-prev',
	},

	keyboard: {
		enable: true,
		onlyInViewport: true,
		pageUpDown: true,
	},

	mousewheel: {
		sensivity: 1,
	},

	// direction: 'vertical',
	// loop: true,
	rewind: true,
	speed: 800,
	// autoplay: {
	// 	delay: 5000,
	// },

	breakpoints: {
		576: {
			slidesPerView: 1,
			spaceBetween: 10,
		},

		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},

		992: {
			slidesPerView: 3,
			spaceBetween: 20,
		},

		1400: {
			slidesPerView: 4,
			spaceBetween: 20,
		},
	},
});
