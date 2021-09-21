const menuLinkAnchor = document.querySelectorAll('.menu__link[data-anchor]');
const menuIcon = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');

function onMenuLinkClick(e) {
	const menuLink = e.target;

	if (menuLink.dataset.anchor && document.querySelector(menuLink.dataset.anchor)) {
		const anchorBlock = document.querySelector(menuLink.dataset.anchor);
		const anchorBlockValue =
			anchorBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;

		if (menuIcon.classList.contains('--active')) {
			document.body.classList.remove('--lock');
			menuIcon.classList.remove('--active');
			menuBody.classList.remove('--active');
		}

		window.scrollTo({
			top: anchorBlockValue,
			behavior: 'smooth',
		});

		e.preventDefault();
	}
}

if (menuLinkAnchor.length > 0) {
	menuLinkAnchor.forEach((e) => {
		e.addEventListener('click', onMenuLinkClick);
	});
}
