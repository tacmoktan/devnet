import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './redux/reducers';
import { setAuthToken } from './redux/utils/setAuthToken';

const initialState = {};

const middleware = [thunk];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

//set a store subscription listener to store token in local storage

let currentState = store.getState();

//following event is triggered everytime a state changes
store.subscribe(() => {

    //to check if token is changed and set that token
    let previousState = currentState;
    currentState = store.getState();

    if (previousState.auth.token !== currentState.auth.token) {
        setAuthToken(currentState.auth.token)
    }
})

export default store;