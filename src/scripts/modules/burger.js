const burger = () => {
	const backdrop = document.querySelector('.header__inner');
	const menu = document.querySelector('.header__nav');
	const target = document.querySelector('.burger');

	if (target) {
		target.addEventListener('click', () => {
			document.body.classList.toggle('--lock');
			backdrop.classList.toggle('--show');
			menu.classList.toggle('--show');
			target.classList.toggle('--show');
		});
	}
};

export default burger;
