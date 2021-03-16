const editItemReducer = (state, editedItem) => {
    let items = state.map(item => {
        if (item.id == editedItem.id)
            return {...item, ...editedItem}
        else return item;
    });
    let strItems = JSON.stringify(items);
    storage.set(itemsStorageKey, strItems);
    return items;
}

export default editItemReducer;