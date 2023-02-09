const userAgentAndroid = /android/i.test(navigator.userAgent);
const userAgentiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
const userAgentWindows = /Windows/.test(navigator.userAgent);

/**
 * @param {boolean} bodyClass    - Add device class in <body>
 * @param {string}  mobileClass  - Mobile class
 * @param {string}  desktopClass - Desktop class
 */

export function isMobile(options) {
	const defaultOptions = {
		bodyClass: false,
		mobileClass: '--mob',
		desktopClass: '--desk',
	};

	const option = { ...defaultOptions, ...options };

	if (userAgentAndroid || userAgentiOS) {
		if (option.bodyClass) {
			document.body.classList.add(option.mobileClass);
		}

		return true;
	}

	if (option.bodyClass) {
		document.body.classList.add(option.desktopClass);
	}

	return false;
}

export function getOS() {
	if (userAgentAndroid) return 'Android';
	if (userAgentiOS) return 'iOS';
	if (userAgentWindows) return 'Windows';

	return 'unknown';
}
