import moment from "moment";

const addOne = (item, state) => {
    let due_date = moment(item.due_date);
    let month = due_date.month();
    let year = due_date.year();

    if(!state.items[year]) state.items[year] = {};
    if(!state.items[year][month]) state.items[year][month] = [];

    state.items[year][month].push(item);

    if(item.installment < item.totalInstallments){
        item.installment++;
        item.due_date = due_date.add(1, 'month');
        return addOne(item, state);
    }
    return state;
}

const add = (state, {payload}) => {
    if(payload.installment == 0){
        state.always.push(payload);
        return state;
    }
    return addOne(payload, state);
}

export default add;