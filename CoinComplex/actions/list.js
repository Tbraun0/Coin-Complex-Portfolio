/*****************************************************
(c) 2018 Coin Complex
Redux Actions for List Updates
******************************************************/

export const ADD_ELEMENT = 'ADD_ELEMENT'
export const SET_ELEMENT = 'SET_ELEMENT'
export const REMOVE_ELEMENT = 'REMOVE_ELEMENT'
export const INIT_LIST = 'INIT_LIST'

/* Initialize a list */
export const initList = (l, n) => {
	return { type: INIT_LIST, list: l, name: n }
}

export const addElement = (e, n) => {
	return { type: ADD_ELEMENT, element: e, name: n }
}

export const setElement = (id, e, n) => {
	return { type: SET_ELEMENT, id: id, element: e, name: n }
}

export const removeElement = (id, n) => {
	return { type: REMOVE_ELEMENT, id: id, name: n }
}