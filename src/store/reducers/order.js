import * as actionTypes from '../actions/actionType';
import {updatedObject} from '../utility';

const intialState ={
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state=intialState, action) => {
    switch(action.type) {
        default: return state;
        case(actionTypes.PURCHASE_INIT): return purchaseInit(state,action);
        case(actionTypes.PURCHASE_BURGER_START): return purchaseBurgerStart(state,action);
        case(actionTypes.PURCHASE_BURGER_SUCCESS): return purchaseBurgerSuccess(state, action);
        case(actionTypes.PURCHASE_BURGER_FAIL): return purchaseBurgerFail(state, action);
        case(actionTypes.FETCH_ORDERS_START): return fetchOrdersStart(state, action);
        case(actionTypes.FETCH_ORDERS_SUCCESS):return fetchOrdersSuccess(state, action);
        case(actionTypes.FETCH_ORDERS_FAIL):return fetchOrdersFail(state, action);
    }
}

const purchaseInit = (state, action) => {
    return updatedObject(state, {purchased: false})
}

const purchaseBurgerStart = (state, action) => {
    return updatedObject(state, {loading: true});
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updatedObject(action.orderData, {id: action.orderID});
    const updatedState = {
        orders: state.orders.concat(newOrder),
        loading: false,
        purchased: true
    }
    return updatedObject(state, updatedState);
}

const purchaseBurgerFail = (state, action) => {
    return updatedObject(state, {loading: false});
}

const fetchOrdersStart = (state, action) => {
    return updatedObject(state, {loading: true});
}

const fetchOrdersSuccess = (state, action) => {
    const updatedState = {
        orders: action.orders,
        loading: false
    }
    return updatedObject(state, updatedState);
}

const fetchOrdersFail = (state, action) => {
    return updatedObject(state, {loading: false});
}

export default reducer