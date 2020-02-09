import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore , combineReducers} from 'redux'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom';
import bugerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';

// const rootReducers = combineReducers({
//     burgerBuilder : bugerBuilderReducer,
//     order: orderReducer
//     });

const store = createStore(bugerBuilderReducer , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
ReactDOM.render( app, document.getElementById('root'));

