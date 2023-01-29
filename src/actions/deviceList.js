import {
    CREATE_DEVICE_LIST,
    FETCH_DEVICE_INFO,
    UPDATE_DEVICE_LIST,
} from '../constants';

export function createDeviceList(deviceList) {
    return {
        type: CREATE_DEVICE_LIST,
        deviceList,
    };
}

export function fetchDeviceInfo(deviceInfo) {
    return {
        type: FETCH_DEVICE_INFO,
        deviceInfo,
    };
}

export function changeStatus(deviceStatus) {
    return {
        type: UPDATE_DEVICE_LIST,
        deviceStatus,
    };
}
