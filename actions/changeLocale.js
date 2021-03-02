const changeLocale = (locale) => {
    return async (dispatch, getState) => {
        return dispatch({
            type: gActions.CHANGE_LOCALE,
            locale
        });
    }
}

export default changeLocale;