import { combineReducers, createStore, applyMiddleware  } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cache } from "react-native-cache";
import thunk from 'redux-thunk';
import moment from 'moment';

import { getStorageItems } from '../actions/getItems';

import { initListReducer, getStorageItemsReducer } from './getItems';
import addItemReducer from './addItem';
import editItemReducer from './editItem';
import removeItemReducer from './removeItem';
import {doneItemReducer, undoneItemReducer} from './doneItem';
import clearItemsReducer from './clearItems';
import loadCurrentItemsReducer from './loadCurrentItems';
import setMoneyMaskReducer from './setMoneyMask';
import setDateFormatReducer from './setDateFormat';

global.storage = new Cache({
    namespace: "monei",
    policy: {
        maxEntries: 50000, // if unspecified, it can have unlimited entries
        stdTTL: 0
    },
    backend: AsyncStorage
});

const loadCurrentItems = () => {
    setTimeout(() => {
        let {items, currentDate, currentFilter} = store.getState();
        let payload = {items, currentDate, currentFilter};
        store.dispatch({type: gActions.LOAD_CURRENT_ITEMS, payload: payload});
    });
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
        case gActions.DONE_ITEM:
            items = doneItemReducer(state, action.payload); break;
        case gActions.UNDONE_ITEM:
            items = undoneItemReducer(state, action.payload); break;
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

const initialCurrentDate = moment();

const currentDate = (state = initialCurrentDate, action) => {
    switch(action.type){
        case gActions.SET_MONTH:
            loadCurrentItems();
            return moment(action.payload);
        case gActions.RESET_MONTH:
            return initialCurrentDate;
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

import * as Localization from 'expo-localization';

const initialMoneyMask = setMoneyMaskReducer(Localization.locale);
const initialDateFormat = setDateFormatReducer(Localization.locale);
initialLocale = {
    lang: Localization.locale,
    moneyMask: initialMoneyMask,
    dateFormat: initialDateFormat
}
const locale = (state = initialLocale, action) => {
    switch(action.type){
        case gActions.SET_LOCALE:
            let lang = action.lang || initialLocale.lang;
            let moneyMask = setMoneyMaskReducer(lang);
            let dateFormat = setDateFormatReducer(lang);
            return {lang, moneyMask, dateFormat};
        default: return state;
    }
};

const reducers = {
    items,
    currentFilter,
    currentItems,
    currentDate,
    locale,
}

const store = createStore(combineReducers(reducers), applyMiddleware(thunk));

store.dispatch(getStorageItems());

export default store;