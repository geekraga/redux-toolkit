import {
    CREATE_VIDEO_UPLOAD_DATA,
    ADD_NEW_CONTENT,
    DELETE_CONTENT,
    HANDLE_INPUT_CHANGE,
    LANGUAGE_INPUT_CHANGE,
    ENABLE_VALIDATIONS,
    UPDATE_LOCAL_DATA,
    RADIO_INPUT_CHANGE,
    CREATE_VIDEO_CONTENT_TYPE,
    SET_ISVALID_FALSE,
    EMPTY_LOCALINFO_DATA,
    RESET_LOCALINFO_DATA,
    SEARCH_METATAG,
    DELETE_METATAG,
    CHANGE_METATAG_VALUE,
    PRE_POPULATE_METATAGS,
    VALIDATE_AND_UPDATE_UPLOAD_DATA,
    UPDATE_CURRENT_DISPLAY,
    UPDATE_VIDEO_DATA,
    UPDATE_VIDEO_THUMBNAIL_ID,
    VALIDATE_FORM_PAGE,
    USER_DENIED_LOCATION,
    ADD_USER_LOCATION,
} from '../constants';

export function createVideoUploadData(videoData) {
    return {
        type: CREATE_VIDEO_UPLOAD_DATA,
        videoData,
    };
}

export function addLocalizedInfoContent(content) {
    return {
        type: ADD_NEW_CONTENT,
        content,
    };
}

export function reomveLocalizedInfoContent(contentIndex) {
    return {
        type: DELETE_CONTENT,
        contentIndex,
    };
}

export function handleInputChange(index, name, value) {
    return {
        type: HANDLE_INPUT_CHANGE,
        index,
        name,
        value,
    };
}

export function inputLanguageChange(keyIndex, value) {
    return {
        type: LANGUAGE_INPUT_CHANGE,
        keyIndex,
        value,
    };
}


export function enableValidationCheck() {
    return {
        type: ENABLE_VALIDATIONS,
    };
}

export function updateLocalContent(data) {
    return {
        type: UPDATE_LOCAL_DATA,
        data,
    };
}

export function radionInputChange(changedKey) {
    return {
        type: RADIO_INPUT_CHANGE,
        changedKey,
    };
}

export function getVideoContentType(videoContentGroup) {
    return {
        type: CREATE_VIDEO_CONTENT_TYPE,
        videoContentGroup,
    };
}

export function setIsValidState() {
    return {
        type: SET_ISVALID_FALSE,
    };
}

export function emptyLocalInfoData() {
    return {
        type: EMPTY_LOCALINFO_DATA,
    };
}

export function resetLocalInfo() {
    return {
        type: RESET_LOCALINFO_DATA,
    };
}

export function searchMetaTag(tagData) {
    return {
        type: SEARCH_METATAG,
        tagData,
    };
}

export function deleteMetaTagContent(keyIndex) {
    return {
        type: DELETE_METATAG,
        keyIndex,
    };
}

export function inputChangeMetaTagValue(keyIndex, value) {
    return {
        type: CHANGE_METATAG_VALUE,
        keyIndex,
        value,
    };
}

export function prePolulateMetaTags(metatags) {
    return {
        type: PRE_POPULATE_METATAGS,
        metatags,
    };
}

export function validateVideoUploadedData(updatedContent) {
    return {
        type: VALIDATE_AND_UPDATE_UPLOAD_DATA,
        updatedContent,
    };
}

export function updateCurrentPage(currentPage) {
    return {
        type: UPDATE_CURRENT_DISPLAY,
        currentPage,
    };
}

export function updateVideoData(videoToUpdate) {
    return {
        type: UPDATE_VIDEO_DATA,
        videoToUpdate,
    };
}

export function updateVideoThumbnailId(keyIndex) {
    return {
        type: UPDATE_VIDEO_THUMBNAIL_ID,
        keyIndex,
    };
}

export function validateFormPageToTrue() {
    return {
        type: VALIDATE_FORM_PAGE,
    };
}

export function userDeniedLocation() {
    return {
        type: USER_DENIED_LOCATION,
    };
}

export function addUserLocation(location, userLatLong) {
    return {
        type: ADD_USER_LOCATION,
        location,
        userLatLong,
    };
}

