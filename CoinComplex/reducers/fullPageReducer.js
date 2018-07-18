/*****************************************************
(c) 2018 Coin Complex
Redux Reducers for the Full page setting
******************************************************/

import * as Actions from '../actions/actionTypes';

const initialState = {
	fullPageDisplayed: false,
	currentCoin: null,
}

function fullPageReducer (state = initialState, action={}) {
	let out = {fullPageDisplayed: false, currentCoin: null};

	switch(action.type) {
		default: 
			return state;

		case Actions.TOGGLE_FULLPAGEGRAPH:
			out['fullPageDisplayed'] = action.toggleState;
			out['currentCoin'] = action.activeCoin;
			return out;
	}
};
export default fullPageReducer;