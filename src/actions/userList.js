import {
    UPDATE_USER_STATUS,
    UPDATE_USER,
    GET_ROLES,
    SORT_USER_LIST,
} from '../constants';

export function changeStatus(userStatus) {
    return {
        type: UPDATE_USER_STATUS,
        userStatus,
    };
}

export function updateUser(userInfo) {
    return {
        type: UPDATE_USER,
        userInfo,
    };
}

export function getRoles(accessRoles) {
    return {
        type: GET_ROLES,
        accessRoles,
    };
}

export function sortUser(userList) {
    return {
        type: SORT_USER_LIST,
        userList,
    };
}
