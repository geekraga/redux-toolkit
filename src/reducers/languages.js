import deepFreeze from 'deep-freeze-es6';

import {
    LOGOUT_SUCCESS,
    SESSION_TERMINATED,
    GET_LANGUAGES,
} from '../constants';

function getLanguageContent(state, { languages }) {
    return [...languages];
}

export default function languages(state = [], action = {}) {
    deepFreeze(state);
    deepFreeze(action);

    switch (action.type) {
    case SESSION_TERMINATED:
    case LOGOUT_SUCCESS: return [];
    case GET_LANGUAGES: return getLanguageContent(state, action);
    default: return state;
    }
}
