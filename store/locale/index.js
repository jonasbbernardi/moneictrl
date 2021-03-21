import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import init, { initialState } from './init';
import getDateFormat from './dateFormat';
import getMoneyMask from './moneyMask';

const slice = createSlice({
    name: 'locale',
    initialState,
    reducers: {
        set: (state, {lang}) => {
            state = {
                loaded: true,
                lang: lang,
                moneyMask: getMoneyMask(lang),
                dateFormat: getDateFormat(lang),
            }
            storage.set(localeStorageKey, state);
            return state;
        },
    },
    extraReducers: {
        [init.fulfilled]: (state, {payload}) => {
            if(!!payload) return payload;
        }
    }
});

export const { set } = slice.actions;
export { init };

export default slice.reducer;