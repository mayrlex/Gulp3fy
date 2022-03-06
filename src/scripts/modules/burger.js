/*
Argument:
	selector: {string} - Active class [Default: '--show']

Call:
	const burger = new Burger();
*/

export default class Burger {
	constructor(selector) {
		this.active = selector || '--show';

		this.init();
	}

	init() {
		const burger = document.querySelector('.burger');
		const menu = document.querySelector('.menu');
		const link = document.querySelectorAll('.menu__link');

		if (burger) {
			burger.addEventListener('click', () => {
				document.body.classList.toggle('--lock');
				burger.classList.toggle(this.active);
				menu.classList.toggle(this.active);

				if (!burger.classList.contains(this.active)) {
					link.forEach((item) => item.classList.remove(this.active));
				}
			});
		}
	}
}
