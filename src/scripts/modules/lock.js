/*
Options:
	scrollOffset:     {string} - Sets padding-right for content when scroll is blocked    [Default: true]
	fixedBlocksClass: {string} - Sets padding-right for fixed blocks with specified class [Defaul: '.--isFixed']

Call:
	import Lock from '../../scripts/modules/lock.js';

	const lock = new Lock({
		scrollOffset: false,
	});

	target.lock.lock();
	target.lock.unlock();
*/

export default class Lock {
	constructor({ scrollOffset = true, fixedBlocksClass = '.--isFixed' }) {
		this.body = document.body;
		this.fixedBlocks = document.querySelectorAll(fixedBlocksClass);
		this.scrollWidth = `${window.innerWidth - document.body.offsetWidth}px`;
		this.scrollOffset = scrollOffset;
	}

	lock() {
		this.body.classList.add('--lock');

		if (this.scrollOffset) {
			this.body.style.paddingRight = this.scrollWidth;

			this.fixedBlocks.forEach((element) => {
				element.style.paddingRight = this.scrollWidth;
			});
		}
	}

	unlock() {
		this.body.classList.remove('--lock');

		if (this.scrollOffset) {
			this.body.style.paddingRight = null;
			this.fixedBlocks.forEach((element) => {
				element.style.paddingRight = null;
			});
		}
	}
}
