import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const slice = createSlice({
    name: 'currentFilter',
    initialState,
    reducers: {
        setDescription: (state, {payload}) => {
            state = {...state, description: payload};
        },
        setType: (state, {payload}) => {
            state = {...state, type: payload};
        },
        reset: (state) => { state = initialState; },
    }
});

export const {setDescription, setType, reset} = slice.actions;
export default slice.reducer;