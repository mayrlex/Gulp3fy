/*
Argumenst:
	selector {string} - Popup selector

Call:
	import Popup from '../../../components/popup/popup.js';

	const popup = new Popup('.popup');
*/

export default class Popup {
	constructor(selector) {
		this.selector = selector;
		this.popup = document.querySelector(`.${this.selector}__popup`);
		this.popupInner = document.querySelector(`.${this.selector}__popup > .popup__inner`);
		this.popupNodes = document.querySelectorAll('.popup');
		this.isOpened = false;
		this.focusItems = [
			'a[href]',
			'button',
			'input',
			'select',
			'textarea',
			'[tabindex]:not([tabindex^=' - '])',
		];

		this.events();
	}

	events() {
		if (this.popup) {
			document.addEventListener('click', (event) => {
				const btnCall = event.target.closest(`[data-popup=${this.selector}]`);
				const btnClose = event.target.closest('[data-popup="close"]');
				const popup = event.target.classList.contains('popup');
				const isShown = event.target.classList.contains('--show');

				btnCall ? this.open() : null;
				btnClose || (popup && isShown) ? this.close() : null;
			});

			window.addEventListener('keydown', (event) => {
				event.key === 'Escape' && this.isOpened ? this.close() : null;
				event.key === 'Tab' && this.isOpened ? this.focus(event) : null;
			});
		}
	}

	focus(event) {
		const focusItems = this.popupInner.querySelectorAll(this.focusItems);
		const focusItemsArray = Array.prototype.slice.call(focusItems);
		const focusedItemIndex = focusItemsArray.indexOf(document.activeElement);

		if (event.shiftKey && focusedItemIndex === 0) {
			focusItemsArray[focusItemsArray.length - 1].focus();
			event.preventDefault();
		}

		if (!event.shiftKey && focusedItemIndex === focusItemsArray.length - 1) {
			focusItemsArray[0].focus();
			event.preventDefault();
		}
	}

	open() {
		const focusItems = this.popupInner.querySelectorAll(this.focusItems);

		this.popupNodes.forEach((item) => {
			if (item === this.popup) return;

			item.classList.replace('--show', '--hide');
			item.ariaHidden = 'true';
		});

		this.isOpened ? this.close() : null;
		document.body.classList.add('--lock');
		this.popup.classList.replace('--hide', '--show');
		this.popup.ariaHidden = 'false';

		setTimeout(() => {
			this.isOpened = true;
			focusItems.length ? focusItems[0].focus() : null;
		}, 300);
	}

	close() {
		document.body.classList.remove('--lock');
		this.popup.classList.replace('--show', '--hide');
		this.isOpened = false;
		this.popup.ariaHidden = 'true';
	}
}
