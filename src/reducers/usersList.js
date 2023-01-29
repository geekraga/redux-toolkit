import deepFreeze from 'deep-freeze-es6';
import {
    LOGOUT_SUCCESS,
    SESSION_TERMINATED,
    UPDATE_USER_STATUS,
    SORT_USER_LIST,
} from '../constants';

function createUser(state, userList) {
    const allUsers = userList.records;
    const totalUsers = userList.total;
    return { ...state, allUsers, totalUsers };
}

function updateUserStatus(state, updatedUser) {
    const allusers = state.allUsers;
    const changedUser = updatedUser.data;
    const updatedAllUsers = allusers.map(user => {
        if (user.id === changedUser.id) {
            user = changedUser;
        }
        return user;
    });
    return { ...state, allUsers: updatedAllUsers };
}

export default function usersList(state = {}, action = {}) {
    deepFreeze(state);
    deepFreeze(action);

    switch (action.type) {
    case SESSION_TERMINATED:
    case LOGOUT_SUCCESS: return {};
    case UPDATE_USER_STATUS: return updateUserStatus(state, action.userStatus);
    case SORT_USER_LIST: return createUser(state, action.userList);
    default: return state;
    }
}
