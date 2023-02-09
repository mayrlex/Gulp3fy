/**
 * @param {boolean} scrollFix       - Fix jumping page when scrolling is disabled
 * @param {string}  fixedBlockClass - Modifier class for fixed blocks
 */

export default class Lock {
	constructor(options) {
		const defaultOptions = {
			scrollFix: true,
			fixedBlockClass: '--fixed',
		};

		this.options = { ...defaultOptions, ...options };
		this.fixedBlocks = document?.querySelectorAll(`.${this.options.fixedBlockClass}`);
	}

	lock() {
		const scrollWidth = `${window.innerWidth - document.body.offsetWidth}px`;

		document.body.style.overflow = 'hidden';

		if (this.options.scrollFix) {
			document.body.style.paddingRight = scrollWidth;
		}

		if (this.options.scrollFix && this.fixedBlocks.length) {
			this.fixedBlocks.forEach((element) => {
				element.style.paddingRight = scrollWidth;
			});
		}
	}

	unlock() {
		document.body.style.overflow = null;

		if (this.options.scrollFix) {
			document.body.style.paddingRight = null;
		}

		if (this.options.scrollFix && this.fixedBlocks.length) {
			this.fixedBlocks.forEach((element) => {
				element.style.paddingRight = null;
			});
		}
	}
}
