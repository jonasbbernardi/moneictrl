import AsyncStorage from '@react-native-async-storage/async-storage';

const addItemReducer = (state, item) => {
    let items = [...state, item];
    let strItems = JSON.stringify(items);
    AsyncStorage.setItem(itemsStorageKey, strItems);
    return items;
}

export default addItemReducer;