/*****************************************************
(c) 2018 Coin Complex
Redux Reducers for Lists
******************************************************/

import * as Actions from '../actions/actionTypes';

const initialState = {
	list: [],
}

function watchlistReducer (state = initialState, action={}) {
	switch(action.type) {
		default: 
			return state;

		case Actions.ADD:
			var newList = state.list.push(action.watchListItem.name);
			console.log(state);
			return state;
			/*
			var newState =  Object.assign({}, state, action.watchListItem.name);
			console.log(newState);
			return newState;
			*/

		case Actions.REMOVE:
			delete state.action.name;
			return state;
	}
};
export default watchlistReducer;