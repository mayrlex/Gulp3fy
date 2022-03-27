//? ### Helpers
import documentReady from './helpers/documentReady.js';
// import checkDevice from './helpers/checkDevice.js';

//? ### Plugins
import lazyLoad from './plugins/lazyLoad.js';
import './plugins/focusVisible.js';
// import 'simplebar';

//? ### Components
// import '../components/header/header.js';
// import '../components/spoiler/spoiler.js';

//? ### Pages
import './pages/home/hero.js';

documentReady(() => {
	lazyLoad();
	// checkDevice();
});
