import moment from 'moment';

const loadCurrentItems = ({items, currentDate, currentFilter}) => {
    const currentMonth = currentDate.month();
    const currentYear = currentDate.year();
    let newItems = items.filter(item => {
        // Filter deleted
        if(!!item.deleted) return false;

        // Filter by month
        let item_due = item.due_date;
        if(typeof item.due_date === 'string'){
            item_due = moment(item.due_date);
        }
        let byMonth = item_due.month() == currentMonth && item_due.year() == currentYear;

        // Filter recurring
        let byRecurring = false;
        let excluded = false;
        if(!!item.recurring){
            // Check if current month/year was deleted from recurring
            if(item.recurring.exclude){
                excluded = item.recurring.exclude.find(excluded => {
                    let m = excluded.m == currentMonth;
                    let y = excluded.y == currentYear;
                    return m && y;
                });
            }
            // Check if current month/year is between first and last recurring date
            byRecurring = !!item.recurring.always;
            if(!excluded) {
                let isBeforeLast = !!item.recurring.always;
                if(!isBeforeLast){
                    let installments = item.recurring.installments - 1;
                    let lastMonth = moment(item.due_date).add(installments, 'month');
                    isBeforeLast = currentDate.isSameOrBefore(lastMonth, 'month');
                }
                let firstMonth = moment(item.due_date);
                let isAfterFirst = currentDate.isSameOrAfter(firstMonth, 'month');

                byRecurring = isBeforeLast && isAfterFirst;
            }
        }

        // Filter by description
        let byDescription = true;
        if(!!currentFilter && !!currentFilter.description){
            let itemDescription = item.description.toUpperCase();
            let filterDescription = currentFilter.description.toUpperCase();
            byDescription = itemDescription.includes(filterDescription);
        }

        // Filter by type (REVENUE | EXPENSE)
        let byType = true;
        if(!!currentFilter && !!currentFilter.type){
            byType = item.type == currentFilter.type;
        }

        return (byMonth || byRecurring) && !excluded && byDescription && byType;
    }).sort((a, b) => {
        let dueDateA = moment(a.due_date);
        let dueDateB = moment(b.due_date);
        let isAfter = dueDateA.diff(dueDateB, 'days');
        if(isAfter === 0){
            return a.description.localeCompare(b.description);
        }
        return isAfter;
    });
    return newItems;
}

export default loadCurrentItems;