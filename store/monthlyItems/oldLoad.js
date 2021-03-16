import moment from "moment";

const getAlwaysItem = (item) => {
    let recurring = {};
    if(!!item.recurring.exclude){
        for (const excluded of item.recurring.exclude) {
            if(!recurring.exclude) recurring.exclude = {};
            if(!recurring.exclude[excluded.y]){
                recurring.exclude[excluded.y] = [];
            }
            recurring.exclude[excluded.y].push(excluded.m);
        }
    }
    if(!!item.recurring?.done){
        for (const done of item.recurring.done) {
            if(!recurring.done) recurring.done = {};
            if(!recurring.done[done.y]){
                recurring.done[done.y] = [];
            }
            recurring.done[done.y].push(done.m);
        }
    }
    let newItem = {
        id:          item.id,
        description: item.description,
        value:       item.value,
        due_date:    item.due_date,
        type:        item.type,
        installment: 0,
        totalInstallments: 0,
        recurring
    }
    return newItem;
}

const getOldItem = (item, items) => {
    // Get installments and due date
    let installments = item.recurring?.installments || 1;
    let due_date = moment(item.due_date);
    due_date.add(-1, 'month');

    for (let i = 0; i < installments; i++) {
        let newItem = getAlwaysItem(item);
        // Set new due date
        due_date = due_date.add(1, 'month');
        newItem.due_date = due_date.clone();
        newItem.installment = i+1;

        if(!!item.recurring?.installments){
            newItem.totalInstallments = installments;
        }

        // Get month/year
        let month = due_date.month();
        let year = due_date.year();

        // Check if item is note excluded from recurring
        let excluded = item.recurring?.exclude?.some(excluded => {
            let m = excluded.m == month;
            let y = excluded.y == year;
            return m && y;
        });
        if(!!excluded) continue;

        let done = item.recurring?.done?.some(done => {
            let m = done.m == month;
            let y = done.y == year;
            return m && y;
        });
        newItem.done = done;

        // If not, include inside month
        if(!items[year]) items[year] = {};
        if(!items[year][month]) items[year][month] = [];
        items[year][month].push({...newItem});
    }

    return items;
}

const oldLoad = (oldItems) => {
    let always = [];
    let items = {};
    for (const item of oldItems) {
        // If item is setted to be always, include in always array
        if(item.recurring?.always) {
            let newItem = getAlwaysItem(item);
            always.push(newItem);
            continue;
        }

        items = getOldItem(item, items);
    }

    let montlhyItems = {
        loaded: true,
        always,
        items
    };
    return montlhyItems;
};

export default oldLoad;