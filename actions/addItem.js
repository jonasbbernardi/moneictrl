import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const addExpense = ({description, value, due_date}) => {
    return addItem({type: gTypes.EXPENSE, description, value, due_date});
}

const addRevenue = ({description, value, due_date}) => {
    return addItem({type: gTypes.REVENUE, description, value, due_date});
}

const addItem = ({type, description, value, due_date}) => {
    return {
        type: gActions.ADD_ITEM,
        payload: { id: uuidv4(), type, description, value, due_date }
    };
}

export {addItem, addExpense, addRevenue};