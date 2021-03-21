import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import init, { initialState } from './init';
import getDateFormat from './dateFormat';
import getMoneyMask from './moneyMask';

const slice = createSlice({
    name: 'locale',
    initialState,
    reducers: {
        set: (state, action) => {
            state = {
                loaded: true,
                lang: action.payload,
                moneyMask: getMoneyMask(action.payload),
                dateFormat: getDateFormat(action.payload),
            }
            storage.set(localeStorageKey, state);
        },
    },
    extraReducers: {
        [init.fulfilled]: (state, {payload}) => {
            if(!!payload) return payload;
        }
    }
});

const isLoaded = createSelector(
    state => state.locale,
    locale => locale.loaded
);

export const { set } = slice.actions;
export { init, isLoaded };

export default slice.reducer;