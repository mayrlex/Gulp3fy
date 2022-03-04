/*
Arguments:
	btn:    {string} - Button selector
	area:   {string} - Area selector that contains the button selector

Call:
	const toggle = new Toggler({
		btn: '[data-dropdown-btn]',
		area: '[data-dropdown]',
	});
*/

export default class Toggler {
	constructor(selector) {
		this.selector = selector;
		this.targetBtn = selector.btn;
		this.targetArea = selector.area;
		this.current;

		this.init();
	}

	init() {
		document.addEventListener('click', (event) => {
			const isTargetBtn = event.target.matches(this.targetBtn);
			const isTargetArea = event.target.closest(this.targetArea);

			if (!isTargetBtn && isTargetArea != null) return;

			if (isTargetBtn) {
				this.current = event.target.closest(this.targetBtn);
				this.current.classList.toggle('--show');
			} else {
				this.current = undefined;
			}

			document.querySelectorAll(`${this.targetBtn}.--show`).forEach((item) => {
				if (item === this.current) return;
				item.classList.remove('--show');
			});
		});
	}
}
