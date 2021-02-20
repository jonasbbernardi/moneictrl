const removeItem = (id) => {
    return {
        type: gActions.REMOVE_ITEM,
        payload: id
    };
}

export {removeItem};