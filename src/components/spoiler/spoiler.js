//* ### Functions ###
//* ################################

// Initialization
const initSpoilers = (initSpoilersArray, matchMedia = false) => {
	initSpoilersArray.forEach((spoilersBlock) => {
		let initItem = spoilersBlock;
		initItem = matchMedia ? spoilersBlock.item : spoilersBlock;

		if (matchMedia.matches || !matchMedia) {
			initItem.classList.add('_init');
			initSpoilerBody(initItem);
			initItem.addEventListener('click', setSpoilerAction);
		} else {
			initItem.classList.remove('_init');
			initSpoilerBody(initItem, false);
			initItem.removeEventListener('click', setSpoilerAction);
		}
	});
};

// Working with content
const initSpoilerBody = (spoilersBlock, hideSpoilerBody = true) => {
	const spoilerTitles = spoilersBlock.querySelectorAll('[data-spoiler]');

	if (spoilerTitles.length > 0) {
		spoilerTitles.forEach((spoilerTitle) => {
			const titleItem = spoilerTitle;

			if (hideSpoilerBody) {
				titleItem.removeAttribute('tabindex');

				if (!titleItem.classList.contains('_active')) {
					titleItem.nextElementSibling.hidden = true;
				}
			} else {
				titleItem.setAttribute('tabindex', '-1');
				titleItem.nextElementSibling.hidden = false;
			}
		});
	}
};

// Sets action accordion for spoilers
const setSpoilerAction = (e) => {
	const el = e.target;

	if (el.hasAttribute('data-spoiler') || el.closest('[data-spoiler]')) {
		const spoilerTitle = el.hasAttribute('data-spoiler') ? el : el.closest('[data-spoiler]');
		const spoilersBlock = spoilerTitle.closest('[data-spoilers]');
		const oneSpoiler = !!spoilersBlock.hasAttribute('accordion');

		if (!spoilersBlock.querySelectorAll('._slide').length) {
			if (oneSpoiler && !spoilerTitle.classList.contains('_active')) {
				hideSpoilersBody(spoilersBlock);
			}

			spoilerTitle.classList.toggle('_active');
			slideToggle(spoilerTitle.nextElementSibling, 500);
		}

		e.preventDefault();
	}
};

// Hide inactive spoilers content
const hideSpoilersBody = (spoilersBlock) => {
	const spoilerActiveTitle = spoilersBlock.querySelector('[data-spoiler]._active');

	if (spoilerActiveTitle) {
		spoilerActiveTitle.classList.remove('_active');
		slideUp(spoilerActiveTitle.nextElementSibling, 500);
	}
};

//* ### Animations ###
let slideUp = (target, duration = 500) => {
	const t = target;
	if (!target.classList.contains('_slide')) {
		t.classList.add('_slide');
		t.style.transitionProperty = 'height, margin, padding';
		t.style.transitionDuration = `${duration}ms`;
		t.style.height = `${t.offsetHeight}px`;
		t.offsetHeight;
		t.style.overflow = 'hidden';
		t.style.height = 0;
		t.style.paddingTop = 0;
		t.style.paddingBottom = 0;
		t.style.marginTop = 0;
		t.style.marginBottom = 0;
		window.setTimeout(() => {
			t.hidden = true;
			t.style.removeProperty('height');
			t.style.removeProperty('padding-top');
			t.style.removeProperty('padding-bottom');
			t.style.removeProperty('margin-top');
			t.style.removeProperty('margin-bottom');
			t.style.removeProperty('overflow');
			t.style.removeProperty('transition-duration');
			t.style.removeProperty('transition-property');
			t.classList.remove('_slide');
		}, duration);
	}
};

const slideDown = (target, duration = 500) => {
	const t = target;
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');

		if (target.hidden) {
			t.hidden = false;
		}

		const height = target.offsetHeight;

		t.style.overflow = 'hidden';
		t.style.height = 0;
		t.style.paddingTop = 0;
		t.style.paddingBottom = 0;
		t.style.marginTop = 0;
		t.style.marginBottom = 0;
		t.offsetHeight;
		t.style.transitionProperty = 'height, margin, padding';
		t.style.transitionDuration = `${duration}ms`;
		t.style.height = `${height}px`;
		t.style.removeProperty('padding-top');
		t.style.removeProperty('padding-bottom');
		t.style.removeProperty('margin-top');
		t.style.removeProperty('margin-bottom');

		window.setTimeout(() => {
			t.style.removeProperty('height');
			t.style.removeProperty('overflow');
			t.style.removeProperty('transition-duration');
			t.style.removeProperty('transition-property');
			t.classList.remove('_slide');
		}, duration);
	}
};

let slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return slideDown(target, duration);
	}
	return slideUp(target, duration);
};
//* ################################

// Get all spoiler containers, includes attribute [data-spoilers]
const spoilersArray = document.querySelectorAll('[data-spoilers]');

//* ### Body ###
//* ################################
if (spoilersArray.length > 0) {
	// Getting the default spoilers
	const spoilersRegular = Array.from(spoilersArray).filter((item, index, self) => {
		return !item.dataset.spoilers.split(',')[0];
	});

	// Initializing default spoilers
	if (spoilersRegular.length > 0) {
		initSpoilers(spoilersRegular);
	}

	// Getting spoilers from media queriesasm
	const spoilersMedia = Array.from(spoilersArray).filter((item, index, self) => {
		return item.dataset.spoilers.split(',')[0];
	});

	// Initializing spoilers from media queriesasm
	if (spoilersMedia.length > 0) {
		const breakpointsArray = [];

		spoilersMedia.forEach((item) => {
			const params = item.dataset.spoilers;
			const breakpoint = {};
			const paramsArray = params.split(',');

			[breakpoint.value] = [paramsArray[0]];
			[breakpoint.type] = [paramsArray[1] ? paramsArray[1].trim() : 'max'];
			[breakpoint.item] = [item];
			breakpointsArray.push(breakpoint);
		});

		// Getting unique breakpoints
		let mediaQueries = breakpointsArray.map((item) => {
			return `(${item.type}-width: ${item.value}px),${item.value},${item.type}`;
		});

		mediaQueries = mediaQueries.filter((item, index, self) => {
			return self.indexOf(item) === index;
		});

		// Working with every breakpoint
		mediaQueries.forEach((breakpoint) => {
			const paramsArray = breakpoint.split(',');
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			// Objects with suitable conditions
			const spoilersArrayFn = breakpointsArray.filter((item) => {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}

				return null;
			});

			// Change on resolution change
			matchMedia.addEventListener('change', () => {
				initSpoilers(spoilersArrayFn, matchMedia);
			});

			initSpoilers(spoilersArrayFn, matchMedia);
		});
	}
}
