const editItem = (item) => {
    let editedItem = {};

    if(!!item.id) editedItem.id = item.id;
    if(!!item.type) editedItem.type = item.type;
    if(!!item.description) editedItem.description = item.description;
    if(!!item.value) editedItem.value = item.value;
    if(!!item.due_date) editedItem.due_date = item.due_date;
    if(!!item.recurring) editedItem.recurring = item.recurring;

    return {
        type: gActions.EDIT_ITEM,
        payload: editedItem
    };
}

export {editItem};