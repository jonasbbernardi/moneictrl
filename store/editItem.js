import AsyncStorage from '@react-native-async-storage/async-storage';

const editItemReducer = (state, editedItem) => {
    let items = state.map(item => item.id == editedItem.id ? editedItem : item);
    AsyncStorage.setItem(itemsStorageKey, JSON.stringify(items));
    return items;
}

export default editItemReducer;