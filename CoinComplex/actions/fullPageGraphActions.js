/*****************************************************
(c) 2018 Coin Complex
Redux Actions for The Coin Graph Updates
******************************************************/

import * as actions from './actionTypes';

export const toggleFullPage = (n, coin) => {
	return { type: actions.TOGGLE_FULLPAGEGRAPH, 
				toggleState: n,
				activeCoin: coin,
			};
}