import Lock from '../modules/lock.js';
import Backdrop from '../modules/backdrop.js';
import throttle from '../modules/throttle.js';

/**
 * @param {string}  activeClass                - Active class
 * @param {boolean} scrollLock                 - Disable scroll when menu opens
 * @param {boolean} scrollFix                  - Fix jumping page when scrolling is disabled
 * @param {string}  fixedBlockClass            - Modifier class for fixed blocks
 * @param {boolean} smoothScroll               - Smooth scrolling to block
 * @param {number}  throttle                   - Throttle between toggling
 * @param {boolean} debug                      - Enable Debug mode
 * @param {string}  menuBtnSelector            - Menu button selector
 * @param {string}  menuBodySelector           - Menu body selector
 * @param {boolean} backdrop                   - Menu backdrop
 * @param {string}  backdropClass              - Backdrop class
 * @param {string}  backdropActiveClass        - Backdrop active class
 * @param {string}  backdropContainerClass     - Parent block for the backdrop element
 * @param {number}  backdropTransitionDuration - The duration of the transition between showing and hiding the backdrop (The value should match the transition property in css)
 * @param {boolean} backdropStatic             - Disable menu closing on backdrop click
 */

export default class Menu {
	constructor(options) {
		const defaultOptions = {
			activeClass: '--show',
			scrollLock: true,
			scrollFix: true,
			fixedBlockClass: '--fixed',
			smoothScroll: false,
			throttle: 300,
			debug: false,

			menuBtnSelector: '.header__menu .menu__btn',
			menuBodySelector: '.header__menu .menu__body',

			backdrop: false,
			backdropClass: 'backdrop',
			backdropActiveClass: '--show',
			backdropContainerClass: '.header__menu.menu',
			backdropTransitionDuration: 300,
			backdropStatic: false,
		};

		this.options = { ...defaultOptions, ...options };

		if (this.options.scrollLock) {
			this.lock = new Lock({
				scrollFix: this.options.scrollFix,
				fixedBlockClass: this.options.fixedBlockClass,
			});
		}

		if (this.options.backdrop) {
			this.backdrop = new Backdrop({
				class: this.options.backdropClass,
				activeClass: this.options.backdropActiveClass,
				containerClass: this.options.backdropContainerClass,
				transitionDuration: this.options.backdropTransitionDuration,
			});
		}

		this.menuBtnElement = document.querySelector(this.options.menuBtnSelector);
		this.menuBodyElement = document.querySelector(this.options.menuBodySelector);

		if (this.options.debug) this.check();

		this.init();
	}

	check() {
		const backdropParentElement = document.querySelector(this.options.backdropContainerClass);

		// Menu button
		if (!this.menuBtnElement)
			console.error(`Menu button with class "${this.options.menuBtnSelector}" not found`);

		// Menu body
		if (!this.menuBodyElement)
			console.error(`Menu body with class "${this.options.menuBodySelector}" not found`);

		// Backdrop parent element
		if (!backdropParentElement && this.options.backdrop)
			console.error(
				`Backdrop parent element with class "${this.options.backdropContainerClass}" not found`
			);
	}

	init() {
		// Initialisation
		this.menuBtnElement?.addEventListener(
			'click',
			throttle(({ target }) => {
				const ariaExpanded = target.closest(
					`${this.options.menuBtnSelector}[aria-expanded='false']`
				);

				ariaExpanded ? this.show() : this.hide();
			}, this.options.throttle)
		);

		// Closing menu on backdrop click
		if (this.options.backdrop && !this.options.backdropStatic) {
			const backdropParent = document.querySelector(this.options.backdropContainerClass);

			backdropParent?.addEventListener('click', ({ target }) => {
				if (target.classList.contains(this.options.backdropClass)) this.hide();
			});
		}

		// Smooth scrolling when clicking anchor links
		if (this.options.smoothScroll) {
			this.menuBodyElement.addEventListener('click', event => {
				if (event.target.hasAttribute('href')) {
					event.preventDefault();

					this.smoothScroll(event.target);
				}
			});
		}
	}

	show() {
		this.menuBodyElement?.classList.add(this.options.activeClass);
		this.menuBtnElement?.setAttribute('aria-expanded', true);
		this.backdrop?.add();
		this.lock?.lock();
	}

	hide() {
		this.menuBodyElement?.classList.remove(this.options.activeClass);
		this.menuBtnElement?.setAttribute('aria-expanded', false);
		this.backdrop?.remove();
		this.lock?.unlock();
	}

	smoothScroll(anchor) {
		const getAnchor = document.querySelector(anchor.getAttribute('href'));
		const header = document.querySelector('header');
		const isHeaderFixed =
			window.getComputedStyle(header).getPropertyValue('position') === 'fixed';

		if (this.options.debug && !getAnchor) {
			console.warn(
				`Section with id "${anchor.getAttribute('href').substring(1)}" not found!`
			);
		}

		if (getAnchor) this.hide();

		// Smooth scrolling to the section
		if (!isHeaderFixed && getAnchor) {
			getAnchor.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}

		// Smooth scrolling to the section, taking into account the fixed header
		if (isHeaderFixed && getAnchor) {
			window.scrollTo({
				behavior: 'smooth',
				top: getAnchor.getBoundingClientRect().top + scrollY - header.offsetHeight,
			});
		}
	}
}
