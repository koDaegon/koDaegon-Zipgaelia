import * as actionTypes from '../actions/actionType';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT, 
        ingredientType : name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT, 
        ingredientType : name
    }
}