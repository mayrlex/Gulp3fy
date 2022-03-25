// import SimpleBar from 'simplebar';
import lazyLoad from './helpers/lazyLoad.js';
import documentReady from './helpers/documentReady.js';
// import checkDevice from './helpers/checkDevice.js';
import * as focusVisible from './helpers/focusVisible.js';

//? ### Plugins
// import Swiper, { Navigation, Pagination, Keyboard } from 'swiper';

//? ### Components
// import * as header from '../components/header/header.js';
// import * as slider from '../components/slider/slider.js';
// import * as spoiler from '../components/spoiler/spoiler.js';

//? ### Pages
import * as homepage from './pages/home/hero.js';

documentReady(() => {
	lazyLoad();
	// checkDevice();
});
