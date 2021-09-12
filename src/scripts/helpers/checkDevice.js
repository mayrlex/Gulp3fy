// Platforms
const isMobile = {
	Android: () => navigator.userAgent.match(/Android/i),
	BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
	iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
	Opera: () => navigator.userAgent.match(/Opera/i),
	Windows: () => navigator.userAgent.match(/IEMobile/i),

	any: () =>
		isMobile.Android() ||
		isMobile.BlackBerry() ||
		isMobile.iOS() ||
		isMobile.Opera() ||
		isMobile.Windows(),
};

// Check platform
if (isMobile.any()) {
	document.body.classList.add('--mob');

	// const menuArrows = document.querySelectorAll('.menu__arrow');
	// if (menuArrows.length > 0) {
	// 	for (let index = 0; index < menuArrows.length; index++) {
	// 		const menuArrow = menuArrows[index];
	// 		menuArrow.addEventListener('click', (e) => {
	// 			menuArrow.parrentElements.classList.toggle('active');
	// 		});
	// 	}
	// }
} else {
	document.body.classList.add('--pc');

	// const menuArrows = document.querySelectorAll('.arrow');
	// if (menuArrows.length > 0) {
	// 	for (let index = 0; index < menuArrows.length; index++) {
	// 		const menuArrow = menuArrows[index];
	// 		menuArrow.addEventListener('click', (e) => {
	// 			menuArrow.parrentElements.classList.toggle('active');
	// 		});
	// 	}
	// }
}
