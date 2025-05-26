import { getLangNameFromCode } from 'language-name-map';
import ar from '../../translations/ar.json';
import en from '../../translations/en.json';
import { navigatorConfig } from '../utils';
import { getString } from '../utils/storage';
// import mn from '../../translations/mn.json';
import I18n from 'react-native-i18n';

export const translations = {
    en,
    ar,
    // mn,
};

export function getAvailableLocales() {
    const availableLocales = navigatorConfig('availableLocales', ['en', 'ar']);
    return Object.fromEntries(Object.entries(translations).filter(([locale]) => availableLocales.includes(locale)));
}

export function getLocale() {
    return getString('_locale') ?? navigatorConfig('defaultLocale', 'ar');
}

export function getLanguage() {
    const locale = getLocale();
    return { code: locale, ...getLangNameFromCode(locale) };
}

export function translate(key, options) {
    return I18n.t(key, options);
}
