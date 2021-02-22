import { removeMask } from "../services/mask";

import AsyncStorage from '@react-native-async-storage/async-storage';

const removeItemReducer = (state, id) => {
    let items = state.map(item => {
        if (item.id == id){
            return {
                ...item,
                deleted: new Date(),
                value: 0
            };
        } else return item;
    });
    AsyncStorage.setItem(itemsStorageKey, JSON.stringify(items));
    return items;
}

export default removeItemReducer;