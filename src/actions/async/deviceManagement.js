import { fetchWebApi, putDashboardWebApi } from '../../webapis/dashboard';
import { getAccessToken } from '../../StoreHelper';
import { handleFetchError } from '../../util/errorHandler';
import { createDeviceList, fetchDeviceInfo, changeStatus } from '../deviceList';
import endpoints from '../../endpoints/deviceManagement';

export function fetchDeviceList(data, disp = 10) {
    const url = `${endpoints.deviceListPath}?page=${data.pageNo}&&size=${disp}&&sortby=${data.sortBy}&&asc=${data.asc}&&status=${data.isActive}&&search=${data.search}&&paired=${data.paired}`;
    return (dispatch, getState) => fetchWebApi(getAccessToken(getState), url).request
        .then(response => {
            dispatch(createDeviceList(response.data));
            return response;
        })
        .catch(error => {
            handleFetchError(error, dispatch);
            return error;
        });
}

export function fetchDeviceDetails(id) {
    const url = `${endpoints.deviceListPath}/${id}`;
    return (dispatch, getState) => fetchWebApi(getAccessToken(getState), url).request
        .then(response => {
            dispatch(fetchDeviceInfo(response.data));
            return response;
        })
        .catch(error => {
            handleFetchError(error, dispatch);
            return error;
        });
}

export function changeDeviceStatus(data) {
    const url = endpoints.deviceChangeStatusPath;
    return (dispatch, getState) => putDashboardWebApi(getAccessToken(getState), url, data).request
        .then(response => {
            dispatch(changeStatus(response.data));
            return response;
        })
        .catch(error => {
            handleFetchError(error, dispatch);
            return error;
        });
}
