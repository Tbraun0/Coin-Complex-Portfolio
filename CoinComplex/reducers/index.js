'use strict';

import watchlistReducer from './watchlistReducer';
import searchTermReducer from './searchTermReducer';
import graphPeriodReducer from './graphPeriodReducer';
import currencyOptionReducer from './currencyOptionReducer';
import globalPercentReducer from './globalPercentChangeReducer.js';
import fullPageReducer from './fullPageReducer.js';

const reducers = {
	watchlist: watchlistReducer,
	searchTerm: searchTermReducer,
	graphPeriod: graphPeriodReducer,
	currencyOption: currencyOptionReducer,
	fullPage: fullPageReducer,
	globalPercent: globalPercentReducer,
};
export default reducers;