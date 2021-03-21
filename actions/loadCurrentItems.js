const loadCurrentItems = () => {
    return async (dispatch, getState) => {
        const state = getState();
        return dispatch({
            type: gActions.LOAD_CURRENT_ITEMS_ASYNC,
            payload: state
        });
    }
}

export default loadCurrentItems;