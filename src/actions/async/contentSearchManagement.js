import endpoints from '../../endpoints/contentSearchManagement';
import { fetchWebApi } from '../../webapis/dashboard';
import { getAccessToken } from '../../StoreHelper';
import { handleFetchError } from '../../util/errorHandler';
import { fetchFiltersList } from '../contentSearchInformation';

export function fetchFilters() {
    const url = endpoints.fetchFiltersPath;
    return (dispatch, getState) => fetchWebApi(getAccessToken(getState), url).request
        .then(response => {
            dispatch(fetchFiltersList(response.data));
            return response;
        })
        .catch(error => {
            handleFetchError(error, dispatch);
            return error;
        });
}
