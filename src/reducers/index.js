import { combineReducers } from 'redux';
import { intlReducer } from 'react-intl-redux';
import runtimeSettings from './runtimeSettings';
import authentication from './authentication';
import userDashboard from './userDashboard';
import dashboardUiStatus from './dashboardUiStatus';
import usersList from './usersList';
import formPage from './formPage';
import metaTagsList from './metaTagsList';
import languages from './languages';
import locationInformation from './locationInformation';
import propertyInformation from './propertyInformation';
import videoList from './videoList';
import videoInformation from './videoInformation';
import devicesList from './devicesList';
import contentSearchManagement from './contentSearch';
import publicVideos from './publicVideos';

const rootReducer = combineReducers({
    intl: intlReducer,
    runtimeSettings,
    authentication,
    userDashboard,
    dashboardUiStatus,
    usersList,
    formPage,
    metaTagsList,
    locationInformation,
    languages,
    propertyInformation,
    videoList,
    videoInformation,
    devicesList,
    contentSearchManagement,
    publicVideos,
});

export default rootReducer;
