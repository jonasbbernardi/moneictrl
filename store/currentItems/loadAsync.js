import moment from 'moment';
import filter from './filter';

const loadAsync = (state) => {
    let curr = moment(state.currentDate);
    let month = curr.month();
    let year = curr.year();
    let items = {};
    let always = [];
    if(!!state.monthlyItems){
        items = {...state.monthlyItems.items};
        always = state.monthlyItems.always;
    }

    if(!items[year]) items[year] = {};
    if(!items[year][month]) items[year][month] = [];

    let currentItems = filter(items[year][month], always, state);

    return {items: currentItems, loaded: true};
}

export default loadAsync;