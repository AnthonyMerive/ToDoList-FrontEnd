import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { ToDoReducer } from '../reducers/ToDoReducer';


const reducers = combineReducers({

    tareas: ToDoReducer,

})

const composeEnhancers = (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


export const store = createStore(
    
    reducers,
    composeEnhancers(
        applyMiddleware(thunk))

)
