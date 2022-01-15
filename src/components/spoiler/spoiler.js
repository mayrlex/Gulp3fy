import { hideAnim, toggleAnim } from '../../scripts/modules/showHideAnimation.js';

// Get all spoiler containers, includes attribute [data-spoilers]
const spoilersArray = document.querySelectorAll('[data-spoilers]');

//* ### Functions ###
//* ################################

// Initialization
const initSpoilers = (block, matchMedia = false) => {
	block.forEach((spoiler) => {
		let initItem = spoiler;
		initItem = matchMedia ? spoiler.item : spoiler;

		if (matchMedia.matches || !matchMedia) {
			initItem.classList.add('--init');
			initSpoilerBody(initItem);
			initItem.addEventListener('click', setSpoilerAction);
		} else {
			initItem.classList.remove('--init');
			initSpoilerBody(initItem, false);
			initItem.removeEventListener('click', setSpoilerAction);
		}
	});
};

// Working with content
const initSpoilerBody = (block, hidden = true) => {
	const spoilerTitles = block.querySelectorAll('[data-spoiler]');

	if (spoilerTitles.length > 0) {
		spoilerTitles.forEach((title) => {
			if (hidden) {
				title.removeAttribute('tabindex');

				if (!title.classList.contains('--show')) {
					title.nextElementSibling.hidden = true;
				}
			} else {
				title.setAttribute('tabindex', '-1');
				title.nextElementSibling.hidden = false;
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

		if (!spoilersBlock.querySelectorAll('.--slide').length) {
			if (oneSpoiler && !spoilerTitle.classList.contains('--show')) {
				hideSpoilersBody(spoilersBlock);
			}

			spoilerTitle.classList.toggle('--show');
			toggleAnim(spoilerTitle.nextElementSibling, 500);
		}

		e.preventDefault();
	}
};

// Hide inactive spoilers content
const hideSpoilersBody = (spoilersBlock) => {
	const spoilerActiveTitle = spoilersBlock.querySelector('[data-spoiler].--show');

	if (spoilerActiveTitle) {
		spoilerActiveTitle.classList.remove('--show');
		hideAnim(spoilerActiveTitle.nextElementSibling, 500);
	}
};

//* ### Body ###
//* ################################
if (spoilersArray.length > 0) {
	// Getting the default spoilers
	const spoilersDefault = Array.from(spoilersArray).filter((item, index, self) => {
		return !item.dataset.spoilers.split(',')[0];
	});

	// Initializing default spoilers
	if (spoilersDefault.length > 0) {
		initSpoilers(spoilersDefault);
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
			const spoilersArrayMedia = breakpointsArray.filter((item) => {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}

				return null;
			});

			// Change on resolution change
			matchMedia.addEventListener('change', () => {
				initSpoilers(spoilersArrayMedia, matchMedia);
			});

			initSpoilers(spoilersArrayMedia, matchMedia);
		});
	}
}
