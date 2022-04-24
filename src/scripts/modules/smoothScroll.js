const smoothScroll = (burgerToggleClass = '--show') => {
	const anchor = document.querySelectorAll('.menu__link[data-anchor]');
	const menu = document.querySelector('.header__nav');
	const burger = document.querySelector('.burger');
	const header = document.querySelector('header');
	const backdrop = document.querySelector('.header__inner');

	if (anchor.length) {
		const init = (event) => {
			const target = document.querySelector(event.target.dataset.anchor);

			if (!target) {
				console.error(`Error: Anchor '${event.target.dataset.anchor}' not found`);
				return;
			}

			if (burger.classList.contains(burgerToggleClass)) {
				document.body.classList.remove('--lock');
				menu.classList.remove(burgerToggleClass);
				backdrop.classList.remove(burgerToggleClass);
				burger.classList.remove(burgerToggleClass);
			}

			window.scrollTo({
				top: target.getBoundingClientRect().top + scrollY - header.offsetHeight,
				behavior: 'smooth',
			});
		};

		anchor.forEach((event) => event.addEventListener('click', init));
	}
};

export default smoothScroll;
