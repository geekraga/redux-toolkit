import { fetchWebApi, postDashboardWebApi, putDashboardWebApi, deleteWebApi } from '../../webapis/dashboard';
import { getAccessToken } from '../../StoreHelper';
import { handleFetchError } from '../../util/errorHandler';
import endpoints from '../../endpoints/propertyManagement';
import {
    videoName,
    uploadPropertyDetails,
    changeStatus,
    sortProperty,
    fetchDevices,
    updateLinkedDevice,
    createPropertyList,
    fetchRecommendedVideos,
    createVideoCategories,
    createPropertyHostVideos,
    fetchPropertyHostSlides,
    updatePropertyHostedInfo,
    getDefaultTemplates,
} from '../propertyInformation';
import { addUserLocation } from '../runTimeSettings';

export function fetchLanguagesName(hintText) {
    const url = `${endpoints.languageNamePath}?hint=${hintText}`;
    return (dispatch, getState) => {
        const currentVideos = fetchWebApi(getAccessToken(getState), url);
        currentVideos.request.then(response => {
            dispatch(videoName(response.data));
        }).catch(error => {
            handleFetchError(error, dispatch);
        });
        return currentVideos;
    };
}

export function uploadPropertyInformation(bodyObject) {
    const url = endpoints.uploadPropertyInfoPath;
    return (dispatch, getState) => postDashboardWebApi(getAccessToken(getState), url, bodyObject).request
        .then(response => {
            dispatch(uploadPropertyDetails(response.data));
            return response;
        })
        .catch(error => {
            handleFetchError(error, dispatch);
            return { error };
        });
}

export function changePropertyStatus(propertyStatusDetail) {
    const url = endpoints.propertyChangeStatusPath;
    return (dispatch, getState) => putDashboardWebApi(getAccessToken(getState), url, propertyStatusDetail).request
        .then(response => {
            dispatch(changeStatus(response));
            return response;
        })
        .catch(error => {
            handleFetchError(error, dispatch);
            return { error };
        });
}

export function sortPropertyList(data, disp = 10) {
    const url = `${endpoints.propertyListPath}?page=${data.pageNo}&&size=${disp}&&sortby=${data.sortBy}&&asc=${data.asc}&&status=${data.isActive}&&search=${data.search}`;
    return (dispatch, getState) => fetchWebApi(getAccessToken(getState), url).request
        .then(response => {
            dispatch(sortProperty(response.data));
            return response;
        })
        .catch(error => {
            handleFetchError(error, dispatch);
            return error;
        });
}

export function getDeviceList(data) {
    const url = `${endpoints.deviceListPath}?search=${data}`;
    return (dispatch, getState) => fetchWebApi(getAccessToken(getState), url).request
        .then(response => {
            const devices = response.status === 200 ? response.data.records : [];
            return devices;
        })
        .catch(error => {
            handleFetchError(error, dispatch);
            return [];
        });
}

export function pairDevice(bodyObject) {
    const url = endpoints.devicePairPath;
    return (dispatch, getState) => postDashboardWebApi(getAccessToken(getState), url, bodyObject).request
        .then(response => {
            return response;
        })
        .catch(error => {
            handleFetchError(error, dispatch);
            return { error };
        });
}

export function unPairDevice(bodyObject) {
    const url = endpoints.deviceUnpairPath;
    return (dispatch, getState) => postDashboardWebApi(getAccessToken(getState), url, bodyObject).request
        .then(response => {
            return response;
        })
        .catch(error => {
            handleFetchError(error, dispatch);
            return { error };
        });
}

export function fetchDeviceList(data, disp = 10) {
    const url = `${endpoints.fetchDeviceListPath}?pid=${data.pId}&&page=${data.pageNo}&&size=${disp}&&sortby=${data.sortBy}&&asc=${data.asc}&&status=&&search=`;
    return (dispatch, getState) => fetchWebApi(getAccessToken(getState), url).request
        .then(response => {
            dispatch(fetchDevices(response.data));
            return response;
        })
        .catch(error => {
            handleFetchError(error, dispatch);
            return error;
        });
}

export function changeDeviceStatus(data, deviceIndex) {
    const url = endpoints.deviceChangeStatusPath;
    return (dispatch, getState) => putDashboardWebApi(getAccessToken(getState), url, data).request
        .then(response => {
            dispatch(updateLinkedDevice(response.data.enabled, deviceIndex));
            return response;
        })
        .catch(error => {
            handleFetchError(error, dispatch);
            return { error };
        });
}

export function propertySearch(data) {
    const url = `${endpoints.propertySearch}?name=${data}`;
    return (dispatch, getState) => {
        const currentSearch = fetchWebApi(getAccessToken(getState), url);
        currentSearch.request.then(response => {
            dispatch(createPropertyList(response.data.records));
        }).catch(error => {
            handleFetchError(error, dispatch);
        });
        return currentSearch;
    };
}

export function propertyVideoUrl(id) {
    const url = `${endpoints.generatePublicVideoUrl}/${id}`;
    return (dispatch, getState) => fetchWebApi(getAccessToken(getState), url).request
        .then(response => {
            return response;
        })
        .catch(error => {
            handleFetchError(error, dispatch);
            return { error };
        });
}

export function getRecommendedVideos(bodyObject, records, pageNumber, propertyLocationChanged) {
    const url = `${endpoints.recommendedVideoUrl}?page=${pageNumber}&&size=${records}`;
    const { categoryIdFilter } = bodyObject;
    return (dispatch, getState) => postDashboardWebApi(getAccessToken(getState), url, bodyObject).request
        .then(response => {
            dispatch(fetchRecommendedVideos(response.data.records, response.data.total, categoryIdFilter, propertyLocationChanged, response.data.unSelectedRecordCount));
        })
        .catch(error => {
            handleFetchError(error, dispatch);
        });
}

export function fetchVideoCategories(bodyObject) {
    const url = `${endpoints.videoCategoriesUrl}?langid=1`;
    return (dispatch, getState) => postDashboardWebApi(getAccessToken(getState), url, bodyObject).request
        .then(response => {
            dispatch(createVideoCategories(response.data));
        })
        .catch(error => {
            handleFetchError(error, dispatch);
            return { error };
        });
}

export function getPropertyHostedVideos(id) {
    const url = `${endpoints.uploadPropertyInfoPath}/${id}/hostVideoList`;
    return (dispatch, getState) => fetchWebApi(getAccessToken(getState), url).request
        .then(response => {
            dispatch(createPropertyHostVideos(response.data));
        })
        .catch(error => {
            handleFetchError(error, dispatch);
        });
}

export function uploadHostVideo(bodyObject) {
    return (dispatch, getState) => postDashboardWebApi(getAccessToken(getState), endpoints.uploadHostVideoUrl, bodyObject).request
        .catch(error => {
            handleFetchError(error, dispatch);
        });
}

export function fetchPropertySlides(id, contentId) {
    const url = `${endpoints.slidesUrl}/${id}/${contentId}/slide`;
    return (dispatch, getState) => fetchWebApi(getAccessToken(getState), url).request
        .then(response => {
            dispatch(fetchPropertyHostSlides(response.data));
        })
        .catch(error => {
            handleFetchError(error, dispatch);
        });
}

export function deletePropertySlides(id, contentId) {
    const url = `${endpoints.slidesUrl}/${id}/${contentId}`;
    return (dispatch, getState) => deleteWebApi(getAccessToken(getState), url).request
        .then(() => {
            dispatch(updatePropertyHostedInfo(contentId - 1));
        })
        .catch(error => {
            handleFetchError(error, dispatch);
        });
}

export function getSlideTemplates() {
    return dispatch => fetchWebApi('', endpoints.templatesUrl).request
        .then(response => {
            dispatch(getDefaultTemplates(response.data));
        })
        .catch(error => {
            handleFetchError(error, dispatch);
        });
}

export function fetchUserAddress({ latitude, longitude }) {
    const url = `${endpoints.autoLocateUrl}?latitude=${latitude}&longitude=${longitude}`;
    return (dispatch, getState) => fetchWebApi(getAccessToken(getState), url).request
        .then(response => {
            dispatch(addUserLocation(response.data, { latitude, longitude }));
        })
        .catch(error => {
            handleFetchError(error, dispatch);
        });
}

