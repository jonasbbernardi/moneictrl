const removeItem = (id) => {
    return async (dispatch) => {
        return dispatch({
            type: gActions.REMOVE_ITEM,
            payload: id
        });
    };
}

export {removeItem};