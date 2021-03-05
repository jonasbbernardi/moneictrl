import Constants from 'expo-constants';
import {
    GOOGLE_ADMOB_ADD_ID,
    GOOGLE_ADMOB_VIEW_ID,
    GOOGLE_ADMOB_EDIT_ID,
    GOOGLE_ADMOB_SETTINGS_ID
} from '@env';

const googleAdmobBannerTestID = 'ca-app-pub-3940256099942544/6300978111';
global.google_admob_add_id = Constants.isDevice && !__DEV__ ? GOOGLE_ADMOB_ADD_ID : googleAdmobBannerTestID;
global.google_admob_view_id = Constants.isDevice && !__DEV__ ? GOOGLE_ADMOB_VIEW_ID : googleAdmobBannerTestID;
global.google_admob_edit_id = Constants.isDevice && !__DEV__ ? GOOGLE_ADMOB_EDIT_ID : googleAdmobBannerTestID;
global.google_admob_settings_id = Constants.isDevice && !__DEV__ ? GOOGLE_ADMOB_SETTINGS_ID : googleAdmobBannerTestID;

// Get width
import { PixelRatio } from 'react-native';

let fontScale = PixelRatio.getFontScale();
global.fontScales = {
	NORMAL: 'NORMAL',
	LARGE: 'LARGE',
    LARGEST: 'LARGEST'
};
if(fontScale == 1) global.fontScale = fontScales.NORMAL;
if(fontScale > 1) global.fontScale = fontScales.LARGE;
if(fontScale > 1.2) global.fontScale = fontScales.LARGEST;

global.itemsStorageKey = '@moneictrl_items';
global.gActions = {
    // Items
    GET_STORAGE_ITEMS: 'GET_STORAGE_ITEMS',
    INIT_LIST: 'INIT_LIST',
    ADD_ITEM: 'ADD_ITEM',
    EDIT_ITEM: 'EDIT_ITEM',
    DONE_ITEM: 'DONE_ITEM',
    UNDONE_ITEM: 'UNDONE_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    CLEAR_ITEMS: 'CLEAR_ITEMS',
    // Current Month
    CHANGE_MONTH: 'CHANGE_MONTH',
    RESET_MONTH: 'RESET_MONTH',
    // Filter by fields
    FILTER_BY_DESCRIPTION: 'FILTER_BY_DESCRIPTION',
    FILTER_BY_TYPE: 'FILTER_BY_TYPE',
    // Current items (used for filters)
    LOAD_CURRENT_ITEMS: 'LOAD_CURRENT_ITEMS',
    CHANGE_LOCALE: 'CHANGE_LOCALE'
}
global.gTypes = {
    EXPENSE: 'EXPENSE',
    REVENUE: 'REVENUE'
}
global.btnOpacity = 0.8;
