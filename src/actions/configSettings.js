import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    SESSION_TERMINATED,
} from '../constants';


export function tokenGenerator({ token }) {
    return {
        type: LOGIN_SUCCESS,
        token,
    };
}

export function logOutUser() {
    return {
        type: LOGOUT_SUCCESS,
    };
}

export function loginError(error) {
    return {
        type: LOGIN_FAILURE,
        error,
    };
}

export function terminateSession() {
    return {
        type: SESSION_TERMINATED,
    };
}
