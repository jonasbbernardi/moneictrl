const addItemReducer = (state, item) => {
    let items = [...state, item];
    let strItems = JSON.stringify(items);
    storage.set(itemsStorageKey, strItems);
    return items;
}

export default addItemReducer;