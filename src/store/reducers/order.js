import * as actionTypes from '../actions/actionType';

const intialState ={
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state=intialState, action) => {
    switch(action.type) {
        case(actionTypes.PURCHASE_INIT): 
            return {
                ...state,
                purchased: false
            }
        case(actionTypes.PURCHASE_BURGER_START):
            return {
                ...state,
                loading: true
            }
        case(actionTypes.PURCHASE_BURGER_SUCCESS):
            const newOrder = {
                ...action.orderData,
                id: action.orderID,
            };
            
            return {
                ...state,
                orders: state.orders.concat(newOrder),
                loading: false,
                purchased: true
            }
        case(actionTypes.PURCHASE_BURGER_FAIL):
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer