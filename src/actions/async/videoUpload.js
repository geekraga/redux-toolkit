import { fetchWebApi, postDashboardWebApi, putDashboardWebApi } from '../../webapis/dashboard';
import { getAccessToken } from '../../StoreHelper';
import { handleFetchError } from '../../util/errorHandler';
import { createVideoUploadData, getVideoContentType } from '../runTimeSettings';
import { fetchLanguageData } from '../common';
import endpoints from '../../endpoints/videoContent';

export function fetchVideoUploadedData(videoToUpdate) {
    const url = `${endpoints.videoDataPath}/${videoToUpdate}`;
    return (dispatch, getState) => fetchWebApi(getAccessToken(getState), url).request
        .then(response => {
            dispatch(createVideoUploadData(response.data));
            return response;
        })
        .catch(error => {
            dispatch(createVideoUploadData({}));
            handleFetchError(error, dispatch);
            return { error };
        });
}

export function fetchLanguages() {
    const url = endpoints.languagePath;
    return (dispatch, getState) => {
        fetchWebApi(getAccessToken(getState), url).request
            .then(response => {
                dispatch(fetchLanguageData(response.data));
            })
            .catch(error => {
                handleFetchError(error, dispatch);
            });
    };
}

export function fetchContentType() {
    const url = endpoints.contentIdPath;
    return (dispatch, getState) => {
        fetchWebApi(getAccessToken(getState), url).request
            .then(response => {
                dispatch(getVideoContentType(response.data));
            })
            .catch(error => {
                handleFetchError(error, dispatch);
            });
    };
}

export function getMetaTags(data) {
    const url = `${endpoints.metaSuggestionPath}?hint=${data}`;
    return (dispatch, getState) => fetchWebApi(getAccessToken(getState), url);
}

export function uploadVideoData(bodyObject) {
    const url = endpoints.uploadContentPath;
    return (dispatch, getState) => postDashboardWebApi(getAccessToken(getState), url, bodyObject).request
        .then(response => {
            return response;
        })
        .catch(error => {
            handleFetchError({ error });
            return { error };
        });
}

export function sendUploadStatus(bodyObject) {
    const url = endpoints.uploadSatausPath;
    return (dispatch, getState) => {
        putDashboardWebApi(getAccessToken(getState), url, bodyObject).request
            .catch(error => {
                handleFetchError(error, dispatch);
            });
    };
}
