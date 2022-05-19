/**
 * @param {string}  target      - Tab id
 * @param {object}  isChanged()  - Funtion triggired on change
 * @param {string}  switchTabs() - Set default active tab
 */

export default class Tabs {
	constructor(options) {
		const defaultOptions = {
			isChanged: () => {},
		};
		this.options = { ...defaultOptions, ...options };
		this.tab = document.querySelector(`[data-tab="${this.options.target}"]`);

		if (this.tab) {
			this.tabMenu = this.tab.querySelector('.tabs__header');
			this.tabButtons = this.tabMenu.querySelectorAll('.tabs__btn');
			this.tabContent = this.tab.querySelectorAll('.tabs__content');
		} else {
			console.error('selector "data-tab" does not exist!');
			return;
		}

		this.check();
		this.init();
		this.events();
	}

	check() {
		if (document.querySelectorAll(`[data-tab="${this.options.target}"]`).length > 1) {
			console.error('The value of the "data-tab" attribute must be unique!');
			return;
		}

		if (this.tabButtons.length !== this.tabContent.length) {
			console.error('The number of buttons and tab content is not equal!');
		}
	}

	init() {
		this.tabButtons.forEach((el, i) => {
			el.setAttribute('tabindex', '-1');
			el.setAttribute('id', `${this.options.target}${i + 1}`);
			el.classList.remove('--active');
		});

		this.tabContent.forEach((el, i) => {
			el.setAttribute('tabindex', '-1');
			el.setAttribute('aria-labelledby', this.tabButtons[i].id);
			el.classList.remove('--active');
		});

		this.tabButtons[0].classList.add('--active');
		this.tabButtons[0].removeAttribute('tabindex');
		this.tabButtons[0].setAttribute('aria-selected', 'true');
		this.tabContent[0].classList.add('--active');
	}

	events() {
		this.tabButtons.forEach((el, i) => {
			el.addEventListener('click', (e) => {
				const currentTab = this.tabMenu.querySelector('[aria-selected]');

				if (e.currentTarget !== currentTab) {
					this.switchTabs(e.currentTarget, currentTab);
				}
			});

			el.addEventListener('keydown', (e) => {
				const index = Array.prototype.indexOf.call(this.tabButtons, e.currentTarget);

				let direction = null;

				if (e.key === 'ArrowLeft') {
					direction = index - 1;
				}

				if (e.key === 'ArrowRight') {
					direction = index + 1;
				}

				if (e.key === 'ArrowDown') {
					direction = 'down';
				}

				if (direction !== null) {
					if (direction === 'down') {
						this.tabContent[i].focus();
					}

					if (this.tabButtons[direction]) {
						this.switchTabs(this.tabButtons[direction], e.currentTarget);
					}
				}
			});
		});
	}

	switchTabs(currentTab, prevTab = this.tab.querySelector('[aria-selected]')) {
		currentTab.focus();
		currentTab.removeAttribute('tabindex');
		currentTab.setAttribute('aria-selected', 'true');

		prevTab.removeAttribute('aria-selected');
		prevTab.setAttribute('tabindex', '-1');

		const currentIndex = Array.prototype.indexOf.call(this.tabButtons, currentTab);
		const prevIndex = Array.prototype.indexOf.call(this.tabButtons, prevTab);

		this.tabContent[prevIndex].classList.remove('--active');
		this.tabContent[currentIndex].classList.add('--active');

		this.tabButtons[prevIndex].classList.remove('--active');
		this.tabButtons[currentIndex].classList.add('--active');

		this.options.isChanged(this);
	}
}