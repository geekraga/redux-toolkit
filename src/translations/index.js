import { addLocaleData } from 'react-intl';
import { updateIntl } from 'react-intl-redux';
import moment from 'moment';
import enLocaleData from 'react-intl/locale-data/en';
import enGbMessages from './en-gb';
import { DATEPICKER_LANGUAGE } from '../constants';

// NOTE: this is a polyfill for require.ensure which is only used when testing
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

// Each method in this object returns a promise which handles the asynchronous loading of language data!
// Yes -- the require.ensure syntax is wacky but it's how Webpack defines "code splitting points"
// which define where modules are seperated into a separate chunk/file
export const availableLanguages = {
    'en-gb': () => new Promise((resolve) => {
        resolve({
            locale: 'en-gb',
            messages: enGbMessages,
            localeData: enLocaleData,
        });
    }),
    'fr-fr': () => new Promise((resolve) => {
        require.ensure(['./fr-fr', 'react-intl/locale-data/fr'], (require) => {
            resolve({
                locale: 'fr-fr',
                messages: require('./fr-fr').default,
                localeData: require('react-intl/locale-data/fr'),
            });
        }, 'locale-fr-fr');
    }),
    'zh': () => new Promise((resolve) => {
        require.ensure(['./zh', 'react-intl/locale-data/zh'], (require) => {
            resolve({
                locale: 'zh',
                messages: require('./zh').default,
                localeData: require('react-intl/locale-data/zh'),
            });
        }, 'locale-zh');
    }),
};

// Alaises
availableLanguages.en = availableLanguages['en-gb'];
availableLanguages.fr = availableLanguages['fr-fr'];
availableLanguages.zh = availableLanguages['zh'];

export function setLanguage(dispatch = () => {}, languageCode) {
    moment.locale(DATEPICKER_LANGUAGE[languageCode]);
    const languageItem = (availableLanguages[languageCode] || availableLanguages.en)();

    // return a promise so that it is known when the asynchronous language load has finished
    return new Promise((resolve, reject) => {
        // dispatch the updateIntl action and add the locale data after the
        // data has been loaded asynchronously
        languageItem.then(({ locale, messages, localeData }) => {
            addLocaleData(localeData); // must be done defore the action is dispatched
            dispatch(updateIntl({ locale, messages }));
            resolve({ locale });
        }).catch(reject);
    });
}
