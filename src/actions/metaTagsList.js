import {
    UPDATE_TAG_STATUS,
    SORT_TAG_LIST,
} from '../constants';

export function sortTagsList(tagsList) {
    return {
        type: SORT_TAG_LIST,
        tagsList,
    };
}

export function changeStatus(tagStatus) {
    return {
        type: UPDATE_TAG_STATUS,
        tagStatus,
    };
}
