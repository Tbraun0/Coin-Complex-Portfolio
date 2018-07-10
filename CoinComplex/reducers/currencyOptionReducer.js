/*****************************************************
(c) 2018 Coin Complex
Redux Reducers for Lists
******************************************************/

import * as Actions from '../actions/actionTypes';

const initialState = {
	currency: 'USD',
}

function currencyOptionReducer (state = initialState, action={}) {
	let out = {currency: ''};

	switch(action.type) {
		default: 
			return state;

		case Actions.CHANGE_CURRENCY:
			out['currency'] = action.currency;
			return out;
	}
};
export default currencyOptionReducer;