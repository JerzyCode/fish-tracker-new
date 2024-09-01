import i18n from 'i18next';
import translationEN from './en/translation.json';
import translationPL from './pl/translation.json';
import {initReactI18next} from "react-i18next";

const resources = {
    en: {
        translation: translationEN,
    },
    pl: {
        translation: translationPL,
    },
};


i18n
    .use(initReactI18next)
    .init({
        resources,
        compatibilityJSON: 'v3',
        lng: 'pl',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n