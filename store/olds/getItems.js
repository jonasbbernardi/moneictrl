import { initItemsList } from '../actions/getItems';

const getItems = async () =>{
    try{
        let storageItems = await storage.get(itemsStorageKey);
        return !!storageItems ? JSON.parse(storageItems) : [];
    } catch (e) {
        console.error(e);
    }
    return [];
}
const initListReducer = (state, list) => {
    return list;
};
const getStorageItemsReducer = (state, store) => {
    getItems().then((items) => {
        store.dispatch(initItemsList(items));
    });
    return state;
}

export { initListReducer, getStorageItemsReducer };