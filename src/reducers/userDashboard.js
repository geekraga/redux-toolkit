import deepFreeze from 'deep-freeze-es6';
import {
    USER_DASHBOARD_RECEIVED,
    UPDATE_USER_DASHBOARD,
    UPDATE_PROFILE_PICTURE,
    LOGOUT_SUCCESS,
    SESSION_TERMINATED,
} from '../constants';

function setUserDashboard(state, { dashboard }) {
    return { ...state, dashboard };
}

function updateUserDashboard(state, { firstname, lastname }) {
    const updatedDashboard = {
        ...state.dashboard,
        firstname,
        lastname,
    };
    return { ...state, dashboard: updatedDashboard };
}

function updateProfileUrl(state, { profilepicurl }) {
    const updatedDashboard = {
        ...state.dashboard,
        profilepicurl,
    };
    return { ...state, dashboard: updatedDashboard };
}

export default function userDashboard(state = {}, action = {}) {
    deepFreeze(state);
    deepFreeze(action);

    switch (action.type) {
    case SESSION_TERMINATED:
    case LOGOUT_SUCCESS: return {};
    case USER_DASHBOARD_RECEIVED: return setUserDashboard(state, action);
    case UPDATE_PROFILE_PICTURE: return updateProfileUrl(state, action);
    case UPDATE_USER_DASHBOARD: return updateUserDashboard(state, action.dashboard);
    default: return state;
    }
}

