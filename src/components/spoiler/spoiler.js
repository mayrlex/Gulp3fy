import ShowHide from '../../scripts/modules/showHide.js';

if (document.querySelectorAll('[data-spoilers]').length) {
	const init = (array, matchMedia = false) => {
		array.forEach((item) => {
			let spoiler = item;

			spoiler = matchMedia ? item.item : item;

			if (matchMedia.matches || !matchMedia) {
				spoiler.classList.add('--init');
				initContent(spoiler);
				spoiler.addEventListener('click', setAction);
			} else {
				spoiler.classList.remove('--init');
				initContent(spoiler, false);
				spoiler.removeEventListener('click', setAction);
			}
		});
	};

	// Init spoiler content
	const initContent = (target, hidden = true) => {
		const btnArray = target.querySelectorAll('[data-spoiler]');

		if (btnArray.length) {
			btnArray.forEach((btn) => {
				if (hidden) {
					btn.removeAttribute('tabindex');

					if (!btn.classList.contains('--show')) {
						btn.nextElementSibling.hidden = true;
					}
				} else {
					btn.setAttribute('tabindex', '-1');
					btn.nextElementSibling.hidden = false;
				}
			});
		}
	};

	// Sets the action to show and hide content
	const setAction = (event) => {
		if (event.target.hasAttribute('data-spoiler') || event.target.closest('[data-spoiler]')) {
			const btn = event.target.hasAttribute('data-spoiler')
				? event.target
				: event.target.closest('[data-spoiler]');
			const container = btn.closest('[data-spoilers]');
			const isAccordion = !!container.hasAttribute('accordion');

			if (!container.querySelectorAll('.--active').length) {
				const showHide = new ShowHide({ target: btn.nextElementSibling });

				// Accordion mode
				if (isAccordion && !btn.classList.contains('--show')) {
					hideSpoilersBody(container);
				}

				btn.classList.toggle('--show');
				showHide.toggle();
			}

			event.preventDefault();
		}
	};

	// Hide inactive spoilers content
	const hideSpoilersBody = (container) => {
		const btnActive = container.querySelector('[data-spoiler].--show');

		if (btnActive) {
			btnActive.classList.remove('--show');
			const showHide = new ShowHide({ target: btnActive.nextElementSibling });
			showHide.hide();
		}
	};

	const spoilerNodes = document.querySelectorAll('[data-spoilers]');

	// Getting an array of spoilers
	const spoilerArray = Array.from(spoilerNodes).filter((item, index, self) => {
		return !item.dataset.spoilers.split(',')[0];
	});

	// Getting an array of spoilers with a media query
	const spoilerArrayMedia = Array.from(spoilerNodes).filter((item, index, self) => {
		return item.dataset.spoilers.split(',')[0];
	});

	// Init spoilers
	if (spoilerArray.length) init(spoilerArray);

	// Init spoilers with media query
	if (spoilerArrayMedia.length) {
		const breakpointsArray = [];

		spoilerArrayMedia.forEach((item) => {
			const params = item.dataset.spoilers;
			const breakpoint = {};
			const paramsArray = params.split(',');

			[breakpoint.value] = [paramsArray[0]];
			[breakpoint.type] = [paramsArray[1] ? paramsArray[1].trim() : 'max'];
			[breakpoint.item] = [item];
			breakpointsArray.push(breakpoint);
		});

		let mediaQueries = breakpointsArray.map((item) => {
			return `(${item.type}-width: ${item.value}px),${item.value},${item.type}`;
		});

		mediaQueries = mediaQueries.filter((item, index, self) => {
			return self.indexOf(item) === index;
		});

		mediaQueries.forEach((breakpoint) => {
			const paramsArray = breakpoint.split(',');
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			const spoilersArrayMedia = breakpointsArray.filter((item) => {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}

				return null;
			});

			// Change on resolution change
			matchMedia.addEventListener('change', () => {
				init(spoilersArrayMedia, matchMedia);
			});

			init(spoilersArrayMedia, matchMedia);
		});
	}
}
