/*****************************************************
(c) 2018 Coin Complex
Redux Actions for List Updates
******************************************************/

import * as actions from './actionTypes';

export const addElement = (n) => {
	console.log(n);
	return { type: actions.ADD, 
			watchListItem: {
				name: n,
		} 
	};
}

export const removeElement = (n) => {
	return { type: actions.REMOVE, 
				name: n 
			};
}