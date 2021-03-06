import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './redux/rootReducer'
import reduxThunk from 'redux-thunk';

const loggerMiddleware = store => next => action => {
    const result = next(action);
    return result;
};

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(loggerMiddleware,reduxThunk)));

const app = (
    <Provider store={store}>
        <App/>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
