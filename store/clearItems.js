const clearItemsReducer = (state) => {
    let items = state.filter(item => !item.deleted);
    if(state.length != items.length)
        storage.set(itemsStorageKey, JSON.stringify(items));
    return items;
}

export default clearItemsReducer;