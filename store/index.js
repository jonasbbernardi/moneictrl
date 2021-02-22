import { combineReducers, createStore } from 'redux';

import { getStorageItems } from '../actions/getItems';

import { initListReducer, getStorageItemsReducer } from './getItems';
import addItemReducer from './addItem';
import editItemReducer from './editItem';
import removeItemReducer from './removeItem';
import clearItemsReducer from './clearItems';

const loadCurrentItems = () => {
    setTimeout(() => {
        let {items, currentMonth} = store.getState();
        let payload = {items, currentMonth};
        store.dispatch({type: gActions.LOAD_CURRENT_ITEMS, payload: payload});
    }, 0);
}

const items = (state = [], action) => {
    let items = state;
    switch(action.type){
        case gActions.INIT_LIST:
            items = initListReducer(state, action.payload); break;
        case gActions.ADD_ITEM:
            items = addItemReducer(state, action.payload); break;
        case gActions.EDIT_ITEM:
            items = editItemReducer(state, action.payload); break;
        case gActions.REMOVE_ITEM:
            items = removeItemReducer(state, action.payload); break;
        case gActions.CLEAR_ITEMS:
            items = clearItemsReducer(state); break;
        case gActions.GET_STORAGE_ITEMS:
            items = getStorageItemsReducer(state, store); break;
        default:
            return state;
    }
    loadCurrentItems();
    return items;
};

const initialCurrentMonth = new Date();

const currentMonth = (state = initialCurrentMonth, action) => {
    switch(action.type){
        case gActions.CHANGE_MONTH:
            loadCurrentItems();
            return action.payload;
        case gActions.RESET_MONTH:
            return new Date();
        default: return state;
    }
}

const currentItems = (state = [], action) => {
    switch(action.type){
        case gActions.LOAD_CURRENT_ITEMS:
            let currentMonth = action.payload.currentMonth;
            let newItems = action.payload.items.filter(item => {
                if(!!item.due_date){
                    let itemMonth = item.due_date;
                    if(typeof item.due_date === 'string'){
                        itemMonth = new Date(item.due_date);
                    }
                    return itemMonth.getMonth() == currentMonth.getMonth()
                }
                return false;
            })
            return newItems;
        default: return state;
    }
}

const reducers = { items, currentMonth, currentItems }

const store = createStore(combineReducers(reducers));

store.dispatch(getStorageItems());

export default store;