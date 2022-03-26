/*
Call:
	import Modal from '../../../components/popup/popup.js';

	const modal1 = new Modal('modal-1');
*/

export default class Modal {
	constructor(id) {
		this.id = id;
		this.modal = document.querySelector(`#${this.id}`);
		this.modalNodes = document.querySelectorAll('.modal');
		this.isShown = false;
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

		this.events();
	}

	events() {
		if (this.modal) {
			document.addEventListener('click', (event) => {
				const call = event.target.closest(`[data-modal=${this.id}]`);
				const close = event.target.closest('[data-modal-close]');
				const overlay = event.target.classList.contains('modal__overlay');

				call ? this.show() : null;
				close || overlay ? this.hide() : null;
			});

			window.addEventListener('keydown', (event) => {
				event.key === 'Escape' && this.isShown ? this.hide() : null;
				event.key === 'Tab' && this.isShown ? this.focus(event) : null;
			});
		}
	}

	show() {
		const focusableNodes = this.modal.querySelectorAll(this.FOCUSABLE_ELEMENTS);

		this.modalNodes.forEach((item) => {
			if (item === this.modal) return;
			item.ariaHidden = 'true';
		});

		this.isShown ? this.hide() : null;
		document.body.classList.add('--lock');
		this.modal.ariaHidden = 'false';

		setTimeout(() => {
			this.isShown = true;
			focusableNodes.length ? focusableNodes[0].focus() : null;
		}, 300);
	}

	hide() {
		document.body.classList.remove('--lock');
		this.isShown = false;
		this.modal.ariaHidden = 'true';
	}

	focus(event) {
		const focusedElements = Array(...this.modal.querySelectorAll(this.FOCUSABLE_ELEMENTS));
		const focusedItemindex = focusedElements.indexOf(document.activeElement);

		if (event.shiftKey && focusedItemindex === 0) {
			focusedElements[focusedElements.length - 1].focus();
			event.preventDefault();
		}

		if (!event.shiftKey && focusedItemindex === focusedElements.length - 1) {
			focusedElements[0].focus();
			event.preventDefault();
		}
	}
}
