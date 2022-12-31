export default class Backdrop {
	constructor(options) {
		const defaultOptions = {
			activeClass: '--show',
			backdropSelector: '.backdrop',
			parrentSelector: 'body',
			transitionDuration: 300,
		};

		this.options = { ...defaultOptions, ...options };
	}

	show() {
		const parrent = document.querySelector(this.options.parrentSelector);
		const backdropElement = document.createElement('div');

		parrent.append(backdropElement);
		backdropElement.classList.add(this.options.backdropSelector.substring(1));

		setTimeout(() => {
			backdropElement.classList.add(this.options.activeClass);
		}, 1);
	}

	hide() {
		const backdropElement = document.querySelector(this.options.backdropSelector);

		backdropElement.classList.remove(this.options.activeClass);

		setTimeout(() => {
			backdropElement.remove();
		}, this.options.transitionDuration);
	}
}
