//? ### Utils
import documentReady from './utils/documentReady.js';
// import checkDevice from './utils/checkDevice.js';

//? ### Vendors
import lazyLoad from './vendors/lazyLoad.js';
import './vendors/focusVisible.js';
// import './vendors/swiper.js';
// import 'simplebar';

//? ### Components
import '../components/header/header.js';
// import '../components/spoiler/spoiler.js';

//? ### Pages
import './pages/home.js';

documentReady(() => {
	lazyLoad();
	// checkDevice();
});
