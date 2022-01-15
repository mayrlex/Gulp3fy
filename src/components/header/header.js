import { hideAnim, toggleAnim } from '../../scripts/modules/showHideAnimation.js';

const header = document.querySelector('header');
const main = document.querySelector('main');
const burgerIcon = document.querySelector('.burger__icon');
const burgerDropdown = document.querySelector('[data-burger]');

//* ### Functions ###
//* ################################

// Working with burger dropdown body
const initBurgerDropdownBody = (block, hidden = true) => {
	const buttons = block.querySelectorAll('[data-dropdown-btn]');

	if (buttons.length > 0) {
		buttons.forEach((btn) => {
			// prettier-ignore
			hidden && !btn.classList.contains('--show') ?
				btn.nextElementSibling.hidden = true :
				btn.nextElementSibling.hidden = false;
		});
	}
};

// Sets action accordion for burger dropdowns
const setBurgerDropdownAction = (e) => {
	const el = e.target;

	if (el.hasAttribute('data-dropdown-btn') || el.closest('[data-dropdown-btn]')) {
		// prettier-ignore
		const button = el.hasAttribute('data-dropdown-btn') ? el : el.closest('[data-dropdown-btn]');
		const block = button.closest('[data-burger]');

		if (!block.querySelectorAll('.--slide').length) {
			if (!button.classList.contains('--show')) {
				hideBurgerDropdownsBody(block);
			}

			button.classList.toggle('--show');
			toggleAnim(button.nextElementSibling, 500);
		}

		e.preventDefault();
	}
};

// Hide inactive burger dropdowns
const hideBurgerDropdownsBody = (block) => {
	const activedButton = block.querySelector('[data-dropdown-btn].--show');

	if (activedButton) {
		activedButton.classList.remove('--show');
		hideAnim(activedButton.nextElementSibling, 500);
	}
};

// Initialization burger dropdowns
const initBurgerDropdowns = (block) => {
	initBurgerDropdownBody(block);
	block.addEventListener('click', setBurgerDropdownAction);
};

//* ### Body ###
//* ################################
// If the header is fixed, indent main by the height of the header
main.style.marginTop = `${header.offsetHeight}px`;

// Menu icon
if (burgerIcon) {
	const burgerBody = document.querySelector('.burger__body');
	const menuTitle = document.querySelectorAll('.menu__title');
	const menuSubList = document.querySelectorAll('.menu__sub-list');
	const overlay = document.querySelector('.overlay');

	burgerIcon.addEventListener('click', () => {
		document.body.classList.toggle('--lock');
		burgerIcon.classList.toggle('--show');
		burgerBody.classList.toggle('--show');
		overlay.classList.toggle('--show');

		if (!burgerIcon.classList.contains('--show')) {
			menuTitle.forEach((title) => {
				title.classList.remove('--show');

				menuSubList.forEach((list) => {
					hideAnim(list, 500);
				});
			});
		}
	});
}

// Init burger (Only for max width 992px)
if (burgerDropdown && window.matchMedia('(max-width: 991.98px)').matches) {
	initBurgerDropdowns(burgerDropdown);
}

// Init dropdown (Only for min width 992px)
if (window.matchMedia('(min-width: 991.98px)').matches) {
	document.addEventListener('click', (e) => {
		const isDropdownButton = e.target.matches('[data-dropdown-btn]');
		let currentDropdown;

		if (!isDropdownButton && e.target.closest('[data-dropdown]') != null) return;

		if (isDropdownButton) {
			currentDropdown = e.target.closest('[data-dropdown]');
			currentDropdown.classList.toggle('--show');
		}

		document.querySelectorAll('[data-dropdown].--show').forEach((dropdown) => {
			if (dropdown === currentDropdown) return;
			dropdown.classList.remove('--show');
		});
	});
}
