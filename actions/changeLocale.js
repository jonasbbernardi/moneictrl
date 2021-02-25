const changeLocale = (locale) => {
    return {
        type: gActions.CHANGE_LOCALE,
        locale
    }
}

export default changeLocale;