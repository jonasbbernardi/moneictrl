import { createAsyncThunk } from '@reduxjs/toolkit';

const init = createAsyncThunk(
    'locale/init',
    async () => {
        let locale = await storage.get(localeStorageKey);
        locale = JSON.parse(locale);
        return {...locale, loaded: true};
    }
);

export default init;