import deepFreeze from 'deep-freeze-es6';
import cloneDeep from 'lodash/cloneDeep';
import trim from 'lodash/trim';
import pick from 'lodash/pick';
import isEmpty from 'lodash/isEmpty';

import {
    LOGOUT_SUCCESS,
    SESSION_TERMINATED,
    CREATE_VIDEO_UPLOAD_DATA,
    ADD_NEW_CONTENT,
    DELETE_CONTENT,
    HANDLE_INPUT_CHANGE,
    LANGUAGE_INPUT_CHANGE,
    ENABLE_VALIDATIONS,
    RADIO_INPUT_CHANGE,
    UPDATE_LOCAL_DATA,
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
    SET_COOKIE_URL,
    USER_DENIED_LOCATION,
    ADD_USER_LOCATION,
} from '../constants';

const initialRuntimeSettings = {
    videoData: {
        localizedInfo: [],
        cityId: 0,
        countryId: 0,
        stateId: 0,
        regionId: 0,
        videoLanguageId: 0,
        contentTypeId: 1,
        credits: '',
        duration: null,
        keywords: [],
        latitude: 0,
        license: '',
        longitude: 0,
        neighborhood: '',
        postalcode: '',
        rights: '',
        source: '',
        expiryDate: '',
        startDate: '',
        title: '',
        address: '',
        copyright: '',
        streamFormat: '',
        contentGroupId: 0,
        defaultLocallanguageId: 0,
        metatags: [],
        isNewVideo: true,
        contentId: 0,
        script: '',
        phone: '',
        website: '',
    },
    localInfoData: [],
    localMetaTagInfo: [],
    isValid: false,
    currentPage: -1,
    isFormPageValid: false,
    videoToUpdate: 0,
    thumbnailVideoId: 0,
    cookieUrl: '',
    locationUrl: '',
    defaultVideoTitle: '',
    userLocation: {
        userDeniedGeolocation: false,
        location: null,
        isUserLocationValid: false,
    },
};

function setCookieLink(state, { cookieUrl, locationUrl }) {
    return { ...state, cookieUrl, locationUrl };
}

function createVideoData(state, { videoData }) {
    let localInfoData = [];
    if (isEmpty(videoData)) {
        const content = {
            name: '',
            languageId: {
                value: '',
                isValid: false,
                selectedError: '',
            },
            description: '',
            defaultLocallanguageId: true,
            checkValidations: false,
            isDataValid: false,
        };
        localInfoData.push(content);
    } else {
        const { defaultLocallanguageId, localizedInfo } = videoData;
        const { videoToUpdate } = state;
        localInfoData = localizedInfo.map(item => {
            const content = {
                name: videoToUpdate ? item.name : '',
                languageId: {
                    value: item.languageId,
                    isValid: true,
                    selectedError: '',
                },
                description: item.description,
                defaultLocallanguageId: item.languageId === defaultLocallanguageId,
                checkValidations: false,
                isDataValid: false,
            };
            return content;
        });
    }
    const updatedVideoData = { ...state.videoData, ...videoData, contentId: 0, isNewVideo: true };
    return { ...state, videoData: updatedVideoData, localInfoData };
}

function createVideoContentType(state, { videoContentGroup }) {
    return { ...state, videoContentGroup };
}

function addContent(state, { content }) {
    const updatedData = [...state.localInfoData, content];
    return { ...state, localInfoData: updatedData };
}

function updateVideoData(state, { data }) {
    const updatedVideoData = { ...state.videoData, ...data };
    return { ...state, videoData: updatedVideoData };
}

function deleteContent(state, { contentIndex }) {
    const localInfoData = cloneDeep(state.localInfoData);
    const updateLocalInfoData = [
        ...localInfoData.slice(0, contentIndex),
        ...localInfoData.slice(contentIndex + 1),
    ];
    let flag = true;
    for (let i = updateLocalInfoData.length - 1; i >= 0; i -= 1) {
        for (let j = 0; j < updateLocalInfoData.length; j += 1) {
            if (updateLocalInfoData[j].languageId.value === updateLocalInfoData[i].languageId.value) {
                if (i !== j && localInfoData[j].languageId.value !== '') {
                    updateLocalInfoData[j].languageId.selectedError = true;
                    updateLocalInfoData[j].languageId.isValid = false;
                    updateLocalInfoData[j].isDataValid = false;
                } else {
                    updateLocalInfoData[j].languageId.selectedError = false;
                    updateLocalInfoData[j].languageId.isValid = true;
                    updateLocalInfoData[j].isDataValid = true;
                }
            }
        }
    }
    for (let i = 0; i < updateLocalInfoData.length; i += 1) {
        if (updateLocalInfoData[i].defaultLocallanguageId) {
            flag = false;
        }
    }
    if (flag) {
        const updatedData = [
            { ...updateLocalInfoData[0], defaultLocallanguageId: true },
            ...updateLocalInfoData.slice(1),
        ];
        return { ...state, localInfoData: updatedData };
    }

    return { ...state, localInfoData: updateLocalInfoData };
}

function handleInputChange(state, { index, name, value }) {
    const localInfoData = cloneDeep(state.localInfoData);
    localInfoData[index][name] = value;
    return { ...state, localInfoData };
}

function languageInputChange(state, { keyIndex, value }) {
    const localInfoData = cloneDeep(state.localInfoData);
    if (localInfoData[keyIndex].languageId.value === value) {
        return { ...state };
    }
    for (let i = localInfoData.length - 1; i >= 0; i -= 1) {
        for (let j = 0; j < localInfoData.length; j += 1) {
            if (localInfoData[j].languageId.value === localInfoData[i].languageId.value) {
                if (i !== j && localInfoData[j].languageId.value !== '') {
                    localInfoData[j].languageId.selectedError = true;
                    localInfoData[keyIndex].languageId.value = value;
                    localInfoData[j].languageId.isValid = false;
                    localInfoData[j].isDataValid = false;
                } else {
                    localInfoData[keyIndex].languageId.value = value;
                    localInfoData[j].languageId.selectedError = false;
                    localInfoData[j].languageId.isValid = true;
                }
            }
        }
    }
    return { ...state, localInfoData };
}

function enableValidations(state) {
    let defaultLocallanguageId = state.videoData.defaultLocallanguageId;
    let defaultVideoTitle = '';

    const updatedData = cloneDeep(state.localInfoData).map(item => {
        if (!trim(item.name) || !trim(item.description) || !item.languageId.isValid) {
            return { ...item, isDataValid: false, checkValidations: true };
        }
        return { ...item, isDataValid: true, checkValidations: false };
    });

    for (let i = 0; i < updatedData.length; i += 1) {
        if (!updatedData[i].isDataValid) {
            return { ...state, localInfoData: updatedData };
        }
    }


    const newLocalizedInfo = updatedData.map(item => {
        if (item.defaultLocallanguageId) {
            defaultVideoTitle = item.name;
            defaultLocallanguageId = item.languageId.value;
        }
        const obj = pick(item, ['name', 'description']);
        obj.languageId = item.languageId.value;
        return obj;
    });

    const updatedVideoData = { ...state.videoData, localizedInfo: [...newLocalizedInfo], defaultLocallanguageId, videoLanguageId: defaultLocallanguageId };
    return { ...state, videoData: updatedVideoData, isValid: true, defaultVideoTitle };
}

function changeRadioInput(state, { changedKey }) {
    const localInfoData = cloneDeep(state.localInfoData);
    localInfoData.forEach((item, i) => {
        if (i === parseInt(changedKey, 10)) {
            item.defaultLocallanguageId = true;
        } else {
            item.defaultLocallanguageId = false;
        }
    });
    return { ...state, localInfoData };
}


function setIsValidState(state) {
    return { ...state, isValid: false };
}

function emptyLocalInfoData(state) {
    return { ...state, localInfoData: [] };
}

function resetLocalInfoData(state) {
    const { localInfoData } = state;
    const updatedLocalInfo = localInfoData.map(item => {
        return { ...item, name: '', checkValidations: false };
    });
    return { ...state, localInfoData: updatedLocalInfo };
}

function prePopulateMetaTags(state, { metatags }) {
    const newMetaTags = cloneDeep(metatags).map(item => {
        return { ...item, isDataValid: false, checkValidations: false };
    });
    return { ...state, localMetaTagInfo: newMetaTags };
}

function searchMetaTagText(state, { tagData }) {
    const localMetaTagInfo = [...state.localMetaTagInfo, tagData];
    return { ...state, localMetaTagInfo };
}

function deleteMetaTagContent(state, { keyIndex }) {
    const updateLocalMetaTagInfoData = [
        ...state.localMetaTagInfo.slice(0, keyIndex),
        ...state.localMetaTagInfo.slice(keyIndex + 1),
    ];
    return { ...state, localMetaTagInfo: updateLocalMetaTagInfoData };
}

function changeMetaTagContentValue(state, { keyIndex, value }) {
    const localMetaTagInfo = cloneDeep(state.localMetaTagInfo);
    localMetaTagInfo[keyIndex].value = value;
    return { ...state, localMetaTagInfo };
}

function validateMetaTags(state, { updatedContent }) {
    const updatedData = cloneDeep(state.localMetaTagInfo).map(item => {
        if (!trim(item.value)) {
            return { ...item, isDataValid: false, checkValidations: true };
        }
        return { ...item, isDataValid: true, checkValidations: false };
    });

    for (let i = 0; i < updatedData.length; i += 1) {
        if (!updatedData[i].isDataValid) {
            return { ...state, localMetaTagInfo: updatedData };
        }
    }

    if (isEmpty(updatedContent)) {
        return state;
    }

    const newMetatagsInfo = updatedData.map(metaTag => {
        delete metaTag.checkValidation;
        delete metaTag.isDataValid;
        return metaTag;
    });
    const updatedVideoData = { ...state.videoData, ...updatedContent, metatags: newMetatagsInfo };
    return { ...state, videoData: updatedVideoData, isValid: true };
}

function updatePageToDisplay(state, { currentPage }) {
    return { ...state, currentPage };
}

function updateVideoId(state, { videoToUpdate }) {
    return { ...state, videoToUpdate, defaultVideoTitle: '' };
}

function updateVideoThumbnailId(state, { keyIndex }) {
    return { ...state, thumbnailVideoId: keyIndex };
}

function validateFormPageToTrue(state) {
    return { ...state, isFormPageValid: true };
}

function removeUserLocation(state) {
    return { ...state, userLocation: { userDeniedGeolocation: true, location: null, isUserLocationValid: false } };
}

function addUserLocation(state, { location, userLatLong }) {
    const { countryId, stateId, cityId } = location;
    const checkLocation = {};
    if (!countryId || !stateId || !cityId) {
        checkLocation.streetAddress = '';
        checkLocation.postalCode = '';
        checkLocation.latitude = '';
        checkLocation.longitude = '';
    }
    return { ...state, userLocation: { userDeniedGeolocation: false, location: { ...location, ...userLatLong, ...checkLocation }, isUserLocationValid: !!location.countryId } };
}

export default function runtimeSettings(state = initialRuntimeSettings, action = {}) {
    deepFreeze(state);
    deepFreeze(action);

    switch (action.type) {
    case SESSION_TERMINATED:
    case LOGOUT_SUCCESS: return initialRuntimeSettings;
    case SET_COOKIE_URL: return setCookieLink(state, action.browserUrl);
    case CREATE_VIDEO_UPLOAD_DATA: return createVideoData(state, action);
    case UPDATE_LOCAL_DATA: return updateVideoData(state, action);
    case CREATE_VIDEO_CONTENT_TYPE: return createVideoContentType(state, action);
    case ADD_NEW_CONTENT: return addContent(state, action);
    case DELETE_CONTENT: return deleteContent(state, action);
    case HANDLE_INPUT_CHANGE: return handleInputChange(state, action);
    case LANGUAGE_INPUT_CHANGE: return languageInputChange(state, action);
    case RADIO_INPUT_CHANGE: return changeRadioInput(state, action);
    case ENABLE_VALIDATIONS: return enableValidations(state);
    case SET_ISVALID_FALSE: return setIsValidState(state);
    case EMPTY_LOCALINFO_DATA: return emptyLocalInfoData(state);
    case RESET_LOCALINFO_DATA: return resetLocalInfoData(state);
    case SEARCH_METATAG: return searchMetaTagText(state, action);
    case DELETE_METATAG: return deleteMetaTagContent(state, action);
    case CHANGE_METATAG_VALUE: return changeMetaTagContentValue(state, action);
    case PRE_POPULATE_METATAGS: return prePopulateMetaTags(state, action);
    case VALIDATE_AND_UPDATE_UPLOAD_DATA: return validateMetaTags(state, action);
    case UPDATE_CURRENT_DISPLAY: return updatePageToDisplay(state, action);
    case UPDATE_VIDEO_DATA: return updateVideoId(state, action);
    case UPDATE_VIDEO_THUMBNAIL_ID: return updateVideoThumbnailId(state, action);
    case VALIDATE_FORM_PAGE: return validateFormPageToTrue(state);
    case USER_DENIED_LOCATION: return removeUserLocation(state);
    case ADD_USER_LOCATION: return addUserLocation(state, action);
    default: return state;
    }
}
