'use-strict';

import lazyImages from './modules/lazyImages';
import documentReady from './helpers/documentReady';
import * as checkDevice from './helpers/checkDevice';
// import * as themeSwitcher from './components/themeSwitcher';
// import * as aos from './modules/aos.settings';
import * as header from './parts/header';
import * as smoothScroll from './components/smoothScroll';

documentReady(() => {
    lazyImages();
});
