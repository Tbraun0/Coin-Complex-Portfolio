/*****************************************************
(c) 2018 Coin Complex
Redux Reducers for Lists
******************************************************/

import * as Actions from '../actions/actionTypes';
import _ from 'lodash';

const initialState = {
	list: new Set([]),
}

function watchlistReducer (state = initialState, action={}) {
	let out = {list: new Set([])};

	switch(action.type) {
		default: 
			return state;

		case Actions.ADD:
			var newList = _.cloneDeep(state.list);
			newList.add(action.name);
			out["list"] = newList;
			return out;
			/*
			var newState =  Object.assign({}, state, action.watchListItem.name);
			console.log(newState);
			return newState;
			*/

		case Actions.REMOVE:
			//console.log(state.list[0].name);
			//console.log(action.name.name);
			var newList = _.cloneDeep(state.list);
			newList.delete(action.name);
			/*
			for (var i=0; i< state.list.length; i++) {
				if (state.list[i].name == action.name.name) {
					newList.splice(i, 1);
				}
			}
			*/
			out["list"] = newList;
			return out;
	}
};
export default watchlistReducer;