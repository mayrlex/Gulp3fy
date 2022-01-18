/*
Modifed code from MaxGrph author
https://github.com/maxdenaro/maxgraph-youtube-source/tree/master/JS-решения%20№21.%20Создаем%20свой%20плагин%20для%20табов

Params:
	?Debug mode
	isChanged: (TabName) => {
		console.log('TabName');
	},

	?Query selector
	('#TabName + number of tab')

Call:
	import Tabs from '../../../components/tabs/tabs.js';

	const tab = new Tabs('TabName', {
		...
	});

	?Select default active tab
	tab.switchTabs(document.querySelector('#tab3'));
*/

class Tabs {
	constructor(selector, options) {
		const defaultOptions = {
			isChanged: () => {},
		};
		this.options = Object.assign(defaultOptions, options);
		this.selector = selector;
		this.tab = document.querySelector(`[data-tab="${selector}"]`);

		if (this.tab) {
			this.tabMenu = this.tab.querySelector('.tab__menu');
			this.tabButtons = this.tabMenu.querySelectorAll('.tab__menu-btn');
			this.tabContent = this.tab.querySelectorAll('.tab__content');
		} else {
			console.error('selector "data-tab" does not exist!');
			return;
		}

		this.check();
		this.init();
		this.events();
	}

	check() {
		if (document.querySelectorAll(`[data-tab="${this.selector}"]`).length > 1) {
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
			el.setAttribute('id', `${this.selector}${i + 1}`);
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

				// prettier-ignore
				e.currentTarget !== currentTab ? this.switchTabs(e.currentTarget, currentTab) : null;
			});

			el.addEventListener('keydown', (e) => {
				const index = Array.prototype.indexOf.call(this.tabButtons, e.currentTarget);

				let direction = null;

				// prettier-ignore
				e.which === 37 ? (direction = index - 1) :
					e.which === 39 ? (direction = index + 1) :
						e.which === 40 ? (direction = 'down') :
							(direction = null);

				// prettier-ignore
				direction !== null ?
					(direction === 'down' ? this.tabContent[i].focus() :
						(this.tabButtons[direction] ?
							this.switchTabs(this.tabButtons[direction], e.currentTarget) : null)) : null;
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

export default Tabs;
