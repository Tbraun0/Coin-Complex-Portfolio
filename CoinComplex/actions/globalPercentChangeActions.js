/*****************************************************
(c) 2018 Coin Complex
Redux Actions for The PercentChanged Updates
******************************************************/

import * as actions from './actionTypes';

export const changeGlobalPercent = (n) => {
	return { type: actions.CHANGE_GLOBAL_PERCENT_CHANGE, 
				globalPercent: n,
			};
}