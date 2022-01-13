import { hideAnim, toggleAnim } from '../../scripts/modules/showHideAnimation.js';

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
			toggleAnim(spoilerTitle.nextElementSibling, 500);
		}

		e.preventDefault();
	}
};

// Hide inactive spoilers content
const hideSpoilersBody = (spoilersBlock) => {
	const spoilerActiveTitle = spoilersBlock.querySelector('[data-spoiler]._active');

	if (spoilerActiveTitle) {
		spoilerActiveTitle.classList.remove('_active');
		hideAnim(spoilerActiveTitle.nextElementSibling, 500);
	}
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
