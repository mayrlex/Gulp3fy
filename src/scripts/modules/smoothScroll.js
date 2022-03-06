/*
Argument:
	selector: {string} - Active class [Default: '--show']

Call:
	const smoothScroll = new SmoothScroll();
*/

export default class SmoothScroll {
	constructor(selector) {
		this.active = selector || '--show';

		this.init();
	}

	init() {
		if (document.querySelectorAll('.menu__link[data-anchor]').length) {
			const anchor = document.querySelectorAll('.menu__link[data-anchor]');
			const header = document.querySelector('header');
			const burger = document.querySelector('.burger');
			const menu = document.querySelector('.menu');

			const smoothScroll = (event) => {
				const target = document.querySelector(event.target.dataset.anchor);

				if (!target) return;

				if (burger.classList.contains(this.active)) {
					document.body.classList.remove('--lock');
					menu.classList.remove(this.active);
					burger.classList.remove(this.active);
				}

				window.scrollTo({
					top: target.getBoundingClientRect().top + scrollY - header.offsetHeight,
					behavior: 'smooth',
				});
			};

			anchor.forEach((event) => event.addEventListener('click', smoothScroll));
		}
	}
}
