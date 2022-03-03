// import SimpleBar from 'simplebar';
import lazyImages from './helpers/lazyImages.js';
import documentReady from './helpers/documentReady.js';
// import checkDevice from './helpers/checkDevice.js';

//? ### Modules
// import * as smoothScroll from './config/smoothScroll.js';

//? ### Components
// import * as header from '../components/header/header.js';
// import * as slider from '../components/slider/slider.js';
// import * as spoiler from '../components/spoiler/spoiler.js';

//? ### Pages
import * as homepage from './pages/home/hero.js';

documentReady(() => {
	lazyImages();
	// checkDevice();
});
