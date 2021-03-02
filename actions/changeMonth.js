const changeMonth = (month) => {
    return async (dispatch, getState) => {
        return dispatch({
            type: gActions.CHANGE_MONTH,
            payload: month
        });
    }
}

export default changeMonth;