const defaultDateFormat = 'MM/DD/YYYY';

const getDateFormat = (locale) => {
    switch(locale){
        case 'pt':
        case 'pt-BR': return 'DD/MM/YYYY';
        case 'en':
        case 'en-US': return 'MM/DD/YYYY';
        default: return defaultDateFormat;
    }
}

export default getDateFormat;