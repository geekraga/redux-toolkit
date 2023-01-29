import { putDashboardWebApi, postDashboardWebApi } from '../../webapis/dashboard';
import { getAccessToken } from '../../StoreHelper';
import { handleFetchError } from '../../util/errorHandler';
import { updateUserData, updateProfilePic } from '../userDashboard';
import endpoints from '../../endpoints/userDashboard';

export function updateUserDashboard(bodyObject) {
    const url = endpoints.userDashboardPath;
    return (dispatch, getState) => putDashboardWebApi(getAccessToken(getState), url, bodyObject)
      .request.then(response => {
          dispatch(updateUserData(bodyObject));
          return response.status;
      }).catch(error => {
          handleFetchError(error, dispatch);
          return error;
      });
}

export function changeUserPassword(bodyObject) {
    const url = endpoints.updatePasswordPath;
    return (dispatch, getState) => putDashboardWebApi(getAccessToken(getState), url, bodyObject)
        .request.then(response => {
            return response.status;
        }).catch(error => {
            handleFetchError(error, dispatch);
            return error;
        });
}

export function changeProfilePic(bodyObject) {
    const url = endpoints.updateImagePath;
    return (dispatch, getState) => postDashboardWebApi(getAccessToken(getState), url, bodyObject)
        .request.then(response => {
            dispatch(updateProfilePic(response.data.imageurl));
            return response;
        }).catch(error => {
            handleFetchError(error, dispatch);
            return error;
        });
}
