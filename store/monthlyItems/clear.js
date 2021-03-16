import { createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';

const clear = createAsyncThunk(
    'monthlyItems/clear',
    async (params, thunkApi) => {
        const state = thunkApi.getState();
        const monthlyItems = {...state.monthlyItems};

        let changed = false;

        let always = monthlyItems.always.filter(item => !item.deleted);
        if(always.length < monthlyItems.always.length) changed = true;
        monthlyItems.always = always;

        for (const year of monthlyItems.items) {
            for (const month of monthlyItems.items[year]) {
                let items = monthlyItems.items[year][month].filter(item => !item.deleted);
                if(items.length > monthlyItems.items[year][month].length){
                    changed = true;
                    monthlyItems.items[year][month] = monthlyItems;
                }
            }
        }

        if(!!changed) state.monthlyItems = monthlyItems;
        return state.monthlyItems;
    }
);

export default clear;