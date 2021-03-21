import { createAsyncThunk } from '@reduxjs/toolkit';
import oldLoad from './oldLoad';

const initialState = {
    loaded: false,
    always: [
        // Item
    ],
    items: {
        // [int with year]: {
        //      [int with month]: [
        //          Item
        //      ]
        // }
    }
}

const init = createAsyncThunk(
    'monthlyItems/init',
    async (a,b) => {
        let items = await storage.get(itemsStorageKey);
        let monthlyItems = !!items ? JSON.parse(items) : {...initialState, loaded: true};
        if(!monthlyItems.loaded){
            monthlyItems = oldLoad(monthlyItems);
        }
        return {...monthlyItems, loaded: true};
    }
);

export {initialState};
export default init;