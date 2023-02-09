import Lock from '../modules/lock.js';
import throttle from '../modules/throttle.js';
import Backdrop from '../modules/backdrop.js';

/**
 * @param {string}  activeClass                - Active class
 * @param {Array}   fixedBlocks                - Blocks with position: fixed
 * @param {boolean} isHeaderFixed              - Take into account the height of the header when scrolling if the header is fixed
 * @param {boolean} scrollLock                 - Disable scroll when modal opens
 * @param {boolean} scrollFix                  - Fix jumping page when scrolling is disabled
 * @param {string}  fixedBlockClass            - Modifier class for fixed blocks
 * @param {boolean} smoothScroll               - Smooth scrolling to block
 * @param {number}  throttle                   - Throttle between toggling
 *
 * @param {string}  menuSelector               - Menu selector
 * @param {string}  menuBtnSelector            - Menu button selector
 * @param {string}  menuBodySelector           - Menu body selector
 * @param {string}  menuLinkSelector           - Menu link selector
 *
 * @param {boolean} backdrop                   - Menu backdrop
 * @param {string}  backdropActiveClass        - Backdrop active class
 * @param {string}  backdropSelector           - Backdrop selector
 * @param {string}  backdropParrentSelector    - A selector whose block serves as a container for the backdrop
 * @param {number}  backdropTransitionDuration - The duration of the transition between showing and hiding the backdrop (The value should match the transition property in css)
 */

export default class Menu {
	constructor(options) {
		const defaultOptions = {
			activeClass: '--show',
			fixedBlocks: [],
			isHeaderFixed: false,
			scrollLock: true,
			scrollFix: true,
			fixedBlockClass: '--fixed',
			smoothScroll: true,
			throttle: 300,

			menuSelector: '.header__menu.menu',
			menuBtnSelector: '.header__menu .menu__btn',
			menuBodySelector: '.header__menu .menu__body',
			menuLinkSelector: '.header__menu .menu__link',

			backdrop: true,
			backdropActiveClass: '--show',
			backdropSelector: '.backdrop',
			backdropParrentSelector: '.header__menu.menu',
			backdropTransitionDuration: 300,
		};

		this.options = { ...defaultOptions, ...options };
		this.lock = new Lock({
			scrollFix: this.options.scrollFix,
			fixedBlockClass: this.options.fixedBlockClass,
		});

		this.backdrop = new Backdrop({
			activeClass: this.options.backdropActiveClass,
			backdropSelector: this.options.backdropSelector,
			parrentSelector: this.options.backdropParrentSelector,
			transitionDuration: this.options.backdropTransitionDuration,
		});

		this.menuElement = document.querySelector(this.options.menuSelector);
		this.menuBtnElement = document.querySelector(this.options.menuBtnSelector);
		this.menuBodyElement = document.querySelector(this.options.menuBodySelector);

		this.check();
		this.init();
	}

	check() {
		if (!this.options.menuBtnSelector) {
			console.error(`Menu button with class «${this.options.menuBtnSelector}» not found`);
		}

		if (!this.options.menuBodySelector) {
			console.error(`Menu body with class «${this.options.menuBodySelector}» not found`);
		}
	}

	init() {
		if (this.options.menuBtnSelector && this.options.menuBodySelector) {
			this.menuBtnElement.addEventListener(
				'click',
				throttle((event) => {
					const ariaExpanded = event.target.closest(`${this.options.menuBtnSelector}[aria-expanded='false']`);

					ariaExpanded ? this.show() : this.hide();
				}, this.options.throttle)
			);

			if (this.options.backdrop) {
				document.addEventListener('click', (event) => {
					const isBackdrop = event.target.classList.contains(this.options.backdropSelector.substring(1));

					isBackdrop ? this.hide() : null;
				});
			}

			if (this.options.smoothScroll) {
				const anchorNodes = document.querySelectorAll(`${this.options.menuLinkSelector}[href*="#"]`);

				anchorNodes.forEach((anchor) => {
					anchor.addEventListener('click', (event) => {
						event.preventDefault();

						this.smoothScroll(anchor);
					});
				});
			}
		}
	}

	show() {
		this.menuBodyElement.classList.add(this.options.activeClass);
		this.menuBtnElement.setAttribute('aria-expanded', true);

		this.options.backdrop ? this.backdrop.show() : null;
		this.options.scrollFix ? this.lock.lock() : null;
	}

	hide() {
		this.menuBodyElement.classList.remove(this.options.activeClass);
		this.menuBtnElement.setAttribute('aria-expanded', false);

		this.options.backdrop ? this.backdrop.hide() : null;
		this.options.scrollFix ? this.lock.unlock() : null;
	}

	smoothScroll(anchor) {
		const getElementById = document.querySelector(anchor.getAttribute('href'));
		const header = document.querySelector('header');

		this.hide();

		if (!this.options.isHeaderFixed) {
			getElementById.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}

		if (this.options.isHeaderFixed) {
			window.scrollTo({
				behavior: 'smooth',
				top: getElementById.getBoundingClientRect().top + scrollY - header.offsetHeight,
			});
		}
	}
}
