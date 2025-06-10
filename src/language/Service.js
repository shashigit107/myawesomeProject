import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './en.json'
import den from './den.json'


export const  languageResource={
    
        en: {translation:en},
        den: {translation:den},
      
}


i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: languageResource,
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});

export default i18n;