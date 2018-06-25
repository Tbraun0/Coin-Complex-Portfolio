/*****************************************************
(c) 2018 Coin Complex
Redux Actions for Explore Page Updates
******************************************************/

import * as actions from './actionTypes';

export const addCoinsToList = (n) => {
	return { type: actions.CHANGE_SEARCH, 
				term: n,
			};
}