const doneItemReducer = (state, {id, currentDate}) => {
    return doneUndoneItem(state, id, true, currentDate);
}

const undoneItemReducer = (state, {id, currentDate}) => {
    return doneUndoneItem(state, id, false, currentDate);
}

const doneUndoneItem = (state, id, done, currentDate) => {
    const currentMonth = currentDate.month();
    const currentYear = currentDate.year();

    let items = state.map(item => {
        if (item.id == id){
            if(!item.recurring?.isRecurring) return {...item, done}
            let dones = item.recurring?.done;
            if(!dones) dones = [];
            if(!done){
                dones = dones.filter(i => {
                    return i.m != currentMonth || i.y != currentYear;
                });
            } else{
                let exists = dones.some(i => i.m == currentMonth && i.y == currentYear);
                if(!exists) dones = [...dones, {m: currentMonth, y: currentYear}];
            }
            return {
                ...item,
                recurring: { ...item.recurring, done: [...dones] }
            };
        }
        else return item;
    });
    let strItems = JSON.stringify(items);
    storage.set(itemsStorageKey, strItems);
    return items;
}

export {doneItemReducer, undoneItemReducer};