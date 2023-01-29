import deepFreeze from 'deep-freeze-es6';
import {
    LOGOUT_SUCCESS,
    SESSION_TERMINATED,
    UPDATE_TAG_STATUS,
    SORT_TAG_LIST,
} from '../constants';

function createTags(state, tagList) {
    const allTags = tagList.records;
    const totalTags = tagList.total;
    return { ...state, allTags, totalTags };
}

function updateTagStatus(state, updatedTag) {
    let exist = false;
    const allTags = state.allTags;
    const changedTag = updatedTag.data;
    const updatedAllTags = allTags.map(tag => {
        if (tag.id === changedTag.id) {
            tag = changedTag;
            exist = true;
        }
        return tag;
    });
    if (!exist) {
        updatedAllTags.unshift(changedTag);
    }
    return { ...state, allTags: updatedAllTags };
}


export default function metaTagsList(state = {}, action = {}) {
    deepFreeze(state);
    deepFreeze(action);

    switch (action.type) {
    case SESSION_TERMINATED:
    case LOGOUT_SUCCESS: return {};
    case UPDATE_TAG_STATUS: return updateTagStatus(state, action.tagStatus);
    case SORT_TAG_LIST: return createTags(state, action.tagsList);
    default: return state;
    }
}
