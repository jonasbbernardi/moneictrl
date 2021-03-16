const defaultMoneyMask = '$ [999,999,990].[00]';

const getMoneyMask = (locale) => {
    switch(locale){
        case 'pt':
        case 'pt-BR': return 'R$ [999.999.990],[00]';
        case 'en':
        case 'en-US': return '$ [999,999,990].[00]';
        default: return defaultMoneyMask;
    }
} 

export default getMoneyMask;