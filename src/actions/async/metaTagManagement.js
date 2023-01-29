import { fetchWebApi, putDashboardWebApi } from '../../webapis/dashboard';
import { getAccessToken } from '../../StoreHelper';
import { handleFetchError } from '../../util/errorHandler';
import { sortTagsList, changeStatus } from '../metaTagsList';
import endpoints from '../../endpoints/tagManagement';

export function changeTagStatus(tagDetails) {
    const url = endpoints.tagChangeStatusPath;
    return (dispatch, getState) => putDashboardWebApi(getAccessToken(getState), url, tagDetails).request
        .then(response => {
            dispatch(changeStatus(response));
            return response;
        })
        .catch(error => {
            handleFetchError(error, dispatch);
            return { error };
        });
}

export function sortMetaTagList(data, disp = 10) {
    const url = `${endpoints.tagListPath}?page=${data.pageNo}&&size=${disp}&&sortby=${data.sortBy}&&asc=${data.asc}&&status=${data.isActive}&&search=${data.search}`;
    return (dispatch, getState) => fetchWebApi(getAccessToken(getState), url).request
        .then(response => {
            dispatch(sortTagsList(response.data));
            return response;
        })
        .catch(error => {
            handleFetchError(error, dispatch);
            return error;
        });
}
