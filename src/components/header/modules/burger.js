import Lock from '../../../scripts/modules/lock.js';
import throttle from '../../../scripts/modules/throttle.js';

/*
Options:
	toggleClass {string}  - Toggle class
	scrollFix   {boolean} - Sets padding-right for content when scroll is blocked
	delay       {number}  - Throttle between toggling
	backdrop    {boolean} - Turn off/on burger menu backdrop

Call:
	import Modal from '../../../components/modal/modal.js';

	const burger = new Burger({
		toggleClass: '--active',
		scrollFix: false,
		throttle: 300,
		backdrop: false,
	});
*/

const defaultOptions = {
	toggleClass: '--show',
	throttle: 250,
	backdrop: true,
	scrollFix: true,
};

export default class Burger {
	constructor(options) {
		this.option = { ...defaultOptions, ...options };
		this.lock = new Lock({ scrollFix: this.option.scrollFix });
		this.init();
	}

	init() {
		const btn = document.querySelector('.burger');
		const menu = document.querySelector('.header__nav');
		const backdrop = document.querySelector('.header__inner');

		const toggle = () => {
			const ariaExpanded = btn.getAttribute('aria-expanded') === 'true';

			if (this.option.backdrop) backdrop.classList.toggle(this.option.toggleClass);

			menu.classList.toggle(this.option.toggleClass);
			btn.classList.toggle(this.option.toggleClass);
			btn.setAttribute('aria-expanded', !ariaExpanded);

			if (btn.classList.contains(this.option.toggleClass)) this.lock.lock();
			if (!btn.classList.contains(this.option.toggleClass)) this.lock.unlock();
		};

		btn.addEventListener('click', throttle(toggle, this.option.throttle));
	}
}
