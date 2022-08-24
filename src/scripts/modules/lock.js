/**
 * @param {string} scrollFix        - Sets padding-right for content when scroll is blocked
 * @param {string} fixedBlocksClass - Sets padding-right for fixed blocks with specified class
 */

export default class Lock {
	constructor(options) {
		const defaultOptions = {
			scrollFix: true,
			fixedBlocksClass: '.--fixed',
		};

		this.option = { ...defaultOptions, ...options };
		this.body = document.body;
		this.fixedBlocks = document.querySelectorAll(this.option.fixedBlocksClass);
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
