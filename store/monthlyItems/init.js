import { createAsyncThunk } from '@reduxjs/toolkit';
import oldLoad from './oldLoad';

const init = createAsyncThunk(
    'monthlyItems/init',
    async () => {
        let items = await storage.get(itemsStorageKey);
        let monthlyItems = JSON.parse(items);
        if(!monthlyItems.loaded){
            monthlyItems = oldLoad(monthlyItems);
        }
        return {...monthlyItems, loaded: true};
    }
);

export default init;