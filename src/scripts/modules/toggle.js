import throttle from './throttle.js';

/*
Arguments:
	trigger:     {string} - Trigger target
	parrent:     {string} - Сontainer containing trigger and content
	activeClass: {string} - Trigger modifier
	activeItems: {object} - Set active class to arbitrary number of elements
	throttle:    {number} - Set throttle
Call:
	const toggle = new Toggle({
		trigger:     '.dropdown__toggle',
		parrent:     '.dropdown',
		activeClass: '--active',
		activeItems: ['.dropdown__menu'],
		throttle: 100,
	});
*/

export default class Toggle {
	constructor(options) {
		const defaultOptions = {
			activeClass: '--show',
			activeItems: [],
			throttle: 0,
		};

		this.options = { ...defaultOptions, ...options };
		this.check();
		this.init();
	}

	check() {
		if (!document.querySelector(this.options.trigger))
			console.warn(`[Toggle] Toggle trigger '${this.options.trigger}' not found`);

		if (!document.querySelector(this.options.parrent))
			console.warn(`[Toggle] Parrent '${this.options.parrent}' not found`);
	}

	init() {
		const existsTrigger = document.querySelector(this.options.trigger);
		const existsParrent = document.querySelector(this.options.parrent);

		if (existsTrigger && existsParrent) {
			document.addEventListener(
				'click',
				throttle((event) => {
					const isTrigger = event.target.matches(this.options.trigger);
					const isParrent = event.target.closest(this.options.parrent);
					const activeItemsArray = [this.options.trigger, ...this.options.activeItems];
					const activeItems = activeItemsArray.filter((element, index) => {
						return activeItemsArray.indexOf(element) === index;
					});

					if (!isTrigger && isParrent) return;

					if (isTrigger) {
						activeItems.forEach((item) =>
							document.querySelector(item).classList.toggle(this.options.activeClass)
						);
					}

					if (event.target.closest(this.options.parrent)) return;

					activeItems.forEach((item) =>
						document.querySelector(item).classList.remove(this.options.activeClass)
					);
				}, this.options.throttle)
			);
		}
	}
}
