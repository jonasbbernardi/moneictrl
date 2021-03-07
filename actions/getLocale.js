import 'react-native-get-random-values';

const getStorageLocale = () => {
    return {
        type: gActions.GET_STORAGE_LOCALE
    };
}
const initLocale = (locale) => {
    return {
        type: gActions.INIT_LOCALE,
        payload: locale
    }
}

export {getStorageLocale, initLocale};