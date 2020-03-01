import * as actionType from '../actions/actionType';
import {updatedObject} from '../../shared/utility';

const initialState= {
    ingredients: null,
    totalPrice: 4,
    ingCounter: null,
    error: false,
    building: false
}

const INGREDIENT_PRICES ={
    salad : 0.5,
    cheese : 0.7,
    meat : 0.3,
    bacon: 0.4 
};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        default: return state;
        case(actionType.ADD_INGREDIENT): return addIngredient(state, action);
        case(actionType.REMOVE_INGREDIENT): return removeIngredient(state, action);
        case(actionType.FETCH_INGREDIENTS): return fetchIngredients(state, action);
        case(actionType.FETCH_INGREDIENTS_FAILED): return fetchIngredientsFailed(state, action);
    }
}

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientType]: state.ingredients[action.ingredientType] + 1}
    const updatedIngredients = updatedObject(state.ingredients, updatedIngredient);
    const updatedState= {
            ingredients: updatedIngredients,
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType],
            ingCounter: state.ingCounter + 1,
            building: true
        }
    return updatedObject(state,updatedState);
}

const removeIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientType]: state.ingredients[action.ingredientType] - 1}
    const updatedIngredients = updatedObject(state.ingredients, updatedIngredient);
    const updatedState= {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType],
        ingCounter: state.ingCounter - 1
        }
    return updatedObject(state,updatedState);
}

const fetchIngredients = (state, action) => {
    const updatedIngredients = {
        salad: action.ingredients.salad,
        bacon: action.ingredients.bacon,
        meat: action.ingredients.meat,
        cheese: action.ingredients.cheese
    }

    const updatedState = {
        ingredients: updatedIngredients,
        error: false,
        totalPrice : 4,
        building: false
    }
    return updatedObject(state, updatedState);
}

const fetchIngredientsFailed = (state, action) => {
    return updatedObject(state, {error: true});
}


export default reducer;