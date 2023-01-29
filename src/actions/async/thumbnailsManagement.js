import { fetchWebApi, postDashboardWebApi, putDashboardWebApi } from '../../webapis/dashboard';
import { getAccessToken } from '../../StoreHelper';
import { handleFetchError } from '../../util/errorHandler';
import { upoadThumbnails, fetchThumbnails, deleteThumbnails, blockVideoToUpload, unBlockVideoToUpload } from '../thumbnailsInformation';
import endpoints from '../../endpoints/thumbnailsManagement';

export function fetchImageThumbnails(id) {
    const url = `${endpoints.thumbnailListPath}/${id}/thumbnail`;
    return (dispatch, getState) => fetchWebApi(getAccessToken(getState), url).request
        .then(response => {
            dispatch(fetchThumbnails(response.data));
            return response;
        })
        .catch(error => {
            handleFetchError(error, dispatch);
            return error;
        });
}

export function uploadImageThumbnails(formData, id) {
    const url = `${endpoints.thumbnailListPath}/${id}/thumbnail`;
    return (dispatch, getState) => {
        dispatch(blockVideoToUpload(id));
        postDashboardWebApi(getAccessToken(getState), url, formData).request
            .then(response => {
                dispatch(upoadThumbnails(response));
                dispatch(unBlockVideoToUpload(id));
            })
            .catch(error => {
                handleFetchError(error, dispatch);
                dispatch(unBlockVideoToUpload(id));
            });
    };
}

export function deleteImageThumbnails(data, id) {
    const url = `${endpoints.thumbnailListPath}/${id}/thumbnail`;
    return (dispatch, getState) => putDashboardWebApi(getAccessToken(getState), url, data).request
        .then(response => {
            dispatch(deleteThumbnails(response));
        })
        .catch(error => {
            handleFetchError(error, dispatch);
        });
}

export function setDefaultThumbnail(data) {
    const url = `${endpoints.thumbnailListPath}/${data.videoId}/thumbnail/default/${data.tnIndex}`;
    return (dispatch, getState) => putDashboardWebApi(getAccessToken(getState), url).request
        .then(response => {
            dispatch(deleteThumbnails(response));
            return response;
        })
        .catch(error => {
            handleFetchError(error, dispatch);
            return error;
        });
}
