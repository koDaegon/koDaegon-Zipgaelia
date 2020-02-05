import * as actionType from './action';

const initialState= {
    ingredients : {
        bacon: 0, 
        cheese: 0, 
        meat: 0, 
        salad: 0
    },
    totalPrice: 4,
    purchasable: false
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
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: state.ingredients[action.ingredientType] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType]
            }
        case(actionType.REMOVE_INGREDIENT):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: state.ingredients[action.ingredientType] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType]
            }
    }
}

export default reducer;