import deepFreeze from 'deep-freeze-es6';
import isEmpty from 'lodash/isEmpty';
import {
    CREATE_PUBLIC_VIDEO_CATEGORY,
    CREATE_CATEGORY_DATA,
    CREATE_HOST_INFO,
    REMOVE_CATEGORY_DATA,
    UPDATE_SLIDESHOW,
    CREATE_SLIDESHOW,
} from '../constants';

const initialRuntimeSettings = {
    videoPlaylist: [],
    categories: {},
    hostName: '',
    hostAvatar: '',
    propertyName: '',
    slideshow: [],
};

function createPublicVideoCategories(state, { categoryList }) {
    const categories = {};
    categoryList.forEach(cat => {
        categories[cat.name] = {};
    });
    return { ...state, categories };
}

function createCategoryData(state, { catData, catName }) {
    const categories = { ...state.categories };
    const videoPlaylist = [...state.videoPlaylist];
    let updateCategory = {};
    if (isEmpty(categories[catName])) {
        categories[catName] = catData;
    } else {
        updateCategory = { ...categories[catName] };
        updateCategory.contentDetail = [
            ...updateCategory.contentDetail,
            ...catData.contentDetail,
        ];
        updateCategory.pageNumber = catData.pageNumber;
        categories[catName] = { ...categories[catName], ...updateCategory };
    }
    !catData.containsSlide && catData.contentDetail.forEach(videoItem => {
        const videoFile = {
            image: videoItem.thumbnailUrl,
            title: videoItem.videoName,
            file: videoItem.videoUrl,
            desc: videoItem.videoDescription,
        };
        videoPlaylist.push(videoFile);
    });
    return { ...state, categories, videoPlaylist };
}

function createHostData(state, { hostData }) {
    return { ...state, ...hostData };
}

function removeCategoryData(state) {
    return { ...state, videoPlaylist: [], categories: {} };
}

function createSlideshow(state, { slides, selectedTempalte }) {
    const currentSlides = { ...slides };
    currentSlides[selectedTempalte.slideId] = { ...currentSlides[selectedTempalte.slideId], ...selectedTempalte };
    const slideshow = [];
    Object.values(currentSlides).forEach(slide => {
        const { slideId, title, description, templateId, imageUrl, base64Image } = slide;
        const slideItem = {
            slideId,
            title,
            description,
            templateId,
            imageUrl: base64Image || imageUrl,
        };
        slideshow.push(slideItem);
    });
    return { ...state, slideshow };
}

function updateSlideshow(state, { slideshow }) {
    return { ...state, slideshow };
}

export default function publicVideos(state = initialRuntimeSettings, action = {}) {
    deepFreeze(state);
    deepFreeze(action);

    switch (action.type) {
    case CREATE_PUBLIC_VIDEO_CATEGORY: return createPublicVideoCategories(state, action);
    case CREATE_CATEGORY_DATA: return createCategoryData(state, action);
    case CREATE_HOST_INFO: return createHostData(state, action);
    case REMOVE_CATEGORY_DATA: return removeCategoryData(state);
    case UPDATE_SLIDESHOW: return updateSlideshow(state, action);
    case CREATE_SLIDESHOW: return createSlideshow(state, action);
    default: return state;
    }
}
