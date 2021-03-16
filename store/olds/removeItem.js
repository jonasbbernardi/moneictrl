import moment from 'moment';

const removeItemReducer = (state, id) => {
    let items = state.map(item => {
        if (item.id == id){
            return {
                ...item,
                deleted: moment(),
                value: 0
            };
        } else return item;
    });
    storage.set(itemsStorageKey, JSON.stringify(items));
    return items;
}

export default removeItemReducer;