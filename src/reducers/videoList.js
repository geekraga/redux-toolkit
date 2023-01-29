import deepFreeze from 'deep-freeze-es6';
import {
    LOGOUT_SUCCESS,
    SESSION_TERMINATED,
    CREATE_VIDEO_LIST,
    CREATE_VIDEO_ACTIONS,
    UPDATE_VIDEO_LIST,
    UPDATE_CURRENT_ACTION_SEARCH,
    EMPTY_DOWNLOAD_LINK_DATA,
    CREATE_DOWNLOAD_LINK_DATA,
    UPLOAD_IMAGE_THUMBNAILS,
    DELETE_IMAGE_THUMBNAILS,
    BLOCK_UPLOAD_THUMBNAIL,
    UNBLOCK_UPLOAD_THUMBNAIL,
} from '../constants';

const initialRuntimeSettings = {
    allVideos: [],
    actionList: [],
    totalVideos: 0,
    currentSearchAction: '',
    downloadUrls: {},
    videosBlocked: [],
};

function sortActionArray(actions) {
    if (actions && actions.length > 1) {
        return [...actions].sort((a, b) => a.priority - b.priority);
    }
    return actions;
}

function createVideoList(state, { allVideos, totalVideos }) {
    let updatedVideos = [];
    if (allVideos.length) {
        updatedVideos = allVideos.map(video => {
            const actions = sortActionArray(video.actions);
            return { ...video, actions };
        });
    }
    return { ...state, allVideos: updatedVideos, totalVideos };
}

function updateVideoList(state, { videoData, videoIndex }) {
    const { currentSearchAction } = state;

    if (currentSearchAction && currentSearchAction !== videoData.status) {
        const updatedVideos = [
            ...state.allVideos.slice(0, videoIndex),
            ...state.allVideos.slice(videoIndex + 1),
        ];
        return { ...state, allVideos: updatedVideos };
    }
    const actions = sortActionArray(videoData.actions);
    const videoDataToUpdate = { ...state.allVideos[videoIndex], actions, status: videoData.status };
    const updatedVideos = [
        ...state.allVideos.slice(0, videoIndex),
        videoDataToUpdate,
        ...state.allVideos.slice(videoIndex + 1),
    ];
    return { ...state, allVideos: updatedVideos };
}

function createVideoActions(state, { actions }) {
    return { ...state, actionList: [...actions] };
}

function updateImageThumbnails(state, data) {
    const videoData = state.allVideos;
    const updatedVideoData = videoData.map(video => {
        if (video.cid === data.cid) {
            video = data;
        }
        return video;
    });
    return { ...state, allVideos: [...updatedVideoData] };
}

function updateSearchAction(state, { currentSearchAction }) {
    return { ...state, currentSearchAction };
}

function emptyPrepopulatedDownloads(state) {
    return { ...state, downloadUrls: {} };
}

function createDownloadUrlsLinks(state, { downloadLinks }) {
    return { ...state, downloadUrls: downloadLinks };
}

function addVideoToBlock(state, id) {
    return { ...state, videosBlocked: [...state.videosBlocked, id] };
}

function removeVideoToBlock(state, id) {
    const videosBlocked = state.videosBlocked.filter(e => e !== id);
    return { ...state, videosBlocked };
}


export default function videoList(state = initialRuntimeSettings, action = {}) {
    deepFreeze(state);
    deepFreeze(action);

    switch (action.type) {
    case SESSION_TERMINATED:
    case LOGOUT_SUCCESS: return initialRuntimeSettings;
    case CREATE_VIDEO_LIST: return createVideoList(state, action);
    case UPDATE_VIDEO_LIST: return updateVideoList(state, action);
    case CREATE_VIDEO_ACTIONS: return createVideoActions(state, action);
    case UPDATE_CURRENT_ACTION_SEARCH: return updateSearchAction(state, action);
    case EMPTY_DOWNLOAD_LINK_DATA: return emptyPrepopulatedDownloads(state);
    case CREATE_DOWNLOAD_LINK_DATA: return createDownloadUrlsLinks(state, action);
    case UPLOAD_IMAGE_THUMBNAILS: return updateImageThumbnails(state, action.data);
    case DELETE_IMAGE_THUMBNAILS: return updateImageThumbnails(state, action.data);
    case BLOCK_UPLOAD_THUMBNAIL: return addVideoToBlock(state, action.id);
    case UNBLOCK_UPLOAD_THUMBNAIL: return removeVideoToBlock(state, action.id);
    default: return state;
    }
}
