import deepFreeze from 'deep-freeze-es6';
import {
    LOGOUT_SUCCESS,
    SESSION_TERMINATED,
    CREATE_DEVICE_LIST,
    SORT_DEVICE_LIST,
    FETCH_DEVICE_INFO,
    UPDATE_DEVICE_LIST,
} from '../constants';

const intialState = {
    allDevices: [],
};

function allDevices(state, { records, total }) {
    return { ...state, allDevices: records, totalDevices: total };
}

function fetchDeviceInfo(state, { deviceInfo }) {
    return { ...state, deviceInfo };
}

function changeDeviceStatus(state, { deviceStatus }) {
    const allDevices = state.allDevices;
    const updatedDevices = allDevices.map(item => {
       if(item.deviceId === deviceStatus.deviceId) {
         item = deviceStatus;
       }
       return item;
    });
    return{ ...state, allDevices: updatedDevices };
}
export default function devicesList(state = intialState, action = {}) {
    deepFreeze(state);
    deepFreeze(action);

    switch (action.type) {
    case SESSION_TERMINATED:
    case LOGOUT_SUCCESS: return {};
    case CREATE_DEVICE_LIST: return allDevices(state, action.deviceList);
    case SORT_DEVICE_LIST: return allDevices(state, action.deviceList);
    case FETCH_DEVICE_INFO: return fetchDeviceInfo(state, action);
    case UPDATE_DEVICE_LIST: return changeDeviceStatus(state, action);
    default: return state;
  }
}
