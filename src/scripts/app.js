import lazyImages from './helpers/lazyImages.js';
import documentReady from './helpers/documentReady.js';
// import checkDevice from './helpers/checkDevice';
// import * as themeSwitcher from '../components/themeSwitcher/themeSwitcher';
// import * as scrollbars from './modules/scrollbars.js';
// import * as header from '../components/header/header.js';
// import * as smoothScroll from './modules/smoothScroll';
// import * as swiper from './modules/swiper.js';
import * as homepage from './pages/home/main.js';

documentReady(() => {
	lazyImages();
	// checkDevice();
});
