if (document.querySelector('.swiper')) {
	new Swiper('.swiper', {
		// Optional parameters
		// autoplay: {
		// 	delay: 5000,
		// },

		direction: 'horizontal',
		// loop: true,

		// Navigation arrows
		navigation: {
			nextEl: '.swiper__btn-next',
			prevEl: '.swiper__btn-prev',
			disabledClass: 'swiper__btn--disabled',
		},

		// Keyboard controls
		keyboard: {
			enable: true,
			onlyInViewport: true,
			pageUpDown: true,
		},

		// Mousewheel control
		mousewheel: {
			sensivity: 1,
		},

		slidesPerView: 1,

		speed: 500,
	});
}

// new Swiper('.swiper', {
// 	// Бесконечная прокрутка
// 	loop: true,

// 	// Пагинация
// 	// pagination: {
// 	// 	el: '.swiper-pagination',
// 	// 	clickable: true,
// 	// },

// 	// Навигационные кнопки (Prev/Next)
// 	navigation: {
// 		nextEl: '.swiper-button-next',
// 		prevEl: '.swiper-button-prev',
// 	},

// 	// Управление клавиатурой
// 	keyboard: {
// 		enable: true,
// 		onlyInViewport: true,
// 		pageUpDown: true,
// 	},

// 	// Управление мышью
// 	mousewheel: {
// 		sensivity: 1,
// 	},

// 	// Количество одновременно показываемых слайдов
// 	slidesPerView: 1,

// 	// Отступ между слайдами
// 	spaceBetween: 30,

// 	// Скорость прокрутки слайдов
// 	speed: 800,

// 	// Адаптив
// 	breakpoints: {
// 		320: {
// 			slidesPerView: 1,
// 		},

// 		576: {
// 			slidesPerView: 2,
// 		},

// 		768: {
// 			slidesPerView: 3,
// 		},

// 		992: {
// 			slidesPerView: 4,
// 		},

// 		1200: {
// 			slidesPerView: 5,
// 		},
// 	},
// });
