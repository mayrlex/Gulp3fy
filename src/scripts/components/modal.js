import throttle from '../modules/throttle.js';
import Lock from '../modules/lock.js';

/**
 * @param {string}  modalName       - Modal id
 * @param {number}  throttle        - Throttle delay
 * @param {number}  animation       - Animation delay (As in styles)
 * @param {boolean} scrollLock      - Disable scroll when modal opens
 * @param {boolean} scrollFix       - Fix jumping page when scrolling is disabled
 * @param {string}  fixedBlockClass - Modifier class for fixed blocks
 * @param {boolean} debug           - Debug mode
 * @param {object}  onShow()        - Function triggered at show modal (With debug: true)
 * @param {object}  onHide()        - Function triggered at hide modal (With debug: true)
 */

export default class Modal {
	constructor(options) {
		const defaultOptions = {
			throttle: 300,
			animation: 500,
			scrollLock: true,
			scrollFix: true,
			fixedBlockClass: '--fixed',
			debug: false,
			onShow: () => {},
			onHide: () => {},
		};

		this.options = { ...defaultOptions, ...options };
		this.modal = document.querySelector(`#${this.options.modalName}`);
		this.lock = new Lock({
			scrollFix: this.options.scrollFix,
			fixedBlockClass: this.options.fixedBlockClass,
		});

		if (this.options.debug) this.check();
		if (this.modal) this.init();
	}

	check() {
		if (!this.modal)
			console.error(`Error: Modal with id:'${this.options.modalName}' not found!`);
	}

	init() {
		const showBtn = document.querySelectorAll(`[data-modal='${this.options.modalName}']`);

		// Open modal on button click with [data-modal='{Modal Id}']
		showBtn.forEach(item => {
			item.addEventListener(
				'click',
				throttle(() => {
					if (this.modal.hasAttribute('open')) return;

					this.show();
				}, this.options.throttle)
			);
		});

		// Close modal when clicking on ::backdrop or on button with [data-modal-close]
		this.modal.addEventListener(
			'click',
			throttle(({ currentTarget, target }) => {
				const isThis = currentTarget === target;
				const closeBtn = target.closest('[data-modal-close]');

				if (isThis || closeBtn) this.hide();
			}, this.options.throttle)
		);
	}

	show() {
		const modalNodes = document.querySelectorAll('.modal');

		// Close all modals except current
		modalNodes.forEach(item => {
			if (item !== this.modal) item.close();
		});

		if (this.options.scrollLock) this.lock.lock();

		this.modal.showModal();

		if (this.options.debug) this.options.onShow(this);
	}

	hide() {
		this.modal.classList.add('--closing');

		setTimeout(() => {
			this.modal.close();
			this.modal.classList.remove('--closing');

			if (this.options.scrollLock) this.lock.unlock();
		}, this.options.animation);

		if (this.options.debug) this.options.onHide(this);
	}
}
