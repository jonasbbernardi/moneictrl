import { combineReducers, createStore } from 'redux';
import moment from 'moment';

import { getStorageItems } from '../actions/getItems';

import { initListReducer, getStorageItemsReducer } from './getItems';
import addItemReducer from './addItem';
import editItemReducer from './editItem';
import removeItemReducer from './removeItem';
import clearItemsReducer from './clearItems';
import loadCurrentItemsReducer from './loadCurrentItems';
import changeMoneyMaskReducer from './changeMoneyMask';
import changeDateFormatReducer from './changeDateFormat';

const loadCurrentItems = () => {
    setTimeout(() => {
        let {items, currentMonth, currentFilter} = store.getState();
        let payload = {items, currentMonth, currentFilter};
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

const initialCurrentMonth = moment();

const currentMonth = (state = initialCurrentMonth, action) => {
    switch(action.type){
        case gActions.CHANGE_MONTH:
            loadCurrentItems();
            return moment(action.payload);
        case gActions.RESET_MONTH:
            return initialCurrentMonth;
        default: return state;
    }
}

const currentFilter = (state = {}, action) => {
    switch(action.type){
        case gActions.FILTER_BY_DESCRIPTION:
            loadCurrentItems();
            return {...state, description: action.payload.description};
        case gActions.FILTER_BY_TYPE:
            loadCurrentItems();
            return {...state, type: action.payload.type};
        case gActions.RSEET_FILTER:
            return {};
        default: return state;
    }
}

const currentItems = (state = [], action) => {
    switch(action.type){
        case gActions.LOAD_CURRENT_ITEMS:
            return loadCurrentItemsReducer(action.payload);
        default: return state;
    }
}

import * as Localization from 'expo-localization';

const locale = (state = Localization.locale, action) => {
    switch(action.type){
        case gActions.CHANGE_LOCALE: return action.locale;
        default: return state;
    }
};

const initialMoneyMask = changeMoneyMaskReducer(Localization.locale);
const moneyMask = (state = initialMoneyMask, action) => {
    switch(action.type){
        case gActions.CHANGE_LOCALE:
            return changeMoneyMaskReducer(action.locale);
        default: return state;
    }
};

const initialDateFormat = changeDateFormatReducer(Localization.locale);
const currentDateFormat = (state = initialDateFormat, action) => {
    switch(action.type){
        case gActions.CHANGE_LOCALE:
            return changeDateFormatReducer(action.locale);
        default: return state;
    }
};

const reducers = {
    items,
    currentDateFormat,
    currentFilter,
    currentItems,
    currentMonth,
    locale,
    moneyMask,
}

const store = createStore(combineReducers(reducers));

store.dispatch(getStorageItems());

export default store;