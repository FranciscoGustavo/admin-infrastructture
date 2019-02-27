import { createStore, combineReducers, applyMiddleware, compose}  from 'redux';
import { routerReducer } from 'react-router-redux';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';

import reducers from '../reducers';

// Combine all our midlewares
const enhancer = function(middleware){
    return compose(
        persistState('users'),
        applyMiddleware(middleware, thunk)
    )
}

// Combine all our reducers
const rootReducer = combineReducers({
    ...reducers,
    router : routerReducer
})

// Export function for configure Store
export default function configureStore(middleware){
    return createStore(
        rootReducer,
        enhancer(middleware)      
    )
}