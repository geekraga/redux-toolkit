import {
    USER_DASHBOARD_RECEIVED,
    UPDATE_USER_DASHBOARD,
    UPDATE_PROFILE_PICTURE,
    UPDATE_REGISTER_DATA,
    REMOVE_REGISTER_DATA,
} from '../constants';


export function userDashboard(dashboard) {
    return {
        type: USER_DASHBOARD_RECEIVED,
        dashboard,
    };
}

export function updateUserData(dashboard) {
    return {
        type: UPDATE_USER_DASHBOARD,
        dashboard,
    };
}

export function updateProfilePic(profilepicurl) {
    return {
        type: UPDATE_PROFILE_PICTURE,
        profilepicurl,
    };
}

export function updateRegisteredUser(registerData) {
    return {
        type: UPDATE_REGISTER_DATA,
        registerData,
    };
}

export function removeRegisteredUser() {
    return {
        type: REMOVE_REGISTER_DATA,
    };
}
