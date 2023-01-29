import { fetchWebApi } from '../../webapis/dashboard';
import endpoints from '../../endpoints/publicVideos';
import { handleFetchError } from '../../util/errorHandler';
import {
    createPublicVideoCategory,
    createCategoryData,
    createHostData,
    updateSlidesInCategory,
} from '../videoList';
import { fetchLanguageData } from '../common';


function fetchCategoryVideos(dispatch, bodyObj, videoCategories, currentCat = 0) {
    const { propertyId, langId, size } = bodyObj;
    const categoryId = videoCategories[currentCat].id;
    const categoryName = videoCategories[currentCat].name;
    const url = `${endpoints.categoryVideoPath}/${propertyId}?langId=${langId}&categoryId=${categoryId}&page=1&size=${size}`;
    fetchWebApi('', url).request
        .then(res => {
            if (currentCat !== videoCategories.length - 1) {
                fetchCategoryVideos(dispatch, bodyObj, videoCategories, currentCat + 1);
            }
            dispatch(createCategoryData(res.data, categoryName));
        })
        .catch(error => {
            handleFetchError(error, dispatch);
        });
}

export function fetchVideoCategories({ propertyId, langId, size }) {
    const catUrl = `${endpoints.videoCategoriesPath}/${propertyId}`;
    return dispatch => fetchWebApi('', catUrl).request
        .then(response => {
            const videoCategories = response.data;
            dispatch(createPublicVideoCategory(videoCategories));
            fetchCategoryVideos(dispatch, { propertyId, langId, size }, videoCategories);
            return response;
        })
        .catch(error => {
            handleFetchError(error, dispatch);
            return { error };
        });
}

export function fetchSlides({ propertyId, hostVideoTypeId }) {
    const slideUrl = `${endpoints.slideshowPath}/${propertyId}/${hostVideoTypeId}`;
    return dispatch => fetchWebApi('', slideUrl).request
        .then(response => {
            dispatch(updateSlidesInCategory(response.data));
            return response;
        })
        .catch(error => {
            handleFetchError(error, dispatch);
            return { error };
        });
}

export function addVideosInCategory(bodyObj) {
    const { propertyId, categoryId, categoryName, langId, page, size } = bodyObj;
    const url = `${endpoints.categoryVideoPath}/${propertyId}?langId=${langId}&categoryId=${categoryId}&page=${page}&size=${size}`;
    return dispatch => fetchWebApi('', url).request
        .then(res => {
            dispatch(createCategoryData(res.data, categoryName));
        })
        .catch(error => {
            handleFetchError(error, dispatch);
        });
}

export function fetchLanguages() {
    const url = endpoints.languagePath;
    return dispatch => fetchWebApi('', url).request
        .then(response => {
            dispatch(fetchLanguageData(response.data));
            return response;
        })
        .catch(error => {
            handleFetchError(error, dispatch);
            return { error };
        });
}

export function fetchHostdetails(propertyId) {
    const url = `${endpoints.propertyDetilsPath}/${propertyId}`;
    return dispatch => fetchWebApi('', url).request
        .then(response => {
            dispatch(createHostData(response.data));
            return response;
        })
        .catch(error => {
            handleFetchError(error, dispatch);
        });
}
