export default class Popup {
	constructor(options) {
		this.options = options;
		this.popup = document.querySelector('.popup');
		this.popupInner = document.querySelector('.popup__inner');
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
			document.addEventListener('click', (e) => {
				const btnCall = e.target.closest('[data-popup="call"]');
				const btnClose = e.target.closest('[data-popup="close"]');
				const popup = e.target.classList.contains('popup');
				const isShown = e.target.classList.contains('--show');

				btnCall ? this.open() : null;
				btnClose || (popup && isShown) ? this.close() : null;
			});

			window.addEventListener('keydown', (e) => {
				e.key === 'Escape' && this.isOpened ? this.close() : null;
				e.key === 'Tab' && this.isOpened ? this.focus(e) : null;
			});
		}
	}

	focus(e) {
		const focusItems = this.popupInner.querySelectorAll(this.focusItems);
		const focusItemsArray = Array.prototype.slice.call(focusItems);
		const focusedItemIndex = focusItemsArray.indexOf(document.activeElement);

		if (e.shiftKey && focusedItemIndex === 0) {
			focusItemsArray[focusItemsArray.length - 1].focus();
			e.preventDefault();
		}

		if (!e.shiftKey && focusedItemIndex === focusItemsArray.length - 1) {
			focusItemsArray[0].focus();
			e.preventDefault();
		}
	}

	open() {
		const focusItems = this.popupInner.querySelectorAll(this.focusItems);

		this.isOpened ? this.close() : null;
		document.body.classList.add('--lock');
		this.popup.classList.add('--show');
		this.popup.ariaHidden = 'false';

		setTimeout(() => {
			this.isOpened = true;
			focusItems.length ? focusItems[0].focus() : null;
		}, 300);
	}

	close() {
		document.body.classList.remove('--lock');
		this.popup.classList.remove('--show');
		this.isOpened = false;
		this.popup.ariaHidden = 'true';
	}
}
