/**
 * @param {string} class              - Backdrop class
 * @param {string} activeClass        - Active class
 * @param {string} containerClass          - Parent block for the backdrop element
 * @param {number} transitionDuration - The duration of the transition between showing and hiding the backdrop (The value should match the transition property in css)
 */

export default class Backdrop {
	constructor(options) {
		const defaultOptions = {
			class: 'backdrop',
			activeClass: '--show',
			containerClass: 'body',
			transitionDuration: 300,
		};

		this.options = { ...defaultOptions, ...options };
	}

	add() {
		const containerElement = document.querySelector(this.options.containerClass);
		const backdropElement = document.createElement('div');

		containerElement?.append(backdropElement);
		backdropElement.classList.add(this.options.backdropClass);

		setTimeout(() => backdropElement.classList.add(this.options.activeClass), 1);
	}

	remove() {
		const backdropElement = document.querySelector(`.${this.options.backdropClass}`);

		if (backdropElement) backdropElement.classList.remove(this.options.activeClass);

		setTimeout(() => {
			if (backdropElement) {
				backdropElement.remove();
			}
		}, this.options.transitionDuration);
	}
}
