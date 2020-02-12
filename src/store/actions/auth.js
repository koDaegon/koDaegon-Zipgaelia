import * as actionType from '../actions/actionType';
import axios from 'axios';

const API_KEY = "AIzaSyCx-mJO7DIe4HXkr8SNF7ueldVWsfc1Hwg";

export const authStart = () => {
    return {
        type: actionType.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionType.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionType.AUTH_FAIL,
        error: error
    };
};

export const auth = (email,password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, authData) 
        .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data));
        })
        .catch(error => {
            console.log(error);
            dispatch(authFail(error));
        });
    }
}

