import Lock from '../../scripts/modules/lock.js';

/*
Options:
	target       {string}  - Modal id
	openTrigger  {string}  - Modal open trigger [ `[data-<any>='${target}']` | Default: `[data-modal='${target}']` ]
	closeTrigger {string}  - Modal close trigger [ Default: [data-modal-close] ]
	scrollFix    {boolean} - Sets padding-right for content when scroll is blocked [Default: true]
	onShow()     {object}  - Function triggired on show modal
	onHide()     {object}  - Function triggired on hide modal

Call:
	import Modal from '../../../components/modal/modal.js';

	const modal1 = new Modal({
		id: 'modal-1',
		scrollFix: false,
		onShow: () => {
			console.log('Modal is shown');
		},

		onHide: () => {
			console.log('Modal is hidden');
		},
	});
*/

export default class Modal {
	constructor({
		target,
		openTrigger = `[data-modal='${target}']`,
		closeTrigger = '[data-modal-close]',
		scrollFix,
		onShow = () => {},
		onHide = () => {},
	}) {
		this.config = { target, openTrigger, closeTrigger, onShow, onHide };
		this.modal = document.querySelector(`#${this.config.target}`);
		this.modalNodes = document.querySelectorAll('.modal');
		this.isShown = false;
		this.lock = new Lock({
			scrollFix,
		});

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
				const closeTrigger = event.target.closest(this.config.closeTrigger);
				const outsideArea = event.target.classList.contains('modal__overlay');

				if (event.target.closest(this.config.openTrigger)) this.show();
				closeTrigger || outsideArea ? this.hide() : null;
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
		this.lock.lock();
		this.config.onShow(this);
		this.modal.ariaHidden = 'false';

		setTimeout(() => {
			this.isShown = true;
			focusableNodes.length ? focusableNodes[0].focus() : null;
		}, 300);
	}

	hide() {
		this.config.onHide(this);
		this.lock.unlock();
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
