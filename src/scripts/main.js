import lazyImages from './helpers/lazyImages';
import documentReady from './helpers/documentReady';
// import checkDevice from './helpers/checkDevice';
// import * as themeSwitcher from '../components/themeSwitcher/themeSwitcher';
import scrollBar from 'overlayscrollbars';
import scrollBarRc from './config/scrollbarsrc';
// import * as header from './parts/header';
// import * as smoothScroll from './modules/smoothScroll';
import * as swiperRc from './config/swiperrc';

documentReady(() => {
	lazyImages();
	// checkDevice();
});
