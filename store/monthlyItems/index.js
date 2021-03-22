import { createSlice } from '@reduxjs/toolkit';
import init, { initialState } from './init';
import clear from './clear';
import addReducer from './add';
import editReducer, { editAll as editAllReducer } from './edit';
import removeReducer from './remove';

/**
 * Item: {
 *     id:             string  - uuid
 *     done:           bool    - Define if item is done (paid/received)
 *     description:    string  - Description from item
 *     value:          decimal - Value from item
 *     due_date:       Date    - Date time that item needs to be done
 *     type:           string  - Type of item (global.gType)
 *     installment:    int     - Current installment (0 is is always)
 *     totalInstallments: int  - Max of installments (0 if is always)
 *     created:        Date    - Date time of creation of item
 *     recurring: {
 *         excluded: {
 *             [int with year]: array - Array containing months (int)
 *         }
 *         done: {
 *             [int with year]: array - Array containing months (int)
 *         }
 *     }
 * }
 */

const slice = createSlice({
    name: 'monthlyItems',
    initialState,
    reducers: {
        add:     addReducer,
        edit:    editReducer,
        editAll: editAllReducer,
        remove:  removeReducer,
    },
    extraReducers: {
        [init.fulfilled]: (state, {payload}) => {
            return {...state, ...payload};
        },
        [clear.fulfilled]: (state, {payload}) => {
            storage.set(itemsStorageKey, JSON.stringify({...payload}));
            return {...payload};
        },
    }
});

export const { add, edit, editAll, remove } = slice.actions;
export { init, clear };
export default slice.reducer;