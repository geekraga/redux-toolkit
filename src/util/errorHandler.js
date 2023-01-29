import axios from 'axios';
import { terminateSession } from '../actions/configSettings';
import { removeUserStorage } from './browserStorage';

export function handleFetchError(error, dispatch) {
    if (axios.isCancel(error)) {
        console.log('Request cancelled:', error.message);
    } else if (error.response && error.response.status === 409 && dispatch) {
        removeUserStorage();
        dispatch(terminateSession());
    } else {
        console.log(error);
    }
}
