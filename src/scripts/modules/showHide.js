/**
 * @param {string} target      - Target
 * @param {string} duration    - Animation duration
 * @param {string} activeClass - Active class
 *
 * @method show()   - Sets the expand animation
 * @method hide()   - Sets the collapse animation
 * @method toggle() - Toggles between show() and hide() methods
 */

export default class ShowHide {
	constructor(options) {
		const defaultOptions = {
			activeClass: '--active',
			duration: 500,
		};

		this.options = { ...defaultOptions, ...options };
		this.target = options.target;
	}

	show() {
		if (!this.target.classList.contains(this.activeClass)) {
			this.target.classList.add(this.activeClass);

			if (this.target.hidden) {
				this.target.hidden = false;
			}

			const height = this.target.offsetHeight;

			this.target.style.overflow = 'hidden';
			this.target.style.height = 0;
			this.target.style.paddingTop = 0;
			this.target.style.paddingBottom = 0;
			this.target.style.marginTop = 0;
			this.target.style.marginBottom = 0;
			this.target.offsetHeight;
			this.target.style.transitionProperty = 'height, margin, padding';
			this.target.style.transitionDuration = `${this.options.duration}ms`;
			this.target.style.height = `${height}px`;
			this.target.style.removeProperty('padding-top');
			this.target.style.removeProperty('padding-bottom');
			this.target.style.removeProperty('margin-top');
			this.target.style.removeProperty('margin-bottom');

			window.setTimeout(() => {
				this.target.style.removeProperty('height');
				this.target.style.removeProperty('overflow');
				this.target.style.removeProperty('transition-duration');
				this.target.style.removeProperty('transition-property');
				this.target.classList.remove(this.options.activeClass);
			}, this.options.duration);
		}
	}

	hide() {
		if (!this.target.classList.contains(this.activeClass)) {
			this.target.classList.add(this.activeClass);
			this.target.style.transitionProperty = 'height, margin, padding';
			this.target.style.transitionDuration = `${this.duration}ms`;
			this.target.style.height = `${this.target.offsetHeight}px`;
			this.target.offsetHeight;
			this.target.style.overflow = 'hidden';
			this.target.style.height = 0;
			this.target.style.paddingTop = 0;
			this.target.style.paddingBottom = 0;
			this.target.style.marginTop = 0;
			this.target.style.marginBottom = 0;

			window.setTimeout(() => {
				this.target.hidden = true;
				this.target.style.removeProperty('height');
				this.target.style.removeProperty('padding-top');
				this.target.style.removeProperty('padding-bottom');
				this.target.style.removeProperty('margin-top');
				this.target.style.removeProperty('margin-bottom');
				this.target.style.removeProperty('overflow');
				this.target.style.removeProperty('transition-duration');
				this.target.style.removeProperty('transition-property');
				this.target.classList.remove(this.activeClass);
			}, this.duration);
		}
	}

	toggle() {
		if (this.target.hidden) {
			return this.show(this.target, this.duration);
		}

		return this.hide(this.target, this.duration);
	}
}
