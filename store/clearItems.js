import AsyncStorage from '@react-native-async-storage/async-storage';

const clearItemsReducer = (state) => {
    let items = state.filter(item => !item.deleted);
    AsyncStorage.setItem(itemsStorageKey, JSON.stringify(items));
    return items;
}

export default clearItemsReducer;