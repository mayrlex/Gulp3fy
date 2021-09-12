if (document.querySelector('.theme__switch')) {
	const switchBox = document.querySelector('.theme__switch-box');

	(function () {
		if (localStorage.getItem('theme') === 'dark') {
			document.documentElement.setAttribute('data-theme', 'dark');
			switchBox.checked = true;
		} else {
			document.documentElement.setAttribute('data-theme', 'light');
			switchBox.checked = false;
		}
	}()); // prettier-ignore

	switchBox.addEventListener('change', (e) => {
		if (e.target.checked) {
			document.documentElement.setAttribute('data-theme', 'dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.setAttribute('data-theme', 'light');
			localStorage.setItem('theme', 'ligth');
		}
	});
}
