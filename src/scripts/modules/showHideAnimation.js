const showAnim = (target, duration = 500) => {
	const t = target;
	if (!target.classList.contains('--slide')) {
		t.classList.add('--slide');

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
			t.classList.remove('--slide');
		}, duration);
	}
};

const hideAnim = (target, duration = 500) => {
	const t = target;
	if (!target.classList.contains('--slide')) {
		t.classList.add('--slide');
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
			t.classList.remove('--slide');
		}, duration);
	}
};

const toggleAnim = (target, duration = 500) => {
	if (target.hidden) {
		return showAnim(target, duration);
	}
	return hideAnim(target, duration);
};

export { showAnim };
export { hideAnim };
export { toggleAnim };
