import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const initialState = moment();

const slice = createSlice({
    name: 'currentDate',
    initialState,
    reducers: {
        set: (state, {payload}) =>  payload,
        reset: (state, action) => moment(),
    }
});

export const { set, reset } = slice.actions;
export default slice.reducer;