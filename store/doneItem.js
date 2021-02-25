import AsyncStorage from '@react-native-async-storage/async-storage';

const doneItemReducer = (state, id) => {
    return doneUndoneItem(state, id, true);
}

const undoneItemReducer = (state, id) => {
    return doneUndoneItem(state, id, false);
}

const doneUndoneItem = (state, id, done) => {
    let items = state.map(item => {
        if (item.id == id)
            return {...item, done}
        else return item;
    });
    let strItems = JSON.stringify(items);
    AsyncStorage.setItem(itemsStorageKey, strItems);
    return items;
}

export {doneItemReducer, undoneItemReducer};