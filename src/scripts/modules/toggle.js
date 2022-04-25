/*
Arguments:
	trigger:     {string} - Trigger target
	container:   {string} - Сontainer containing trigger and content
	toggleClass: {string} - Trigger modifier

Call:
	const toggle = new Toggler({
		trigger:     '[data-dropdown-btn]',
		container:   '[data-dropdown]',
		toggleClass: '--active',
	});
*/

const defaultOptions = {
	toggleClass: '--show',
};

export default class Toggle {
	constructor(selector) {
		this.options = { ...defaultOptions, ...selector };
		this.init();
	}

	init() {
		document.addEventListener('click', (event) => {
			const isTrigger = event.target.matches(this.options.trigger);
			const isContainer = event.target.closest(this.options.container);
			let current;

			if (!isTrigger && isContainer != null) return;

			if (isTrigger) {
				current = event.target.closest(this.options.trigger);
				current.classList.toggle(this.options.toggleClass);
			} else {
				current = undefined;
			}

			document
				.querySelectorAll(`${this.options.trigger}.${this.options.toggleClass}`)
				.forEach((item) => {
					if (item === current) return;
					item.classList.remove(this.options.toggleClass);
				});
		});
	}
}
