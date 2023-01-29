import { fetchWebApi, putDashboardWebApi } from '../../webapis/dashboard';
import { getAccessToken } from '../../StoreHelper';
import { handleFetchError } from '../../util/errorHandler';
import { changeStatus, getRoles, updateUser, sortUser } from '../userList';
import endpoints from '../../endpoints/userManagement';

export function getUserRoles() {
    const url = endpoints.userRolesPath;
    return (dispatch, getState) => fetchWebApi(getAccessToken(getState), url).request
        .then(response => {
            dispatch(getRoles(response));
            return response;
        })
        .catch(error => {
            handleFetchError(error, dispatch);
            return error;
        });
}

export function changeUserStatus(userStatusDetail) {
    const url = endpoints.userChangeStatusPath;
    return (dispatch, getState) => putDashboardWebApi(getAccessToken(getState), url, userStatusDetail).request
        .then(response => {
            dispatch(changeStatus(response));
            return response;
        })
        .catch(error => {
            handleFetchError(error, dispatch);
            return error;
        });
}

export function updateUserDetails(userStatusDetail) {
    const url = endpoints.updateUserPath;
    return (dispatch, getState) => putDashboardWebApi(getAccessToken(getState), url, userStatusDetail).request
        .then(response => {
            dispatch(updateUser(response));
            return response;
        })
        .catch(error => {
            handleFetchError(error, dispatch);
            return { error };
        });
}

export function sortUserList(data, disp = 10) {
    const url = `${endpoints.userListPath}?page=${data.pageNo}&&size=${disp}&&sortby=${data.sortBy}&&asc=${data.asc}&&status=${data.isActive}&&search=${data.search}`;
    return (dispatch, getState) => fetchWebApi(getAccessToken(getState), url).request
        .then(response => {
            dispatch(sortUser(response.data));
            return response;
        })
        .catch(error => {
            handleFetchError(error, dispatch);
            return error;
        });
}
