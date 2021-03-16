const setMonth = (month) => {
    return async (dispatch, getState) => {
        const state = getState();
        setTimeout(() => {
            dispatch({
                type: gActions.LOAD_CURRENT_ITEMS_ASYNC,
                payload: {...state, currentDate: month},
            });
        })
        return dispatch({
            type: gActions.SET_MONTH,
            payload: month
        });
    }
}

export default setMonth;