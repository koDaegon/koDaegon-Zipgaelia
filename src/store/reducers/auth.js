import * as actionTypes from '../actions/actionType';
import {updatedObject} from '../utility';
const intialState = {
    token: null,
    userId: null,
    error: null,
    loading: null
}

const authStart = (state, action) => {
    return updatedObject(state ,{error: null, loading: true});
}
const authSuccess = (state, action) => {
    return updatedObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    });
}

const authFail = (state, action) => {
    return updatedObject(state, {
        error: action.error,
        loading: false
    });
}

const authLogout = (state, action) => {
    return updatedObject(state, {
        token: null,
        userId: null
    });
}

const reducer = (state= intialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return  authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default: 
            return state;
        }
}

export default reducer;