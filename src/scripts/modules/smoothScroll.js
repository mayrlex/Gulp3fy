if (document.querySelectorAll('.menu__link[data-anchor]').length > 0) {
	const anchor = document.querySelectorAll('.menu__link[data-anchor]');
	const header = document.querySelector('header');
	const burger = document.querySelector('.burger');
	const menu = document.querySelector('.menu');

	const smoothScroll = (event) => {
		const selector = document.querySelector(event.target.dataset.anchor);
		const scrollTo = selector.getBoundingClientRect().top + scrollY - header.offsetHeight;

		if (burger.classList.contains('--show')) {
			document.body.classList.remove('--lock');
			menu.classList.remove('--show');
			burger.classList.remove('--show');
		}

		window.scrollTo({
			top: scrollTo,
			behavior: 'smooth',
		});
	};

	anchor.forEach((event) => event.addEventListener('click', smoothScroll));
}
