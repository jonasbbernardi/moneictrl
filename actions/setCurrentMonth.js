const setMonth = (month) => {
    return async (dispatch, getState) => {
        return dispatch({
            type: gActions.SET_MONTH,
            payload: month
        });
    }
}

export default setMonth;