import { combineReducers, createStore } from 'redux';
import '../globals';

const items = (state = [], action) => {
    switch(action.type){
        case gActions.ADD_ITEM:
            let item = action.payload;
            return [...state, item];
        default:
            return state;
    }
}

const reducers = {
    items
}

const store = createStore(combineReducers(reducers));

export default store;