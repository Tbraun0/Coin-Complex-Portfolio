/*****************************************************
(c) 2018 Coin Complex
Redux Actions for List Updates
******************************************************/

export const ADD_ELEMENT = 'ADD_ELEMENT'
export const REMOVE_ELEMENT = 'REMOVE_ELEMENT'

export const addElement = (n) => {
	return { type: ADD_ELEMENT, name: n }
}

export const removeElement = (n) => {
	return { type: REMOVE_ELEMENT, name: n }
}