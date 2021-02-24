import Constants from 'expo-constants';
import { GOOGLE_ADMOB_ADD_ID, GOOGLE_ADMOB_EDIT_ID } from '@env';

const googleAdmobBannerTestID = 'ca-app-pub-3940256099942544/6300978111';
const googleAdmobAddID = GOOGLE_ADMOB_ADD_ID;
const googleAdmobEditID = GOOGLE_ADMOB_EDIT_ID;
global.google_admob_add_id = Constants.isDevice && !__DEV__ ? googleAdmobAddID : googleAdmobBannerTestID;
global.google_admob_edit_id = Constants.isDevice && !__DEV__ ? googleAdmobEditID : googleAdmobBannerTestID;

global.itemsStorageKey = '@moneictrl_items';
global.gActions = {
    // Items
    GET_STORAGE_ITEMS: 'GET_STORAGE_ITEMS',
    INIT_LIST: 'INIT_LIST',
    ADD_ITEM: 'ADD_ITEM',
    EDIT_ITEM: 'EDIT_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    CLEAR_ITEMS: 'CLEAR_ITEMS',
    // Current Month
    CHANGE_MONTH: 'CHANGE_MONTH',
    RESET_MONTH: 'RESET_MONTH',
    // Filter by fields
    FILTER_BY_DESCRIPTION: 'FILTER_BY_DESCRIPTION',
    FILTER_BY_TYPE: 'FILTER_BY_TYPE',
    // Current items (used for filters)
    LOAD_CURRENT_ITEMS: 'LOAD_CURRENT_ITEMS'
}
global.gTypes = {
    EXPENSE: 'EXPENSE',
    REVENUE: 'REVENUE'
}
global.btnOpacity = 0.8;
global.moneyMask = "$[999.999.990],[00]";
global.currentDateFormat = 'DD/MM/YYYY';