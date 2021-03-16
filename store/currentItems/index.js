import { createSlice } from '@reduxjs/toolkit';
import load from './load';
import loadAsyncReducer from './loadAsync';

const initialState = {
    items: [],
    loaded: false,
};

const slice = createSlice({
    name: 'currentItems',
    initialState,
    reducers: {
        loadAsync: (state, {payload}) => {
            return loadAsyncReducer(payload);
        }
    },
    extraReducers: {
        [load.pending]: (state, {payload}) => {
            return {...state, loaded: false};
        },
        [load.fulfilled]: (state, {payload}) => {
            return {...payload}
        }
    }
});

export { load };
export default slice.reducer;