const defaultMoneyMask = 'MM/DD/YYYY';

const setDateFormatReducer = (locale) => {
    switch(locale){
        case 'pt':
        case 'pt-BR': return 'DD/MM/YYYY';
        case 'en':
        case 'en-US': return 'MM/DD/YYYY';
        default: return defaultMoneyMask;
    }
}

export default setDateFormatReducer;