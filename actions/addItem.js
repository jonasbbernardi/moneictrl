import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

const addExpense = (item) => {
    return addItem({
        ...item,
        type: gTypes.EXPENSE,
    });
}

const addRevenue = (item) => {
    return addItem({
        ...item,
        type: gTypes.REVENUE,
    });
}

const addItem = (item) => {
    return async (dispatch, getState) => {
        let id = uuidv4();
        item.id = id;

        return dispatch({
            type: gActions.ADD_ITEM,
            payload: item
        });
    }
}

export {addItem, addExpense, addRevenue};