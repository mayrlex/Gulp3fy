import throttle from '../modules/throttle.js';

/**
 * @param {string} selector       - Dropdown selector
 * @param {string} toggleSelector - Dropdown button toggle selector
 * @param {string} activeClass    - Active class
 * @param {number} throttle       - Throttle delay
 */

const dropdown = options => {
	const defaultOptions = {
		selector: '.dropdown',
		toggleSelector: '.dropdown__toggle',
		activeClass: '--show',
		throttle: 100,
	};

	const option = { ...defaultOptions, ...options };

	document.addEventListener(
		'click',
		throttle(({ target }) => {
			const isToggle = target.matches(option.toggleSelector);
			const shownDropdowns = document.querySelectorAll(
				`${option.selector}.${option.activeClass}`
			);

			let current;

			if (!isToggle && target.closest(option.selector)) return;

			if (isToggle) {
				current = target.closest(option.selector);
				current?.classList.toggle(option.activeClass);
			}

			shownDropdowns.forEach(element => {
				if (element === current) return;

				element.classList.remove(option.activeClass);
			});
		}, option.throttle)
	);
};

export default dropdown;
