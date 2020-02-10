import * as actionType from '../actions/actionType';
import {updatedObject} from '../utility';

const initialState= {
    ingredients: null,
    totalPrice: 4,
    ingCounter: null,
    error: false
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
        case(actionType.FETCH_INGREDIENTS):
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    meat: action.ingredients.meat,
                    cheese: action.ingredients.cheese
                },
                error: false,
                totalPrice : 4
            }
        case(actionType.FETCH_INGREDIENTS_FAILED):
            return {
                ...state,
                error: true
            }
    }
}

export default reducer;