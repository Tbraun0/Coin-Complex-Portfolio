/*****************************************************
(c) 2018 Coin Complex
Redux Actions for List Updates
******************************************************/

import * as actions from './actionTypes';

export const addElement = (n) => {
	return { type: actions.ADD, 
				name: n,
	};
}

export const removeElement = (n) => {
	return { type: actions.REMOVE, 
				name: n,
			};
}