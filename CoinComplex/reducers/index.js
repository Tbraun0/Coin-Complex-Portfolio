'use strict';

import watchlistReducer from './watchlistReducer';
import searchTermReducer from './searchTermReducer';
import graphPeriodReducer from './graphPeriodReducer';
import currencyOptionReducer from './currencyOptionReducer';

const reducers = {
	watchlist: watchlistReducer,
	searchTerm: searchTermReducer,
	graphPeriod: graphPeriodReducer,
	currencyOption: currencyOptionReducer,
};
export default reducers;