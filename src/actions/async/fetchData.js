import endpoints from '../../endpoints/userDashboard';
import { fetchWebApi, postAuthApi } from '../../webapis/dashboard';
import { getAccessToken } from '../../StoreHelper';
import { handleFetchError } from '../../util/errorHandler';
import { userDashboard } from '../userDashboard';
import { terminateSession } from '../configSettings';
import { removeUserStorage } from '../../util/browserStorage';

export function createUser(data) {
    const url = endpoints.createUserPath;
    return dispatch => postAuthApi(url, data).request
        .then(response => {
            return response;
        })
        .catch(error => {
            handleFetchError(error, dispatch);
            return { error };
        });
}


export function verifyUser(data) {
    const url = endpoints.verifyUserPath;
    return dispatch => postAuthApi(url, data).request
        .then(response => {
            return response.status;
        })
        .catch(error => {
            handleFetchError(error, dispatch);
            return error;
        });
}

export function fetchUserAndLoadData(url) {
    return (dispatch, getState) => fetchWebApi(getAccessToken(getState), url).request
        .then(response => {
            dispatch(userDashboard(response.data));
            return response;
        })
        .catch(error => {
            removeUserStorage();
            dispatch(terminateSession());
            return error;
        });
}
