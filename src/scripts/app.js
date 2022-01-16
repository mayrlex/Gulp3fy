//? ### H3lpers
import lazyImages from './helpers/lazyImages.js';
import documentReady from './helpers/documentReady.js';
// import checkDevice from './helpers/checkDevice.js';

//? ### Modules
// import * as smoothScroll from './config/smoothScroll.js';

//? ### Configs
// import * as scrollbars from './config/scrollbars.js';
// import * as swiper from './modules/swiper.js';

//? ### Components
// import * as themeSwitcher from '../components/themeSwitcher/themeSwitcher';
import * as header from '../components/header/header.js';
// import * as spoiler from '../components/spoiler/spoiler.js';

//? ### Pages
import * as homepage from './pages/home/hero.js';

documentReady(() => {
	lazyImages();
	// checkDevice();
});
