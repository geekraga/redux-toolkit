import deepFreeze from 'deep-freeze-es6';
import cloneDeep from 'lodash/cloneDeep';
import trim from 'lodash/trim';
import omit from 'lodash/omit';

import {
    LOGOUT_SUCCESS,
    SESSION_TERMINATED,
    GET_VIDEO_INFO,
    ADD_NEW_LINK_VIDEO,
    HANDLE_VIDEO_INPUT_CHANGE,
    DELETE_VIDEO_CONTENT,
    VALIDATE_LINK_VIDEOS_DATA,
    UPLOAD_PROPERTY_DETAILS,
    SORT_PROPERTY,
    PRE_POPULATE_LINK_VIDEO,
    PROPERTY_STATUS_CHANGE,
    FETCH_DEVICE_LIST,
    UPDATE_LINKED_DEVICE,
    EMPTY_VIDEO_INFO_LIST,
    CREATE_PROPERTY_SEARCHED_LIST,
    EMPTY_PROPERTY_SEARCHED_LIST,
    CLEAR_PROPERTY_DATA,
    CREATE_VIDEO_CATEGORIES,
    FETCH_RECOMMENDED_VIDEOS,
    UPDATE_RECOMMENDED_VIDEOS,
    FETCH_PROPERTY_HOSTED_VIDEOS,
    CLEAR_PROPERTY_HOSTED_VIDEOS,
    UPDATE_PROPERTY_HOSTED_VIDEOS,
    ADD_PROPERTY_HOSTED_SLIDES,
    UPDATE_PROPERTY_HOSTED_INFO,
    TOGGLE_LOADER,
    GET_DEFAULT_TEMPLATES,
    UPDATE_CURRENT_TEMPLATE,
    ADD_CURRENT_TEMPLATE,
    UPDATE_SELECTED_TEMPLATE,
    CLEAR_SELECTED_TEMPLATE,
    UPDATE_SELECTED_TEMPLATE_THUMBNAIL,
    DELETE_CURRENT_TEMPLATE,
    CLEAR_DELETE_AND_SLIDE_LIST_ARRAY,
} from '../constants';

const initialRuntimeSettings = {
    propertyList: [],
    prePopulatedPropertyData: [],
    videoAssociationList: [],
    videoNameHintSearch: [],
    displayOrderCategory: [],
    isAllDataValid: false,
    allDeviceList: [],
    propertySearchedList: [],
    linkedDeviceRecords: 0,
    videoCategories: [],
    recommendedVideoList: [],
    totalRecommendedVideos: 0,
    totalVideosInCategory: 0,
    unSelectedRecordCount: 0,
    hashRecommended: {},
    propertyHostInfo: [],
    templateList: [],
    loading: false,
    selectedTempalte: {},
    slideList: {},
    lastSlideNumber: 0,
    deletedSlides: [],
};

function createPropertyList(state, { records, total }) {
    return { ...state, propertyList: [...records], totalProperties: total };
}

function getVideoInformation(state, { records }) {
    return { ...state, videoNameHintSearch: [...records] };
}

function emptyVideoInformation(state) {
    return { ...state, videoNameHintSearch: [] };
}

function prepopulateLinkVideoData(state, { data }) {
    const displayOrderCategory = [];
    const assosiationData = data.map(item => {
        return {
            ...item,
            isValid: false,
            validationCheck: false,
            orderValidationCheck: false,
            hostVideoFlag: false,
            actionFlag: 1,
        };
    });
    data.forEach((item, i) => displayOrderCategory.push(i + 1));
    return { ...state, videoAssociationList: assosiationData, displayOrderCategory };
}


function onChangeErrorHandling(videoAssociationList, orderCategory, deleteRow = false) {
    for (let i = videoAssociationList.length - 1; i >= 0; i -= 1) {
        for (let j = 0; j < videoAssociationList.length; j += 1) {
            if (
                videoAssociationList[j].contentId === videoAssociationList[i].contentId &&
                videoAssociationList[j].categoryId === videoAssociationList[i].categoryId
            ) {
                if (i !== j && videoAssociationList[j].categoryId !== '') {
                    videoAssociationList[j].validationCheck = true;
                    videoAssociationList[j].isValid = false;
                } else {
                    videoAssociationList[j].validationCheck = false;
                    videoAssociationList[j].isValid = true;
                }
            }
            if (videoAssociationList[j].order === videoAssociationList[i].order) {
                if (i !== j && videoAssociationList[j].order !== '') {
                    videoAssociationList[j].orderValidationCheck = true;
                    videoAssociationList[j].isValid = false;
                } else {
                    videoAssociationList[j].orderValidationCheck = false;
                    videoAssociationList[j].isValid = true;
                }
            }
        }
        if (deleteRow && videoAssociationList[i].order > orderCategory.length - 1) {
            videoAssociationList[i].order = '';
        }
    }
    return videoAssociationList;
}

function handleContentInput(state, { keyIndex, value, name }) {
    const videoAssociationList = cloneDeep(state.videoAssociationList);
    videoAssociationList[keyIndex][name] = value;
    const videoAssociationListUpdate = onChangeErrorHandling(videoAssociationList);
    return { ...state, videoAssociationList: videoAssociationListUpdate };
}


function validateLinkVideos(state) {
    let isAllDataValid = true;
    const { videoAssociationList } = state;
    const updatedData = videoAssociationList.filter(e => e.actionFlag).map(item => {
        if (!trim(item.categoryId) || !item.contentId || item.validationCheck) {
            isAllDataValid = false;
            return {
                ...item,
                isValid: false,
                validationCheck: true,
            };
        } else if (!item.order || item.orderValidationCheck || !trim(item.order)) {
            isAllDataValid = false;
            return {
                ...item,
                isValid: false,
                orderValidationCheck: true,
            };
        }
        return {
            ...item,
            orderValidationCheck: false,
            validationCheck: false,
            isValid: true,
        };
    });
    const deletedAssociatedVideos = videoAssociationList.filter(e => !e.actionFlag);
    return { ...state, videoAssociationList: [...updatedData, ...deletedAssociatedVideos], isAllDataValid };
}

function propertyStatusChange(state, { propertyInfo }) {
    const propertyList = cloneDeep(state.propertyList);
    const newPropertyList = propertyList.map(list => {
        if (list.id === propertyInfo.data.id) {
            list = propertyInfo.data;
        }
        return list;
    });
    return { ...state, propertyList: newPropertyList };
}

function uploadPropertyInformation(state, { propertyInfo }) {
    return {
        ...state,
        prePopulatedPropertyData: propertyInfo,
        isAllDataValid: false,
        videoAssociationList: [],
        recommendedVideoList: [],
        displayOrderCategory: [],
        totalRecommendedVideos: 0,
        unSelectedRecordCount: 0,
        totalVideosInCategory: 0,
        hashRecommended: {},
    };
}

function fetchDevicesList(state, { allDeviceList, linkedDeviceRecords }) {
    return { ...state, allDeviceList, linkedDeviceRecords };
}


function updateDevicesList(state, { enabled, deviceIndex }) {
    const updatedDeviceInfo = { ...state.allDeviceList[deviceIndex], enabled };
    const updatedDeviceList = [
        ...state.allDeviceList.slice(0, deviceIndex),
        updatedDeviceInfo,
        ...state.allDeviceList.slice(deviceIndex + 1),
    ];
    return { ...state, allDeviceList: updatedDeviceList };
}

function createSearchedProperty(state, { propertyList }) {
    return { ...state, propertySearchedList: [...propertyList] };
}

function resetSearchedProperty(state) {
    return { ...state, propertySearchedList: [] };
}

function resetPropertyData(state, { loading }) {
    return {
        ...state,
        displayOrderCategory: [],
        recommendedVideoList: [],
        videoAssociationList: [],
        totalRecommendedVideos: 0,
        unSelectedRecordCount: 0,
        totalVideosInCategory: 0,
        hashRecommended: {},
        videoCategories: [],
        loading,
    };
}

function createRecommendedCategories(state, { categories }) {
    return { ...state, videoCategories: [...categories] };
}

function calculateDisplayOrder(inputArray) {
    const displayOrderCategory = [];
    if (inputArray.length) {
        const data = inputArray.filter(e => e.actionFlag);
        data.forEach((item, i) => displayOrderCategory.push(i + 1));
    }
    return displayOrderCategory;
}

function createRecommendedVideo(state, { videos, totalVideos, currentCategory, propertyLocationChanged, unSelectedVideos }) {
    const { hashRecommended } = state;
    const recommendedVideoList = propertyLocationChanged ? videos : videos.map(videoData => {
        if (hashRecommended[videoData.contentId]) {
            return {
                ...videoData,
                linkedContent: !!hashRecommended[videoData.contentId].actionFlag,
            };
        }
        return videoData;
    });

    return {
        ...state,
        recommendedVideoList,
        totalRecommendedVideos: currentCategory ? state.totalRecommendedVideos : totalVideos,
        unSelectedRecordCount: currentCategory ? state.unSelectedRecordCount : unSelectedVideos,
        hashRecommended: propertyLocationChanged ? {} : state.hashRecommended,
        totalVideosInCategory: totalVideos,
    };
}

function toggleVideoSelection(state, id) {
    const { recommendedVideoList } = state;
    const associatedVideo = recommendedVideoList.find(x => x.contentId === id);
    const keyIndex = recommendedVideoList.indexOf(associatedVideo);
    if (keyIndex > -1) {
        return [
            ...recommendedVideoList.slice(0, keyIndex),
            {
                ...associatedVideo,
                linkedContent: !associatedVideo.linkedContent,
            },
            ...recommendedVideoList.slice(keyIndex + 1),
        ];
    }
    return [...recommendedVideoList];
}

function addNewContent(state, { chosenData }) {
    const { videoAssociationList } = state;
    const associatedVideo = videoAssociationList.find(x => x.contentId === chosenData.id);
    const predefinedProps = {
        categoryId: '',
        contentId: chosenData.id,
        contentName: chosenData.name,
        order: null,
        orderValidationCheck: false,
        isValid: false,
        validationCheck: false,
        hostVideoFlag: false,
        actionFlag: 1,
    };
    const updatedVideoList = toggleVideoSelection(state, chosenData.id);
    const newVideoAssociationData = [...state.videoAssociationList, { ...associatedVideo, ...predefinedProps }];
    return {
        ...state,
        videoAssociationList: newVideoAssociationData,
        recommendedVideoList: [...updatedVideoList],
        displayOrderCategory: calculateDisplayOrder(newVideoAssociationData),
        videoNameHintSearch: [],
    };
}

function deleteVideoContent(state, { keyIndex }) {
    const orderCategory = cloneDeep(state.displayOrderCategory);
    const videoAssociationList = cloneDeep(state.videoAssociationList);
    const videoToRemove = videoAssociationList[keyIndex];
    const updatedVideoList = toggleVideoSelection(state, videoToRemove.contentId);
    const updateVideoAssociationData = [
        ...videoAssociationList.slice(0, keyIndex),
        {
            ...videoAssociationList[keyIndex],
            actionFlag: 0,
            order: null,
        },
        ...videoAssociationList.slice(keyIndex + 1),
    ];
    const newVideoAssociationData = onChangeErrorHandling(updateVideoAssociationData, orderCategory, true);
    return {
        ...state,
        videoAssociationList: newVideoAssociationData,
        recommendedVideoList: [...updatedVideoList],
        displayOrderCategory: calculateDisplayOrder(newVideoAssociationData),
    };
}

function updateRecommendedVideo(state, { videoData, index }) {
    const { recommendedVideoList } = state;
    const { contentId, linkedContent, categoryId } = videoData;
    const actionFlag = !linkedContent ? 1 : 0;
    const updatedHashTable = { ...state.hashRecommended };

    if (updatedHashTable[videoData.contentId]) {
        delete updatedHashTable[videoData.contentId];
    } else {
        updatedHashTable[videoData.contentId] = { contentId, actionFlag, categoryId };
    }

    return {
        ...state,
        recommendedVideoList: [
            ...recommendedVideoList.slice(0, index),
            { ...recommendedVideoList[index], linkedContent: !recommendedVideoList[index].linkedContent },
            ...recommendedVideoList.slice(index + 1),
        ],
        hashRecommended: updatedHashTable,
    };
}

function createPropertyHostedInfo(state, { propertyHostInfo }) {
    return { ...state, propertyHostInfo };
}

function clearPropertyHostedInfo(state) {
    return { ...state, propertyHostInfo: [] };
}

function updatePropertyHostedInfo(state, { keyIndex, showError, videoUploaded }) {
    const { propertyHostInfo } = state;
    const updatePropertyHostInfo = [
        ...propertyHostInfo.slice(0, keyIndex),
        {
            ...propertyHostInfo[keyIndex],
            showError,
            videoUploaded,
        },
        ...propertyHostInfo.slice(keyIndex + 1),
    ];
    return { ...state, propertyHostInfo: updatePropertyHostInfo };
}

function addPropertySlides(state, { userSlides }) {
    const slideList = {};
    let selectedTempalte = {};
    let { lastSlideNumber } = state;
    if (userSlides.length) {
        selectedTempalte = userSlides[0];
        userSlides.forEach(slide => {
            lastSlideNumber = slide.slideId > lastSlideNumber ? slide.slideId : lastSlideNumber;
            slideList[slide.slideId] = slide;
        });
    } else {
        selectedTempalte = {
            slideId: 0,
            sequence: 1,
            templateId: 1,
            title: '',
            description: '',
            hasUserAdded: true,
        };
        slideList[selectedTempalte.slideId] = selectedTempalte;
        lastSlideNumber = 0;
    }
    return { ...state, slideList, selectedTempalte, lastSlideNumber };
}

function removeSlidesFromPropertyHostedInfo(state, { keyIndex, contentGroup, thumbnailUrl }) {
    const { propertyHostInfo } = state;
    const updatePropertyHostInfo = [
        ...propertyHostInfo.slice(0, keyIndex),
        {
            ...propertyHostInfo[keyIndex],
            contentGroup,
            thumbnailUrl,
        },
        ...propertyHostInfo.slice(keyIndex + 1),
    ];
    return { ...state, propertyHostInfo: updatePropertyHostInfo };
}

function changedLoadingState(state, { loading }) {
    return { ...state, loading };
}

function getDefaultTemplates(state, { templateList }) {
    return { ...state, templateList };
}

function setCurrentTemplate(state, { updatedTempalte }) {
    return { ...state, selectedTempalte: { ...state.selectedTempalte, ...updatedTempalte, actionFlag: 1 } };
}

function addCurrentTemplate(state) {
    const updatedSlideList = { ...state.slideList };
    updatedSlideList[state.selectedTempalte.slideId] = {
        ...updatedSlideList[state.selectedTempalte.slideId],
        ...state.selectedTempalte,
    };
    const slideId = state.lastSlideNumber + 1;
    const { templateId } = state.selectedTempalte;
    const updatedTemplate = {
        templateId,
        title: '',
        description: '',
        slideId,
        sequence: slideId + 1,
        actionFlag: 1,
        hasUserAdded: true,
    };
    const blankTemplate = {};
    blankTemplate[updatedTemplate.slideId] = { ...updatedTemplate };
    return {
        ...state,
        slideList: { ...updatedSlideList, ...blankTemplate },
        selectedTempalte: updatedTemplate,
        lastSlideNumber: slideId,
    };
}

function updateSelectedTemplate(state, { updatedTemplate }) {
    const { base64Image, description, title } = state.selectedTempalte;
    const isDataAvailable = base64Image || description || title;
    const { base64Image: base64, description: desc, title: heading } = state.slideList[state.selectedTempalte.slideId];
    const slideListDataAvailable = base64 || desc || heading;
    const { base64Image: utBase64, description: utDesc, title: utHeading } = updatedTemplate;
    const updateTemplateInfoAvailable = utBase64 || utDesc || utHeading;
    let updateSlideList = {};
    if (!slideListDataAvailable && updateTemplateInfoAvailable) {
        if (isDataAvailable) {
            updateSlideList = { ...state.slideList };
            updateSlideList[state.selectedTempalte.slideId] = { ...state.selectedTempalte };
        } else {
            updateSlideList = omit(state.slideList, state.selectedTempalte.slideId);
        }
        return { ...state, slideList: updateSlideList, selectedTempalte: updatedTemplate };
    }
    updateSlideList[state.selectedTempalte.slideId] = { ...state.selectedTempalte };
    return { ...state, selectedTempalte: updatedTemplate, slideList: { ...state.slideList, ...updateSlideList } };
}

function clearSelectedTemplate(state) {
    const { base64Image, ...oldTemplate } = state.selectedTempalte;
    return { ...state, selectedTempalte: { oldTemplate, title: '', description: '' } };
}

function updateSelectedTemplateThumbail(state, { base64Thumbnail }) {
    const updatedSlideList = cloneDeep(state.slideList);
    updatedSlideList[state.selectedTempalte.slideId].base64Thumbnail = base64Thumbnail;
    return { ...state, slideList: updatedSlideList };
}

function deleteSelectedTemplate(state) {
    const { slideList, deletedSlides, selectedTempalte } = state;
    const { slideId } = selectedTempalte;
    const slideListKeys = Object.keys(slideList);
    const index = slideListKeys.indexOf(`${slideId}`);
    const objectToBeDeleted = slideList[slideId];
    let updatedSlideList = {};
    if (objectToBeDeleted.hasOwnProperty('hasUserAdded')) {
        updatedSlideList = omit(slideList, slideId);
        if (slideListKeys[index - 1]) {
            return { ...state, slideList: updatedSlideList, selectedTempalte: slideList[slideListKeys[index - 1]] };
        }
        return { ...state, slideList: updatedSlideList, selectedTempalte: slideList[slideListKeys[index + 1]] };
    } else {
        let updateDeletedSlide = [];
        const deletedSlideInfo = { slideId, actionFlag: 0 };
        updateDeletedSlide = [...deletedSlides, deletedSlideInfo];
        updatedSlideList = omit(slideList, slideId);
        if (slideListKeys[index - 1]) {
            return {
                ...state,
                slideList: updatedSlideList,
                selectedTempalte: slideList[slideListKeys[index - 1]],
                deletedSlides: updateDeletedSlide,
            };
        }
        return {
            ...state,
            slideList: updatedSlideList,
            selectedTempalte: slideList[slideListKeys[index + 1]],
            deletedSlides: updateDeletedSlide };
    }
}
function clearDeleteSlidesArray(state) {
    return { ...state, deletedSlides: [], slideList: {} };
}

export default function propertyInformation(state = initialRuntimeSettings, action = {}) {
    deepFreeze(state);
    deepFreeze(action);

    switch (action.type) {
    case SESSION_TERMINATED:
    case LOGOUT_SUCCESS: return initialRuntimeSettings;
    case GET_VIDEO_INFO: return getVideoInformation(state, action.videoNames);
    case EMPTY_VIDEO_INFO_LIST: return emptyVideoInformation(state);
    case ADD_NEW_LINK_VIDEO: return addNewContent(state, action);
    case HANDLE_VIDEO_INPUT_CHANGE: return handleContentInput(state, action);
    case DELETE_VIDEO_CONTENT: return deleteVideoContent(state, action);
    case VALIDATE_LINK_VIDEOS_DATA: return validateLinkVideos(state);
    case UPLOAD_PROPERTY_DETAILS: return uploadPropertyInformation(state, action);
    case SORT_PROPERTY: return createPropertyList(state, action.propertyList);
    case PRE_POPULATE_LINK_VIDEO: return prepopulateLinkVideoData(state, action);
    case PROPERTY_STATUS_CHANGE: return propertyStatusChange(state, action);
    case FETCH_DEVICE_LIST: return fetchDevicesList(state, action);
    case UPDATE_LINKED_DEVICE: return updateDevicesList(state, action);
    case CREATE_PROPERTY_SEARCHED_LIST: return createSearchedProperty(state, action);
    case EMPTY_PROPERTY_SEARCHED_LIST: return resetSearchedProperty(state, action);
    case CLEAR_PROPERTY_DATA: return resetPropertyData(state, action);
    case CREATE_VIDEO_CATEGORIES: return createRecommendedCategories(state, action);
    case FETCH_RECOMMENDED_VIDEOS: return createRecommendedVideo(state, action);
    case UPDATE_RECOMMENDED_VIDEOS: return updateRecommendedVideo(state, action);
    case FETCH_PROPERTY_HOSTED_VIDEOS: return createPropertyHostedInfo(state, action);
    case CLEAR_PROPERTY_HOSTED_VIDEOS: return clearPropertyHostedInfo(state);
    case UPDATE_PROPERTY_HOSTED_VIDEOS: return updatePropertyHostedInfo(state, action);
    case ADD_PROPERTY_HOSTED_SLIDES: return addPropertySlides(state, action);
    case UPDATE_PROPERTY_HOSTED_INFO: return removeSlidesFromPropertyHostedInfo(state, action);
    case TOGGLE_LOADER: return changedLoadingState(state, action);
    case GET_DEFAULT_TEMPLATES: return getDefaultTemplates(state, action);
    case UPDATE_CURRENT_TEMPLATE: return setCurrentTemplate(state, action);
    case ADD_CURRENT_TEMPLATE: return addCurrentTemplate(state, action);
    case UPDATE_SELECTED_TEMPLATE: return updateSelectedTemplate(state, action);
    case CLEAR_SELECTED_TEMPLATE: return clearSelectedTemplate(state);
    case UPDATE_SELECTED_TEMPLATE_THUMBNAIL: return updateSelectedTemplateThumbail(state, action);
    case DELETE_CURRENT_TEMPLATE: return deleteSelectedTemplate(state, action);
    case CLEAR_DELETE_AND_SLIDE_LIST_ARRAY: return clearDeleteSlidesArray(state);
    default: return state;
    }
}
