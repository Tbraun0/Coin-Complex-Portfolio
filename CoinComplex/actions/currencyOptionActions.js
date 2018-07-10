/*****************************************************
(c) 2018 Coin Complex
Redux Actions for updating the current Fiat Currency being displayed
******************************************************/

import * as actions from './actionTypes';

export const updateCurrency = (n) => {
	return { type: actions.CHANGE_CURRENCY, 
				currency: n,
			};
}