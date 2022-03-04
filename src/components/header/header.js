import Toggler from '../../scripts/modules/toggler.js';
// import * as smoothScroll from '../../scripts/modules/smoothScroll.js';

if (document.querySelector('header')) {
	const header = document.querySelector('header');
	const main = document.querySelector('main');
	const burger = document.querySelector('.burger');
	const dropdown = document.querySelectorAll('.menu__item[data-dropdown]');
	const hasFixed = window.getComputedStyle(header).position === 'fixed';

	// If the header is fixed, indent main by the height of the header
	hasFixed ? (main.style.marginTop = `${header.offsetHeight}px`) : null;

	// Burger menu
	if (burger) {
		const menu = document.querySelector('.menu');
		const menuLink = document.querySelectorAll('.menu__link');

		burger.addEventListener('click', () => {
			document.body.classList.toggle('--lock');
			burger.classList.toggle('--show');
			menu.classList.toggle('--show');

			// Hide all opened dropdown lists when closing burger menu
			if (!burger.classList.contains('--show')) {
				menuLink.forEach((title) => {
					title.classList.remove('--show');
				});
			}
		});
	}

	// Dropdown list
	if (dropdown.length > 0) {
		const disabledLinks = document.querySelectorAll('.menu__sub-link.--disabled');
		const toggle = new Toggler({ btn: '[data-dropdown-btn]', area: '[data-dropdown]' });

		// If there is a disabled item
		if (disabledLinks.length > 0) {
			disabledLinks.forEach((link) => {
				link.setAttribute('tabindex', '-1');
			});
		}
	}
}
