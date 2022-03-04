/*
Arguments:
	selector    {object}
		btn:    {string} - Button selector
		area:   {string} - Area selector that contains the button selector
	activeClass {string} - Active class selector (Default: '--show')

Call:
	const toggle = new Toggler({
		btn: '[data-dropdown-btn]',
		area: '[data-dropdown]',
	});
*/

export default class Toggler {
	constructor(selector, activeClass = '--show') {
		this.selector = selector;
		this.targetBtn = selector.btn;
		this.targetArea = selector.area;
		this.activeClass = activeClass;
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
				this.current.classList.toggle(this.activeClass);
			} else {
				this.current = undefined;
			}

			document.querySelectorAll(`${this.targetBtn}.${this.activeClass}`).forEach((item) => {
				if (item === this.current) return;
				item.classList.remove(this.activeClass);
			});
		});
	}
}
