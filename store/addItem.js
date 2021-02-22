import AsyncStorage from '@react-native-async-storage/async-storage';

const addItemReducer = (state, item) => {
    let items = [...state, item];
    AsyncStorage.setItem(itemsStorageKey, JSON.stringify(items));
    return items;
}

export default addItemReducer;