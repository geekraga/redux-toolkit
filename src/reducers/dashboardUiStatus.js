import deepFreeze from 'deep-freeze-es6';
import {
    CHANGE_DASHBOARD_LOADING_STATUS,
    LOGOUT_SUCCESS,
    SESSION_TERMINATED,
} from '../constants';

function resetLoadingStatus(state) {
    return { ...state, loading: false };
}

function updateLoadingStatus(state, { status }) {
    return { ...state, loading: status };
}

export default function dashboardUiStatus(state = { loading: false }, action = {}) {
    deepFreeze(state);
    deepFreeze(action);

    switch (action.type) {
    case SESSION_TERMINATED:
    case LOGOUT_SUCCESS: return resetLoadingStatus(state);
    case CHANGE_DASHBOARD_LOADING_STATUS: return updateLoadingStatus(state, action);
    default:
        return state;
    }
}
