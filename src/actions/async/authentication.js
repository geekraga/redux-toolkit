import endpoints from '../../endpoints/authentication';
import { postAuthApi } from '../../webapis/dashboard';
import { tokenGenerator, loginError, logOutUser } from '../configSettings';
import { setUserStorage, removeUserStorage } from '../../util/browserStorage';
import { handleFetchError } from '../../util/errorHandler';

function setToken(dispatch, data) {
    dispatch(tokenGenerator(data));
    setUserStorage(data);
}

export function login(data) {
    const loginUrl = endpoints.loginPath;

    return dispatch => postAuthApi(loginUrl, data).request
        .then(response => {
            setToken(dispatch, response.data);
            return response;
        })
        .catch(error => {
            dispatch(loginError(error));
            handleFetchError(error, dispatch);
            return error.response;
        });
}

export function socialLogin(url, data) {
    return dispatch => postAuthApi(url, data).request
        .then(response => {
            setToken(dispatch, response.data);
            return response;
        })
        .catch(error => {
            dispatch(loginError(error));
            handleFetchError(error, dispatch);
            return error.response;
        });
}

export function forgotPasswordResponse(data) {
    const url = endpoints.forgotPasswordPath;
    return dispatch => postAuthApi(url, data).request
        .then(response => {
            return response;
        })
        .catch(error => {
            handleFetchError(error, dispatch);
            return { error };
        });
}

export function validateToken(data) {
    const url = endpoints.validateTokenPath;
    return dispatch => postAuthApi(url, data).request
        .then(response => {
            return response.status;
        })
        .catch(error => {
            handleFetchError(error, dispatch);
            return error;
        });
}


export function resetForgotPassword(data) {
    const url = endpoints.resetPasswordPath;
    return dispatch => postAuthApi(url, data).request
        .then(response => {
            return response.status;
        })
        .catch(error => {
            handleFetchError(error, dispatch);
            return error;
        });
}


export function logOut() {
    removeUserStorage();
    return dispatch => {
        dispatch(logOutUser());
    };
}
