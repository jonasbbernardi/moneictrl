const editItem = ({id, type, description, value, due_date}) => {
    return {
        type: gActions.EDIT_ITEM,
        payload: { id, type, description, value, due_date }
    };
}

export {editItem};