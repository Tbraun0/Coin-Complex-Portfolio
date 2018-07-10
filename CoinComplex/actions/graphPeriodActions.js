/*****************************************************
(c) 2018 Coin Complex
Redux Actions for The Coin Graph Updates
******************************************************/

import * as actions from './actionTypes';

export const changePeriod = (n) => {
	return { type: actions.CHANGE_GRAPH_PERIOD, 
				period: n,
			};
}