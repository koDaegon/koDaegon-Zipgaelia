import * as actionType from '../actions/actionType';
import {updatedObject} from '../utility';

const initialState= {
    ingredients : {
        bacon: 0, 
        cheese: 0, 
        meat: 0, 
        salad: 0
    },
    totalPrice: 4,
    ingCounter: null
}

const INGREDIENT_PRICES ={
    salad : 0.5,
    cheese : 0.7,
    meat : 0.3,
    bacon: 0.4 
};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        default: 
            return {
                ...state
            }
        case(actionType.ADD_INGREDIENT):
            return updatedObject(state, {ingredients: {
                ...state.ingredients,
                [action.ingredientType]: state.ingredients[action.ingredientType] + 1
            },
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType],
            ingCounter: state.ingCounter + 1}); 
            // return {
            //     ...state,
            //     ingredients: {
            //         ...state.ingredients,
            //         [action.ingredientType]: state.ingredients[action.ingredientType] + 1
            //     },
            //     totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType],
            //     ingCounter: state.ingCounter + 1
            // }
        case(actionType.REMOVE_INGREDIENT):
            return updatedObject(state, {ingredients: {
                ...state.ingredients,
                [action.ingredientType]: state.ingredients[action.ingredientType] - 1
            },
            totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType],
            ingCounter: state.ingCounter - 1}); 
            // return {
            //     ...state,
            //     ingredients: {
            //         ...state.ingredients,
            //         [action.ingredientType]: state.ingredients[action.ingredientType] - 1
            //     },
            //     totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType],
            //     ingCounter: state.ingCounter - 1
            // }
    }
}

export default reducer;