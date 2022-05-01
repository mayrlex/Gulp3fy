import Lock from '../../scripts/modules/lock.js';
import throttle from '../../scripts/modules/throttle.js';

/**
 * @param {Object}  options
 * @param {string}  options.toggleClass - Toggle class
 * @param {number}  options.throttle    - Throttle between toggling
 * @param {boolean} options.backdrop    - Turn on/off menu backdrop
 * @param {boolean} options.scrollFix   - Sets padding-right for content when scroll is blocked
 */

export default class Burger {
	constructor(options) {
		const defaultOptions = {
			toggleClass: '--show',
			throttle: 250,
			backdrop: true,
			scrollFix: true,
		};

		this.option = { ...defaultOptions, ...options };
		this.lock = new Lock({ scrollFix: this.option.scrollFix });
		this.init();
	}

	init() {
		const btn = document.querySelector('.burger');
		const menu = document.querySelector('.header__nav');
		const backdrop = document.querySelector('.header__inner');

		btn.addEventListener(
			'click',
			throttle(() => {
				const ariaExpanded = btn.getAttribute('aria-expanded') === 'true';

				if (this.option.backdrop) backdrop.classList.toggle(this.option.toggleClass);

				menu.classList.toggle(this.option.toggleClass);
				btn.classList.toggle(this.option.toggleClass);
				btn.setAttribute('aria-expanded', !ariaExpanded);

				if (btn.classList.contains(this.option.toggleClass)) this.lock.lock();
				if (!btn.classList.contains(this.option.toggleClass)) this.lock.unlock();
			}, this.option.throttle)
		);
	}
}
