import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import BrowserLanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

const i18next = i18n
    .use(Backend)
    .use(BrowserLanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
    });

export default i18next;
