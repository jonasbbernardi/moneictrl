import { createAsyncThunk } from '@reduxjs/toolkit';
import loadAsync from './loadAsync';

const load = createAsyncThunk(
    'currentItems/load',
    async (params, thunkApi) => {
        const state = thunkApi.getState();
        return loadAsync(state);
    }
);

export default load;