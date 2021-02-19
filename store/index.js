import { combineReducers, createStore } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getStorageItems, initItemsList } from '../actions/getItems';

const getItems = async () =>{
    try{
        let storageItems = await AsyncStorage.getItem(itemsStorageKey);
        return storageItems != null ? JSON.parse(storageItems) : [];
    } catch (e) {
        console.error(e);
    }
    return [];
}

const items = (state = [], action) => {
    let items = state;
    switch(action.type){
        case gActions.INIT_LIST:
            return action.payload;
        case gActions.ADD_ITEM:
            let item = action.payload;
            items = [...state, item];
            AsyncStorage.setItem(itemsStorageKey, JSON.stringify(items));
            return items;
        case gActions.GET_STORAGE_ITEMS:
            getItems().then((items) => store.dispatch(initItemsList(items)));
            return state;
        default:
            return state;
    }
}

const reducers = {
    items
}

const store = createStore(combineReducers(reducers));

store.dispatch(getStorageItems());

export default store;