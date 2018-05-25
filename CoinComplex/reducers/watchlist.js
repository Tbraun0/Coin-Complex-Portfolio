/*****************************************************
(c) 2018 Coin Complex
Redux Reducers for Lists
******************************************************/

import * as Actions from '../actions/watchlist'

const initialState = {
	list: {},
}

function watchlist(state = initialState, action) {
	let out = { };

	switch(action.type) {
		default: 
			return state;

		case Actions.ADD_ELEMENT:
			return Object.assign({}, state, action.name);

		case Actions.REMOVE_ELEMENT:
			delete state.action.name;
			return state;
	}
}

export default watchlist