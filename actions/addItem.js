import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const addExpense = (description, value) => {
    return addItem({type: gTypes.EXPENSE, description, value});
}

const addRevenue = (description, value) => {
    return addItem({type: gTypes.REVENUE, description, value});
}

const addItem = ({type, description, value}) => {
    return {
        type: gActions.ADD_ITEM,
        payload: { id: uuidv4(), type, description, value }
    };
}

export {addItem, addExpense, addRevenue};