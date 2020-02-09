import * as actionTypes from '../actions/actionType';
import axios from '../../axios-order';

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

export const setIngredients = (ings) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS,
        ingredients: ings
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const fetchIngredients = () => {
    return dispatch => {
        axios.get('https://zipgaelia.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data));
        })
        .catch(error => {
            dispatch(fetchIngredientsFailed())
        });
    }
}