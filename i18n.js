import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from './translations/en';
import pt from './translations/pt';

i18n.translations = {
    en,
    pt,
    'pt-br': pt,
};

i18n.fallbacks = true;

i18n.locale = Localization.locale;

export default i18n;