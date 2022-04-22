import Lock from '../../../scripts/modules/lock.js';

const burger = () => {
	const backdrop = document.querySelector('.header__inner');
	const menu = document.querySelector('.header__nav');
	const target = document.querySelector('.burger');
	const lock = new Lock({});
	const aira = target.getAttribute('aria-expanded') === 'true';

	if (target) {
		target.addEventListener('click', () => {
			backdrop.classList.toggle('--show');
			menu.classList.toggle('--show');
			target.setAttribute('aria-expanded', !aira);
			target.classList.toggle('--show');
			if (target.classList.contains('--show')) lock.lock();
			if (!target.classList.contains('--show')) lock.unlock();
		});
	}
};

export default burger;
