import i18n from 'i18n-js';
import en from './translations/en';
import pt from './translations/pt';

i18n.translations = {
    en,
    'en-us': en,
    'en-US': en,
    pt,
    'pt-br': pt,
    'pt-BR': pt
};

i18n.fallbacks = true;


export default i18n;