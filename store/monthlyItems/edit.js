import moment from 'moment';

const editOne = (items, payload) => {
    console.log(payload.id);
    let due_date = moment(payload.due_date);
    let month = due_date.month();
    let year = due_date.year();

    if(!items[year]) items[year] = {};
    if(!items[year][month]) items[year][month] = [];

    items[year][month] = items[year][month].map(item => {
        if(item.id == payload.id) return payload;
        return item;
    });
    return items;
}

const editAll = (state, {payload}) => {
    // Get first and total of installments
    let first = payload.installment;
    let total = payload.totalInstallments;

    // Get due date from last month
    let due_date = moment(payload.due_date);
    due_date.add(-1, 'month');

    // Get all items
    let items = {...state.items};

    // Foreach installment set due date to correct month and edit that item
    for (let i = first; i < total; i++) {
        due_date = due_date.add(1, 'month');
        let item = {...payload, due_date};
        items = editOne(items, item);
    }
    // Set state items
    state.items = items;

    return state;
}

const edit = (state, {payload}) => {
    if(payload.installment == 0){
        let always = state.always.map(item => {
            if(item.id == payload.id) return payload;
            return item;
        });
        state.always = always;
        return state;
    }
    let items = {...state.items};
    items = editOne(items, payload);
    state.items = items;

    return state;
}

export { editAll };
export default edit;