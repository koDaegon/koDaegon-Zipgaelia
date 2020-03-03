import * as actionType from '../actions/actionType';
import axios from 'axios';

const API_KEY = "AIzaSyCx-mJO7DIe4HXkr8SNF7ueldVWsfc1Hwg";

export const authStart = () => {
    return {
        type: actionType.AUTH_START
    };
};

export const authSuccess = (idToken, userId) => {
    return {
        type: actionType.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionType.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionType.AUTH_LOGOUT
    };
};

export const checkAuthTimeOut = (expTime) => {
    return dispatch => {
        setTimeout(()=> {
            dispatch(logout());
        }, expTime*1000);
    };
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
        if(!isSignup) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
        }
        axios.post(url, authData) 
        .then(response => {
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn*1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId' , response.data.localId);

            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeOut(response.data.expiresIn))
        })
        .catch(error => {
            dispatch(authFail(error.response.data.error));
        });
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionType.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}


export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()) {
                dispatch(logout());
            } else{
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime())/1000));
            }
            
        }
    };
};