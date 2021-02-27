import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const addExpense = ({description, value, due_date, recurring = {}}) => {
    return addItem({
        type: gTypes.EXPENSE,
        description,
        value,
        due_date,
        recurring
    });
}

const addRevenue = ({description, value, due_date, recurring = {}}) => {
    return addItem({
        type: gTypes.REVENUE,
        description,
        value,
        due_date,
        recurring
    });
}

const addItem = ({type, description, value, due_date, recurring}) => {
    return async (dispatch, getState) => {
        return dispatch({
            type: gActions.ADD_ITEM,
            payload: {
                id: uuidv4(),
                type,
                description,
                value,
                due_date,
                recurring,
                done: false,
                created: new Date()
            }
        });
    };
}

export {addItem, addExpense, addRevenue};