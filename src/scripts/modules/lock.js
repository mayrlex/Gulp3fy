/**
 * @param {Array} fixedBlocks - Blocks with position: fixed
 */

export default class Lock {
	constructor(options) {
		const defaultOptions = {
			fixedBlocks: [],
		};

		this.options = { ...defaultOptions, ...options };

		if (this.options.fixedBlocks.length) {
			this.fixedBlocks = document.querySelectorAll(this.options.fixedBlocks);
		}
	}

	lock() {
		const scrollWidth = `${window.innerWidth - document.body.offsetWidth}px`;

		document.body.style.overflow = 'hidden';
		document.body.style.paddingRight = scrollWidth;

		if (this.options.fixedBlocks.length) {
			this.fixedBlocks.forEach((element) => {
				element.style.paddingRight = scrollWidth;
			});
		}
	}

	unlock() {
		document.body.style.overflow = null;
		document.body.style.paddingRight = null;

		if (this.options.fixedBlocks.length) {
			this.fixedBlocks.forEach((element) => {
				element.style.paddingRight = null;
			});
		}
	}
}
