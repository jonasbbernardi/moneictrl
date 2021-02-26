import moment from 'moment';

const loadCurrentItems = ({items, currentMonth, currentFilter}) => {
    const currMonth = currentMonth.month();
    const currYear = currentMonth.year();
    let newItems = items.filter(item => {
        // Filter deleted
        if(!!item.deleted) return false;

        // Filter by month
        let itemMonth = item.due_date;
        if(typeof item.due_date === 'string'){
            itemMonth = moment(item.due_date);
        }
        let byMonth = itemMonth.month() == currMonth;

        // Filter recurring
        let byRecurring = false;
        let excluded = false;
        if(!!item.recurring){
            // Check if current month/year was deleted from recurring
            if(item.recurring.exclude){
                excluded = item.recurring.exclude.find(excluded => {
                    let m = excluded.m == currMonth;
                    let y = excluded.y == currYear;
                    return m && y;
                });
            }
            // Check if current month/year is between first and last recurring date
            if(!excluded && !item.recurring.always) {
                let installments = item.recurring.installments - 1;
                let firstMonth = moment(item.due_date);
                let lastMonth = moment(item.due_date).add(installments, 'month');
                let isBeforeLast = currentMonth.isSameOrBefore(lastMonth, 'month');
                let isAfterFirst = currentMonth.isSameOrAfter(firstMonth, 'month');
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
    })
    return newItems;
}

export default loadCurrentItems;