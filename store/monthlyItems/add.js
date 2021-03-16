import moment from "moment";

const addOne = (item, items) => {
    let due_date = moment(item.due_date);
    let month = due_date.month();
    let year = due_date.year();

    if(!items[year]) items[year] = {};
    if(!items[year][month]) items[year][month] = [];

    items[year][month].push(item);

    if(item.installment < item.totalInstallments){
        item.installment++;
        item.due_date = due_date.add(1, 'month');
        return addOne(item, items, nextInstallment);
    }
    return items;
}

const add = (state, {payload}) => {
    if(payload.installment == 0){
        state.always.push(payload);
        return state;
    }
    let items = {...state.items};
    items = addOne(payload, items);

    state.items = items;
    return state;
}

export default add;