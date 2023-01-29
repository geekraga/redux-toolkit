import { fetchWebApi, postDashboardWebApi } from '../../webapis/dashboard';
import { getAccessToken } from '../../StoreHelper';
import endpoints from '../../endpoints/videoManagement';
import {
    handleFetchError,
} from '../../util/errorHandler';
import {
    createVideoList,
    updateVideoList,
    createVideoActions,
    createVideoData,
    createDownloadUrlsLinks,
} from '../videoList';

export function fetchVideos(bodyObject) {
    const url = endpoints.videoContentPath;
    return (dispatch, getState) => postDashboardWebApi(getAccessToken(getState), url, bodyObject).request
      .then(response => {
          dispatch(createVideoList(response.data));
      })
      .catch(error => {
          handleFetchError({ error });
      });
}

export function fetchVideoActions() {
    const url = endpoints.actionStatesPath;
    return (dispatch, getState) => fetchWebApi(getAccessToken(getState), url).request
        .then(response => {
            dispatch(createVideoActions(response.data));
        })
        .catch(error => {
            handleFetchError(error, dispatch);
        });
}
function updateVideoData(data, videoIndex, dispatch) {
    const { contentUpdateStatus, actions, updatedState } = data;
    if (contentUpdateStatus) {
        const updatedData = {
            status: updatedState,
            actions,
        };
        dispatch(updateVideoList(updatedData, videoIndex));
        return data.message;
    }
    return '';
}

export function getUpdatedActions(bodyObject, videoIndex) {
    const url = endpoints.actionHandlePath;
    return (dispatch, getState) => postDashboardWebApi(getAccessToken(getState), url, bodyObject).request
        .then(response => {
            return updateVideoData(response.data, videoIndex, dispatch);
        })
        .catch(error => {
            handleFetchError(error, dispatch);
            return '';
        });
}

export function transcodeVideo(videoId, videoIndex) {
    const url = `${endpoints.transcodeActionPath}/${videoId}`;
    return (dispatch, getState) => fetchWebApi(getAccessToken(getState), url).request
        .then(response => {
            return updateVideoData(response.data, videoIndex, dispatch);
        })
        .catch(error => {
            handleFetchError(error, dispatch);
            return '';
        });
}

export function fetchVideoData(id) {
    const url = `${endpoints.videoDataPath}/${id}/preview`;
    return (dispatch, getState) => fetchWebApi(getAccessToken(getState), url).request
        .then(response => {
            dispatch(createVideoData(response.data));
        })
        .catch(error => {
            handleFetchError(error, dispatch);
        });
}

export function fetchDownloadUrls(id) {
    const url = `${endpoints.downloadUrlsPath}/${id}/download`;
    return (dispatch, getState) => fetchWebApi(getAccessToken(getState), url).request
        .then(response => {
            dispatch(createDownloadUrlsLinks(response.data));
        })
        .catch(error => {
            handleFetchError(error, dispatch);
        });
}
