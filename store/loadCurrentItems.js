import moment from 'moment';

const loadCurrentItems = ({items, currentMonth, currentFilter}) => {
    let newItems = items.filter(item => {
        // Filter by month
        let byMonth = true;
        if(!!item.due_date){
            let itemMonth = item.due_date;
            if(typeof item.due_date === 'string'){
                itemMonth = moment(item.due_date);
            }
            byMonth = itemMonth.month() == currentMonth.month()
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
        return byMonth && byDescription && byType;
    })
    return newItems;
}

export default loadCurrentItems;