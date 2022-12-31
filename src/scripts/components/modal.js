import Lock from '../modules/lock.js';
import throttle from '../modules/throttle.js';

/**
 * @param {string}  modal       - Modal id
 * @param {string}  activeClass - Active class
 * @param {boolean} scrollFix   - Removes the shift of the page content when locking/unlocking scroll
 * @param {number}  throttle    - Throttle delay
 * @param {object}  onShow()    - Function triggered at show modal
 * @param {object}  onHide()    - Function triggered at hide modal
 */

export default class Modal {
	constructor(options) {
		const defaultOptions = {
			activeClass: '--show',
			scrollFix: true,
			throttle: 350,
			onShow: () => {},
			onHide: () => {},
		};

		this.options = { ...defaultOptions, ...options };
		this.modal = document.querySelector(`#${this.options.modal}`);
		this.isShown = false;
		this.lock = new Lock(this.options.scrollFix);
		this.FOCUSABLE_ELEMENTS = [
			'a[href]',
			'area[href]',
			'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
			'select:not([disabled]):not([aria-hidden])',
			'textarea:not([disabled]):not([aria-hidden])',
			'button:not([disabled]):not([aria-hidden])',
			'iframe',
			'object',
			'embed',
			'[contenteditable]',
			'[tabindex]:not([tabindex^="-"])',
		];

		this.check();
		this.init();
	}

	check() {
		if (!this.modal) {
			console.error(`Error: modal with id:'${this.options.modal}' not found`);
		}
	}

	init() {
		if (this.modal) {
			document.addEventListener(
				'click',
				throttle((event) => {
					const closeTrigger = event.target.closest('[data-modal-close]');
					const outsideArea = event.target.classList.contains('modal__overlay');

					if (event.target.closest(`[data-modal='${this.options.modal}']`)) {
						this.show();
					}
					closeTrigger || outsideArea ? this.hide() : null;
				}, this.options.throttle)
			);

			window.addEventListener(
				'keydown',
				throttle((event) => {
					event.key === 'Escape' && this.isShown ? this.hide() : null;
				}, this.options.throttle)
			);

			window.addEventListener('keydown', (event) => {
				event.key === 'Tab' && this.isShown ? this.focus(event) : null;
			});
		}
	}

	show() {
		const focusableNodes = this.modal.querySelectorAll(this.FOCUSABLE_ELEMENTS);
		const modalNodes = document.querySelectorAll('.modal');

		modalNodes.forEach((item) => {
			if (item === this.modal) return;
			item.ariaHidden = 'true';
		});

		this.isShown ? this.hide() : null;
		this.modal.classList.toggle(this.options.activeClass);
		this.lock.lock();
		this.options.onShow(this);
		this.modal.ariaHidden = 'false';

		setTimeout(() => {
			this.isShown = true;
			focusableNodes.length ? focusableNodes[0].focus() : null;
		}, 300);
	}

	hide() {
		this.options.onHide(this);
		this.lock.unlock();
		this.isShown = false;
		this.modal.ariaHidden = 'true';

		setTimeout(() => {
			this.modal.classList.toggle(this.options.activeClass);
		}, 300);
	}

	focus(event) {
		const focusedElements = Array(...this.modal.querySelectorAll(this.FOCUSABLE_ELEMENTS));
		const focusedElementIndex = focusedElements.indexOf(document.activeElement);

		if (event.shiftKey && focusedElementIndex === 0) {
			focusedElements[focusedElements.length - 1].focus();
			event.preventDefault();
		}

		if (!event.shiftKey && focusedElementIndex === focusedElements.length - 1) {
			focusedElements[0].focus();
			event.preventDefault();
		}
	}
}
