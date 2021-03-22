const getEditedItem = (item) => {
    let editedItem = {};

    editedItem.id = item.id;
    editedItem.done = !!item.done;
    if(!!item.type) editedItem.type = item.type;
    if(!!item.description) editedItem.description = item.description;
    if(!!item.value) editedItem.value = item.value;
    if(!!item.due_date) editedItem.due_date = item.due_date;
    if(!!item.installment) editedItem.installment = item.installment;
    if(!!item.totalInstallments) editedItem.totalInstallments = item.totalInstallments;
    if(!!item.created) editedItem.created = item.created;
    if(!!item.recurring) editedItem.recurring = item.recurring;

    return editedItem;
}
const editItem = (item) => {
    let editedItem = getEditedItem(item);

    return async (dispatch) => {
        return dispatch({
            type: gActions.EDIT_ITEM,
            payload: editedItem
        });
    };
}

const editAll = (item) => {
    let editedItem = getEditedItem(item);

    return async (dispatch) => {
        return dispatch({
            type: gActions.EDIT_ALL_ITEMS,
            payload: editedItem
        });
    };
}

export { editAll };
export default editItem;