/*****************************************************
(c) 2018 Coin Complex
Redux Reducers for the Global Percent Change setting
******************************************************/

import * as Actions from '../actions/actionTypes';

const initialState = {
	globalPercentChange: '24H',
}

function globalPercentReducer (state = initialState, action={}) {
	let out = {globalPercentChange: '24H'};

	switch(action.type) {
		default: 
			return state;

		case Actions.CHANGE_GLOBAL_PERCENT_CHANGE:
			out['globalPercentChange'] = action.globalPercent;
			return out;
	}
};
export default globalPercentReducer;