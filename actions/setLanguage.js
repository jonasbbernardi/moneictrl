const setLanguage = (lang) => {
    return async (dispatch, getState) => {
        return dispatch({
            type: gActions.SET_LOCALE,
            lang
        });
    }
}

export default setLanguage;