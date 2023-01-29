import {
    GET_VIDEO_INFO,
    EMPTY_VIDEO_INFO_LIST,
    ADD_NEW_LINK_VIDEO,
    HANDLE_VIDEO_INPUT_CHANGE,
    DELETE_VIDEO_CONTENT,
    VALIDATE_LINK_VIDEOS_DATA,
    UPLOAD_PROPERTY_DETAILS,
    PROPERTY_STATUS_CHANGE,
    SORT_PROPERTY,
    PRE_POPULATE_LINK_VIDEO,
    FETCH_DEVICE_LIST,
    UPDATE_LINKED_DEVICE,
    CREATE_PROPERTY_SEARCHED_LIST,
    EMPTY_PROPERTY_SEARCHED_LIST,
    CLEAR_PROPERTY_DATA,
    CREATE_VIDEO_CATEGORIES,
    FETCH_RECOMMENDED_VIDEOS,
    CLEAR_PROPERTY_HOSTED_VIDEOS,
    UPDATE_RECOMMENDED_VIDEOS,
    FETCH_PROPERTY_HOSTED_VIDEOS,
    UPDATE_PROPERTY_HOSTED_VIDEOS,
    ADD_PROPERTY_HOSTED_SLIDES,
    UPDATE_PROPERTY_HOSTED_INFO,
    TOGGLE_LOADER,
    GET_DEFAULT_TEMPLATES,
} from '../constants';


export function videoName(videoNames) {
    return {
        type: GET_VIDEO_INFO,
        videoNames,
    };
}

export function emptyVideoInfo() {
    return {
        type: EMPTY_VIDEO_INFO_LIST,
    };
}

export function addNewContent(chosenData) {
    return {
        type: ADD_NEW_LINK_VIDEO,
        chosenData,
    };
}

export function handleContentInput(keyIndex, value, name) {
    return {
        type: HANDLE_VIDEO_INPUT_CHANGE,
        keyIndex,
        value,
        name,
    };
}

export function deleteLinkVideoContent(keyIndex) {
    return {
        type: DELETE_VIDEO_CONTENT,
        keyIndex,
    };
}

export function validateLinkVideosData() {
    return {
        type: VALIDATE_LINK_VIDEOS_DATA,
    };
}

export function uploadPropertyDetails(propertyInfo) {
    return {
        type: UPLOAD_PROPERTY_DETAILS,
        propertyInfo,
    };
}

export function changeStatus(propertyInfo) {
    return {
        type: PROPERTY_STATUS_CHANGE,
        propertyInfo,
    };
}

export function sortProperty(propertyList) {
    return {
        type: SORT_PROPERTY,
        propertyList,
    };
}

export function populateVideoAssociationList(data) {
    return {
        type: PRE_POPULATE_LINK_VIDEO,
        data,
    };
}

export function fetchDevices(data) {
    const allDeviceList = data.records;
    const linkedDeviceRecords = data.total;
    return {
        type: FETCH_DEVICE_LIST,
        allDeviceList,
        linkedDeviceRecords,
    };
}

export function updateLinkedDevice(enabled, deviceIndex) {
    return {
        type: UPDATE_LINKED_DEVICE,
        enabled,
        deviceIndex,
    };
}


export function createPropertyList(propertyList) {
    return {
        type: CREATE_PROPERTY_SEARCHED_LIST,
        propertyList,
    };
}

export function emptyPropertyList() {
    return {
        type: EMPTY_PROPERTY_SEARCHED_LIST,
    };
}

export function toggleLoadingState(loading) {
    return {
        type: TOGGLE_LOADER,
        loading,
    };
}

export function clearPropertyData(loading) {
    return {
        type: CLEAR_PROPERTY_DATA,
        loading,
    };
}

export function createVideoCategories(categories) {
    return {
        type: CREATE_VIDEO_CATEGORIES,
        categories,
    };
}

export function createPropertyHostVideos(propertyHostInfo) {
    return {
        type: FETCH_PROPERTY_HOSTED_VIDEOS,
        propertyHostInfo,
    };
}

export function clearPropertyHostVideos() {
    return { type: CLEAR_PROPERTY_HOSTED_VIDEOS };
}

export function updatePropertyHostVideos(keyIndex, showError = false, videoUploaded = false) {
    return {
        type: UPDATE_PROPERTY_HOSTED_VIDEOS,
        keyIndex,
        showError,
        videoUploaded,
    };
}

export function fetchPropertyHostSlides(userSlides = []) {
    return {
        type: ADD_PROPERTY_HOSTED_SLIDES,
        userSlides,
    };
}

export function updatePropertyHostedInfo(keyIndex, contentGroup = '', thumbnailUrl = null) {
    return {
        type: UPDATE_PROPERTY_HOSTED_INFO,
        keyIndex,
        contentGroup,
        thumbnailUrl,
    };
}

export function fetchRecommendedVideos(videos, totalVideos, currentCategory, propertyLocationChanged, unSelectedVideos) {
    return {
        type: FETCH_RECOMMENDED_VIDEOS,
        videos,
        totalVideos,
        currentCategory,
        propertyLocationChanged,
        unSelectedVideos,
    };
}

export function updateRecommendedVideos(videoData, index) {
    return {
        type: UPDATE_RECOMMENDED_VIDEOS,
        videoData,
        index,
    };
}

export function getDefaultTemplates({ templateList }) {
    return {
        type: GET_DEFAULT_TEMPLATES,
        templateList,
    };
}
