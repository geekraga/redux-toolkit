import deepFreeze from 'deep-freeze-es6';
import {
  LOGOUT_SUCCESS,
  SESSION_TERMINATED,
  GET_ROLES
} from '../constants';


function getUserRoles(state, action) {
  const roles = action.data;
  return { ...state, roles };
}

export default function formPage(state = [], action = {}) {
  deepFreeze(state);
  deepFreeze(action);

  switch (action.type) {
    case SESSION_TERMINATED:
    case LOGOUT_SUCCESS: return {};
    case GET_ROLES: return getUserRoles(state, action.accessRoles);
    default: return state;
  }
}
