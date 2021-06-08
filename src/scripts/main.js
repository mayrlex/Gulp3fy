'use-strict';

import lazyImages from './modules/lazyImages';
import documentReady from './helpers/documentReady';
import * as checkDevice from './helpers/checkDevice';
import * as aos from './modules/aos.settings';
import * as header from './components/header';
import * as owl from './modules/owl.settings';

documentReady(() => {
    lazyImages();
});
