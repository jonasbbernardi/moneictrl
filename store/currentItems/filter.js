import moment from "moment";

const getCurrentFromAlways = (always, state) => {
    // Get current filters
    let currentDate = moment(state.currentDate);
    let month = currentDate.month();
    let year = currentDate.year();
    let currentFilter = state.currentFilter;

    // Filter items
    let alwaysItems = always.filter(item => {
        // Filter deleted
        if(!!item.deleted) return false;
        // Filter by type (REVENUE | EXPENSE)
        if(!!currentFilter && !!currentFilter.type){
            if(item.type != currentFilter.type) return false;
        }

        // Check if current is some or after first due_date of item
        let due_date = moment(item.due_date);
        let include = currentDate.isSameOrAfter(due_date);
        if(!include) return false;

        // Filter by description
        if(!!currentFilter && !!currentFilter.description){
            let itemDescription = item.description.toUpperCase();
            let filterDescription = currentFilter.description.toUpperCase();
            if(!itemDescription.includes(filterDescription)) return false;
        }

        // Check if current date is not excluded
        let excluded = false;
        if(!!item.recurring?.exclude){
            if(!!item.recurring.exclude[year]){
                excluded = item.recurring.exclude[year].some(m => m == month);
            }
            return !excluded;
        }

        return true;
    }).map(item => {
        // Set due date month as current one
        let due_date = moment(item.due_date);
        due_date.set('month', month);
        due_date.set('year', year);

        if(!!item.recurring?.done){
            if(!!item.recurring?.done[year]){
                item.done = item.recurring?.done[year].some(m => m == month);
            }
        }
        return {...item, due_date};
    });

    return alwaysItems;
}

const filter = (items, always, state) => {
    let currentFilter = state.currentFilter;

    let currentAlways = getCurrentFromAlways(always, state);

    let currentItems = items.filter(item => {
        // Filter deleted
        if(!!item.deleted) return false;

        // Filter by type (REVENUE | EXPENSE)
        if(!!currentFilter && !!currentFilter.type){
            if(item.type != currentFilter.type) return false;
        }

        // Filter by description
        if(!!currentFilter && !!currentFilter.description){
            let itemDescription = item.description.toUpperCase();
            let filterDescription = currentFilter.description.toUpperCase();
            if(!itemDescription.includes(filterDescription)) return false;
        }

        return true;
    });

    return [...currentItems, ...currentAlways];
}

export default filter;