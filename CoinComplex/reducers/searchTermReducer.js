/*****************************************************
(c) 2018 Coin Complex
Redux Reducers for Lists
******************************************************/

import * as Actions from '../actions/actionTypes';

const initialState = {
	searchTerm: '',
}

function searchTermReducer (state = initialState, action={}) {
	let out = {searchTerm: ''};

	switch(action.type) {
		default: 
			return state;

		case Actions.CHANGE_SEARCH:
			out['searchTerm'] = action.term;
			console.log(action.term);
			return out;
	}
};
export default searchTermReducer;