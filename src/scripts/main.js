//? ### Utils
import documentReady from './utils/documentReady.js';
import lazyLoad from './vendors/lazyLoad.js';
// import checkDevice from './utils/checkDevice.js';

//? ### Core
import './core/vendors.js';
import './core/modules.js';
import './core/components.js';

//? ### Pages
import './pages/home.js';

documentReady(() => {
	lazyLoad();
	// checkDevice({ bodyClass: true });
});
