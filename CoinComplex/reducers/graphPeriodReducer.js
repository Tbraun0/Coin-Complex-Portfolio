/*****************************************************
(c) 2018 Coin Complex
Redux Reducers for Lists
******************************************************/

import * as Actions from '../actions/actionTypes';

const initialState = {
	changePeriod: '',
}

function graphPeriodReducer (state = initialState, action={}) {
	let out = {changePeriod: ''};

	switch(action.type) {
		default: 
			return state;

		case Actions.CHANGE_GRAPH_PERIOD:
			out['changePeriod'] = action.period;
			return out;
	}
};
export default graphPeriodReducer;