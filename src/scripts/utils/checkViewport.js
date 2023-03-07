export const isMobile = (debug = false) => {
	if (window.innerWidth < 768) {
		if (debug) console.info('checkViewport: Mobile');

		return true;
	}

	return false;
};

export const isTablet = (debug = false) => {
	if (window.innerWidth >= 769 && window.innerWidth <= 1024) {
		if (debug) console.info('checkViewport: Tablet');

		return true;
	}

	return false;
};

export const isDesktop = (debug = false) => {
	if (window.innerWidth > 1025) {
		if (debug) console.info('checkViewport: Desktop');

		return true;
	}

	return false;
};
