import { combineReducers, createStore, applyMiddleware  } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cache } from "react-native-cache";
import thunk from 'redux-thunk';

import locale, { init as initLocale } from './locale';
import monthlyItems, {
    init as initItems,
    clear as clearDeletedItems
} from './monthlyItems';
import currentDate from './currentDate';
import currentFilter from './currentFilter';
import currentItems, {load as loadCurrentItems} from './currentItems';

global.storage = new Cache({
    namespace: "monei",
    policy: {
        maxEntries: 50000, // if unspecified, it can have unlimited entries
        stdTTL: 0
    },
    backend: AsyncStorage
});

const reducers = {
    monthlyItems,
    currentDate,
    currentFilter,
    currentItems,
    locale
}

const store = createStore(combineReducers(reducers), applyMiddleware(thunk));

store.dispatch(initLocale());
store.dispatch(initItems());

export { loadCurrentItems, clearDeletedItems };
export default store;