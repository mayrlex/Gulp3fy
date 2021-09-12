// Resize header on scroll > 100px
if (document.querySelector('.header')) {
	window.addEventListener('scroll', () => {
		const header = document.querySelector('.header');
		const brand = document.querySelector('.brand');

		if (window.pageYOffset > 100) {
			header.classList.add('--scroll');
			brand.classList.add('--scroll');
		} else {
			header.classList.remove('--scroll');
			brand.classList.remove('--scroll');
		}
	});
}
