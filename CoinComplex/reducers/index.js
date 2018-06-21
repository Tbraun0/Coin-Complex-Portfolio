'use strict';

import watchlistReducer from './watchlistReducer';
import searchTermReducer from './searchTermReducer';

const reducers = {
	watchlist: watchlistReducer,
	searchTerm: searchTermReducer,
};
export default reducers;