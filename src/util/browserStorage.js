import cookie from 'react-cookie';
import Promise from 'bluebird';
import {
    BROWSER_STORAGE,
    GOOGLE_SUPPORT,
    MOZILLA_SUPPORT,
    SAFARI_SUPPORT,
    OPERA_SUPPORT,
    IE_SUPPORT,
    BLINK_SUPPORT,
} from '../constants';
import { COOKIE_EXPIRY_TIME } from '../appConfig';

export function setUserStorage({ token }) {
    cookie.save(
        BROWSER_STORAGE.ACCESS_TOKEN,
        JSON.stringify(
            {
                token,
            },
        ),
        {
            maxAge: COOKIE_EXPIRY_TIME,
        },
    );
}

export function getUserStorage() {
    return cookie.load(BROWSER_STORAGE.ACCESS_TOKEN);
}

export function removeUserStorage() {
    cookie.save(
        BROWSER_STORAGE.ACCESS_TOKEN, '',
        {
            maxAge: 0,
        },
    );
    cookie.remove(BROWSER_STORAGE.ACCESS_TOKEN);
}

export function getCookieUrl() {
    // Opera 8.0+
    const isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Firefox 1.0+
    const isFirefox = typeof InstallTrigger !== 'undefined';
    // Safari 3.0+ "[object HTMLElementConstructor]"
    const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === '[object SafariRemoteNotification]'; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
    // Internet Explorer 6-11
    const isIE = /*@cc_on!@*/false || !!document.documentMode;
    // Edge 20+
    const isEdge = !isIE && !!window.StyleMedia;
    // Chrome 1+
    const isChrome = !!window.chrome && !!window.chrome.webstore;
    // Blink engine detection
    const isBlink = (isChrome || isOpera) && !!window.CSS;

    if (isChrome) {
        return GOOGLE_SUPPORT;
    }

    if (isFirefox) {
        return MOZILLA_SUPPORT;
    }

    if (isSafari) {
        return SAFARI_SUPPORT;
    }

    if (isOpera) {
        return OPERA_SUPPORT;
    }

    if (isIE || isEdge) {
        return IE_SUPPORT;
    }

    if (isBlink) {
        return BLINK_SUPPORT;
    }
    return GOOGLE_SUPPORT;
}

export function getGeoLocation(address) {
    Promise.config({
        cancellation: true,
    });
    const geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
        geocoder.geocode({ address }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK && !results[0].partial_match) {
                const lat = results[0].geometry.location.lat();
                const lng = results[0].geometry.location.lng();
                if (!lat || !lng) {
                    reject(new Error(`Geocode was not successful for the following reason: ${status}`));
                }
                resolve({ results, lat, lng });
            } else {
                reject(new Error(`Geocode was not successful for the following reason: ${status}`));
            }
        });
    });
}
