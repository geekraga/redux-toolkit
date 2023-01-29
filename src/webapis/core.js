import axios, { CancelToken } from 'axios';

function getConfig(accessToken) {
    let cancel;

    // Return the cancel function and add it to the header.
    // See: https://github.com/mzabriskie/axios#cancellation
    const config = {
        cancelToken: new CancelToken(c => {
          // An executor function receives a cancel function as a parameter
            cancel = c;
        }),
        headers: {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
            Authorization: accessToken,
        },
    };

    return {
        cancel,
        config,
    };
}

export function webapiGet(accessToken, url) {
    const config = getConfig(accessToken);
    return {
        request: axios.get(url, config.config),
        cancel: config.cancel,
    };
}

export function webapiPut(accessToken, url, options) {
    const config = getConfig(accessToken);
    return {
        request: axios.put(url, options, config.config),
        cancel: config.cancel,
    };
}

export function webapiPost(accessToken, url, options) {
    const config = getConfig(accessToken);
    return {
        request: axios.post(url, options, config.config),
        cancel: config.cancel,
    };
}

export function webapiDelete(accessToken, url) {
    const config = getConfig(accessToken);
    return {
        request: axios.delete(url, config.config),
        cancel: config.cancel,
    };
}

export function webapiAuthPost(url, options) {
    return {
        request: axios.post(url, options),
    };
}
