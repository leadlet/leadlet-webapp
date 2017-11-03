import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const loggerMiddleware = createLogger();

export const store = createStore(
    rootReducer, composeWithDevTools(
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    ))
);