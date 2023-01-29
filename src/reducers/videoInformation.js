import deepFreeze from 'deep-freeze-es6';
import isEmpty from 'lodash/isEmpty';
import {
    LOGOUT_SUCCESS,
    SESSION_TERMINATED,
    CREATE_VIDEO_DATA,
} from '../constants';

function createVideoData({ videoData }) {
    if (isEmpty(videoData)) {
        return {};
    }
    const tabularData = [];
    Object.keys(videoData).forEach(item => {
        const itemType = typeof (videoData[`${item}`]);
        if ((videoData[`${item}`]) && (itemType !== 'object')) {
            const data = {
                itemKey: item,
                itemValue: videoData[`${item}`],
            };
            tabularData.push(data);
        }
    });
    const { keywords, metatags, localizedInfo, associatedUrls } = videoData;
    return { tabularData, keywords, metatags, localizedInfo, associatedUrls };
}

export default function videoInformation(state = {}, action = {}) {
    deepFreeze(state);
    deepFreeze(action);

    switch (action.type) {
    case SESSION_TERMINATED:
    case LOGOUT_SUCCESS: return {};
    case CREATE_VIDEO_DATA: return createVideoData(action);
    default: return state;
    }
}
