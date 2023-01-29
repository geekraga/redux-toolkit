import {
    UPDATE_CURRENT_TEMPLATE,
    ADD_CURRENT_TEMPLATE,
    UPDATE_SELECTED_TEMPLATE,
    CLEAR_SELECTED_TEMPLATE,
    DELETE_CURRENT_TEMPLATE,
    UPDATE_SELECTED_TEMPLATE_THUMBNAIL,
    CLEAR_DELETE_AND_SLIDE_LIST_ARRAY,
    CREATE_SLIDESHOW,
} from '../constants';

export function updateSlideDesign(updatedTempalte) {
    return {
        type: UPDATE_CURRENT_TEMPLATE,
        updatedTempalte,
    };
}

export function addCurrentTemplate() {
    return {
        type: ADD_CURRENT_TEMPLATE,
    };
}

export function updateSelectedTemplate(updatedTemplate) {
    return {
        type: UPDATE_SELECTED_TEMPLATE,
        updatedTemplate,
    };
}
export function clearSelectedTemplate() {
    return {
        type: CLEAR_SELECTED_TEMPLATE,
    };
}

export function deleteCurrentTemplate(templateId) {
    return {
        type: DELETE_CURRENT_TEMPLATE,
        templateId,
    };
}

export function updateTemplateThumbnail(base64Thumbnail) {
    return {
        type: UPDATE_SELECTED_TEMPLATE_THUMBNAIL,
        base64Thumbnail,
    };
}

export function clearDeleteSlidesArray() {
    return {
        type: CLEAR_DELETE_AND_SLIDE_LIST_ARRAY,
    };
}

export function createSlidesPreview(slides, selectedTempalte) {
    return {
        type: CREATE_SLIDESHOW,
        slides,
        selectedTempalte,
    };
}
