import throttle from '../modules/throttle.js';

/**
 * @param {number} delay - Throttle delay
 */

const dropdown = (delay) => {
	document.addEventListener(
		'click',
		throttle((event) => {
			const isToggle = event.target.matches('.dropdown__toggle');
			const activeElements = document.querySelectorAll(`.dropdown.--show`);
			let current;

			if (!isToggle && event.target.closest('.dropdown')) return;

			if (isToggle) {
				current = event.target.closest('.dropdown');
				current.classList.toggle('--show');
			}

			activeElements.forEach((element) => {
				if (element === current) return;

				element.classList.remove('--show');
			});
		}, delay)
	);
};

export default dropdown;
