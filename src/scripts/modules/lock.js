/*
Options:
	scrollFix:        {string} - Sets padding-right for content when scroll is blocked
	fixedBlocksClass: {string} - Sets padding-right for fixed blocks with specified class

Call:
	import Lock from '../../scripts/modules/lock.js';

	const lock = new Lock({
		scrollFix: false,
	});

	target.lock.lock();
	target.lock.unlock();
*/

const defaultOptions = {
	scrollFix: true,
	fixedBlocksClass: '.--isFixed',
};

export default class Lock {
	constructor(options) {
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
