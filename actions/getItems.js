import 'react-native-get-random-values';

const getStorageItems = () => {
    return {
        type: gActions.GET_STORAGE_ITEMS
    };
}
const initItemsList = (items) => {
    return {
        type: gActions.INIT_LIST,
        payload: items
    }
}

export {getStorageItems, initItemsList};