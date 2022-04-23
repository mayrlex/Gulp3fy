// Check platform
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

const checkDevice = () =>
	isMobile.any() ? document.body.classList.add('--mob') : document.body.classList.add('--desk');

export default checkDevice;
export { isMobile };
