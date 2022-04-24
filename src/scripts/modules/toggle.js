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

export default class Toggle {
	constructor(selector) {
		this.targetBtn = selector.btn;
		this.targetArea = selector.area;
		this.toggleClass = selector.toggleClass || '--show';
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
				this.current.classList.toggle(this.toggleClass);
			} else {
				this.current = undefined;
			}

			document.querySelectorAll(`${this.targetBtn}.${this.toggleClass}`).forEach((item) => {
				if (item === this.current) return;
				item.classList.remove(this.toggleClass);
			});
		});
	}
}
