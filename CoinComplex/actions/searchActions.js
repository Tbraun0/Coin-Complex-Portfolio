/*****************************************************
(c) 2018 Coin Complex
Redux Actions for List Updates
******************************************************/

import * as actions from './actionTypes';

export const updateSearch = (n) => {
	return { type: actions.CHANGE_SEARCH, 
				term: n,
			};
}