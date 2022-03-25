//? ### Helpers
import documentReady from './helpers/documentReady.js';
// import checkDevice from './helpers/checkDevice.js';

//? ### Plugins
import lazyLoad from './plugins/lazyLoad.js';
import * as focusVisible from './plugins/focusVisible.js';
// import SimpleBar from 'simplebar';
// import Swiper, { Navigation, Pagination, Keyboard } from 'swiper';

//? ### Components
// import * as header from '../components/header/header.js';
// import * as spoiler from '../components/spoiler/spoiler.js';

//? ### Pages
import * as homepage from './pages/home/hero.js';

documentReady(() => {
	lazyLoad();
	// checkDevice();
});
