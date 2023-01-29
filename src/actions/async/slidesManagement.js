import { postDashboardWebApi } from '../../webapis/dashboard';
import { getAccessToken } from '../../StoreHelper';
import { handleFetchError } from '../../util/errorHandler';
import endpoints from '../../endpoints/slideManagement';

export function initiateSlideOperation(bodyObject) {
    const url = endpoints.slideOperationPath;
    return (dispatch, getState) => postDashboardWebApi(getAccessToken(getState), url, bodyObject).request
        .catch(error => {
            handleFetchError(error, dispatch);
            return { error };
        });
}
