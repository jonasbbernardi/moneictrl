import { createAsyncThunk } from '@reduxjs/toolkit';
import * as Localization from 'expo-localization';
import getDateFormat from './dateFormat';
import getMoneyMask from './moneyMask';

const initialState = {
    loaded: false,
    lang: Localization.locale,
    moneyMask: getMoneyMask(Localization.locale),
    dateFormat: getDateFormat(Localization.locale),
};

const init = createAsyncThunk(
    'locale/init',
    async () => {
        let locale = await storage.get(localeStorageKey);
        locale = !!locale ? JSON.parse(locale) : initialState;
        return {...locale, loaded: true};
    }
);

export { initialState };
export default init;