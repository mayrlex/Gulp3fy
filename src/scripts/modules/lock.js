/**
 * @param {boolean} scrollFix - Removes the shift of the page content when locking/unlocking scroll
 */

export default class Lock {
	constructor(options) {
		const defaultOptions = {
			scrollFix: true,
		};

		this.option = { ...defaultOptions, ...options };
		this.body = document.body;
		this.fixedBlocks = document.querySelectorAll('.--fixed');
	}

	lock() {
		const scrollWidth = `${window.innerWidth - document.body.offsetWidth}px`;

		this.body.classList.add('--lock');

		if (this.option.scrollFix) {
			this.body.style.paddingRight = scrollWidth;

			this.fixedBlocks.forEach((element) => {
				element.style.paddingRight = scrollWidth;
			});
		}
	}

	unlock() {
		this.body.classList.remove('--lock');

		if (this.option.scrollFix) {
			this.body.style.paddingRight = null;
			this.fixedBlocks.forEach((element) => {
				element.style.paddingRight = null;
			});
		}
	}
}
