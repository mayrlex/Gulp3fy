import burger from '../../scripts/modules/burger.js';
import Toggle from '../../scripts/modules/toggle.js';
// import smoothScroll from '../../scripts/modules/smoothScroll.js';

if (document.querySelector('header')) {
	const header = document.querySelector('header');
	const main = document.querySelector('main');

	// Modules
	// smoothScroll();
	burger();

	// Sets the margin-top for main if the header is fixed
	window.getComputedStyle(header).position === 'fixed'
		? (main.style.marginTop = `${header.offsetHeight}px`)
		: null;

	// Dropdown list
	if (document.querySelectorAll('.menu__item[data-dropdown]').length) {
		const disabledLinks = document.querySelectorAll('.menu__sub-link.--disabled');

		// Dropdown toggle
		const dropdown = new Toggle({
			btn: '[data-dropdown-btn]',
			area: '[data-dropdown]',
		});

		// If there is a disabled item
		if (disabledLinks.length) {
			disabledLinks.forEach((link) => {
				link.setAttribute('tabindex', '-1');
			});
		}
	}
}
