import { initLocale } from '../actions/getLocale';
import setMoneyMaskReducer from './setMoneyMask';
import setDateFormatReducer from './setDateFormat';

import * as Localization from 'expo-localization';

const getInitialLocale = () => {
    let initialMoneyMask = setMoneyMaskReducer(Localization.locale);
    let initialDateFormat = setDateFormatReducer(Localization.locale);
    let initialLocale = {
        lang: Localization.locale,
        moneyMask: initialMoneyMask,
        dateFormat: initialDateFormat
    }
    return initialLocale;
}

const getLocale = async () =>{
    var initialLocale = getInitialLocale();
    try{
        let locale = await storage.get(localeStorageKey);
        return !!locale ? JSON.parse(locale) : initialLocale;
    } catch (e) {
        console.error(e);
    }
    return initialLocale;
}
const initLocaleReducer = (state, locale) => {
    return locale;
};
const getStorageLocaleReducer = (state, store) => {
    getLocale().then((locale) => store.dispatch(initLocale(locale)));
    return state;
}

export { initLocaleReducer, getStorageLocaleReducer };