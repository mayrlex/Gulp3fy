import { hideAnim, toggleAnim } from '../../scripts/modules/showHideAnimation.js';
import { isMobile } from '../../scripts/helpers/checkDevice.js';

//* ### Functions ###
//* ################################

// Working with burger dropdown body
const initBurgerDropdownBody = (block, hidden = true) => {
	const buttons = block.querySelectorAll('[data-dropdown-btn]');

	if (buttons.length > 0) {
		buttons.forEach((btn) => {
			if (hidden) {
				btn.removeAttribute('tabindex');

				if (!btn.classList.contains('--show')) {
					btn.nextElementSibling.hidden = true;
				}
			} else {
				btn.setAttribute('tabindex', '-1');
				btn.nextElementSibling.hidden = false;
			}
		});
	}
};

// Sets action accordion for burger dropdowns
const setBurgerDropdownAction = (e) => {
	const el = e.target;
	// console.log(e);

	if (el.hasAttribute('data-dropdown-btn') || el.closest('[data-dropdown-btn]')) {
		// prettier-ignore
		const button = el.hasAttribute('data-dropdown-btn') ? el : el.closest('[data-dropdown-btn]');
		const block = button.closest('[data-burger]');
		const isAccordion = !!block.hasAttribute('accordion');

		// if (!block.querySelectorAll('.--slide').length) {
		if (isAccordion && !button.classList.contains('--show')) {
			hideBurgerDropdownsBody(block);
		}

		button.classList.toggle('--show');
		toggleAnim(button.nextElementSibling, 500);
		// }

		e.preventDefault();
	}
};

// Hide inactive burger dropdowns
const hideBurgerDropdownsBody = (block) => {
	const activeButton = block.querySelector('[data-dropdown-btn].--show');

	if (activeButton) {
		activeButton.classList.remove('--show');
		hideAnim(activeButton.nextElementSibling, 500);
	}
};

// // Initialization burger dropdowns
// const initBurgerDropdowns = (block) => {
// 	initBurgerDropdownBody(block);
// 	block.addEventListener('click', setBurgerDropdownAction);
// };
//* ################################

const menuIcon = document.querySelector('.burger__icon');
const burgerDropdownsArray = document.querySelector('[data-burger]');

//* ### Body ###
//* ################################

// Menu icon
if (menuIcon) {
	const burgerBody = document.querySelector('.burger__body');
	const menuTitle = document.querySelectorAll('.menu__title');
	const menuSubList = document.querySelectorAll('.menu__sub-list');
	const overlay = document.querySelector('.overlay');

	menuIcon.addEventListener('click', (e) => {
		document.body.classList.toggle('--lock');
		menuIcon.classList.toggle('--show');
		burgerBody.classList.toggle('--show');
		overlay.classList.toggle('--show');

		if (!menuIcon.classList.contains('--show')) {
			menuTitle.forEach((item) => {
				item.classList.remove('--show');

				menuSubList.forEach((bItem) => {
					hideAnim(bItem, 500);
				});
			});
		}
	});
}

// Initialization burger dropdowns
// const initBurgerDropdowns = (block) => {
// 	initBurgerDropdownBody(block);
// 	block.addEventListener('click', setBurgerDropdownAction);
// };

// Init burger (Only for max width 992px)
// if (burgerDropdownsArray && window.matchMedia('(max-width: 991.98px)').matches) {
// 	initBurgerDropdowns(burgerDropdownsArray);
// }

document.addEventListener('click', (e) => {
	const isDropdownButton = e.target.matches('[data-dropdown-btn]');

	if (!isDropdownButton && e.target.closest('[data-dropdown]') != null) return;

	let currentDropdown;
	if (isDropdownButton) {
		currentDropdown = e.target.closest('[data-dropdown]');
		currentDropdown.classList.toggle('--show');
	}

	if (
		burgerDropdownsArray &&
		isMobile.any() &&
		window.matchMedia('(max-width: 991.98px)').matches
	) {
		initBurgerDropdownBody(burgerDropdownsArray);
		setBurgerDropdownAction(e);
	}

	document.querySelectorAll('[data-dropdown].--show').forEach((dropdown) => {
		if (dropdown === currentDropdown) return;
		dropdown.classList.remove('--show');
	});

	document.querySelectorAll('[data-dropdown-btn].--show').forEach((dropdownBtn) => {
		if (dropdownBtn === currentDropdown) return;
		// dropdownBtn.classList.remove('--show');
		hideAnim(dropdownBtn.nextElementSibling, 500);
	});
});
