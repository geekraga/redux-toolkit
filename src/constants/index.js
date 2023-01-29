// authentication

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const SESSION_TERMINATED = 'SESSION_TERMINATED';
export const SET_COOKIE_URL = 'SET_COOKIE_URL';
export const CHANGE_UNAUTH_VIEW = 'CHANGE_UNAUTH_VIEW';

// dashboards

export const CHANGE_DASHBOARD_LOADING_STATUS = 'CHANGE_DASHBOARD_LOADING_STATUS';
export const USER_DASHBOARD_RECEIVED = 'USER_DASHBOARD_RECEIVED';
export const UPDATE_USER_DASHBOARD = 'UPDATE_USER_DASHBOARD';
export const UPDATE_PROFILE_PICTURE = 'UPDATE_PROFILE_PICTURE';
export const UPDATE_REGISTER_DATA = 'UPDATE_REGISTER_DATA';
export const REMOVE_REGISTER_DATA = 'REMOVE_REGISTER_DATA';

// content search

export const RESET_FILTERS = 'RESET_FILTERS';
export const FETCH_FILTERS = 'FETCH_FILTERS';
export const FILTER_CHANGE = 'FILTER_CHANGE';
export const DELETE_FILTER_ACTION = 'DELETE_FILTER_ACTION';
export const APPLY_FILTER_ACTION = 'APPLY_FILTER_ACTION';
export const DELETE_APPLIED_FILTER_ACTION = 'DELETE_APPLIED_FILTER_ACTION';
export const HANDLE_INPUT_FEILD_CHANGE = 'HANDLE_INPUT_FEILD_CHANGE';

// runTimeSettings

export const CREATE_VIDEO_UPLOAD_DATA = 'CREATE_VIDEO_UPLOAD_DATA';
export const GET_LANGUAGES = 'GET_LANGUAGES';
export const ADD_NEW_CONTENT = 'ADD_NEW_CONTENT';
export const DELETE_CONTENT = 'DELETE_CONTENT';
export const HANDLE_INPUT_CHANGE = 'HANDLE_INPUT_CHANGE';
export const LANGUAGE_INPUT_CHANGE = 'LANGUAGE_INPUT_CHANGE';
export const ENABLE_VALIDATIONS = 'ENABLE_VALIDATIONS';
export const UPDATE_LOCAL_DATA = 'UPDATE_LOCAL_DATA';
export const RADIO_INPUT_CHANGE = 'RADIO_INPUT_CHANGE';
export const CREATE_VIDEO_CONTENT_TYPE = 'CREATE_VIDEO_CONTENT_TYPE';
export const SET_ISVALID_FALSE = 'SET_ISVALID_FALSE';
export const EMPTY_LOCALINFO_DATA = 'EMPTY_LOCALINFO_DATA';
export const RESET_LOCALINFO_DATA = 'RESET_LOCALINFO_DATA';
export const USER_DENIED_LOCATION = 'USER_DENIED_LOCATION';
export const ADD_USER_LOCATION = 'ADD_USER_LOCATION';

// metaTags constants

export const SEARCH_METATAG = 'SEARCH_METATAG';
export const DELETE_METATAG = 'DELETE_METATAG';
export const CHANGE_METATAG_VALUE = 'CHANGE_METATAG_VALUE';
export const PRE_POPULATE_METATAGS = 'PRE_POPULATE_METATAGS';
export const VALIDATE_AND_UPDATE_UPLOAD_DATA = 'VALIDATE_AND_UPDATE_UPLOAD_DATA';

// deviceManagement constants

export const CREATE_DEVICE_LIST = 'CREATE_DEVICE_LIST';
export const SORT_DEVICE_LIST = 'SORT_DEVICE_LIST';
export const UPDATE_DEVICE_LIST = 'UPDATE_DEVICE_LIST';
export const FETCH_DEVICE_INFO = 'FETCH_DEVICE_INFO';

// videoManagement Constants

export const CREATE_VIDEO_LIST = 'CREATE_VIDEO_LIST';
export const UPDATE_VIDEO_LIST = 'UPDATE_VIDEO_LIST';
export const UPDATE_CURRENT_ACTION_SEARCH = 'UPDATE_CURRENT_ACTION_SEARCH';
export const CREATE_VIDEO_ACTIONS = 'CREATE_VIDEO_ACTIONS';
export const CREATE_VIDEO_DATA = 'CREATE_VIDEO_DATA';
export const UPDATE_VIDEO_DATA = 'UPDATE_VIDEO_DATA';
export const UPDATE_VIDEO_THUMBNAIL_ID = 'UPDATE_VIDEO_THUMBNAIL_ID';
export const CREATE_DOWNLOAD_LINK_DATA = 'CREATE_DOWNLOAD_LINK_DATA';
export const EMPTY_DOWNLOAD_LINK_DATA = ' EMPTY_DOWNLOAD_LINK_DATA';
export const CREATE_PUBLIC_VIDEO_CATEGORY = ' CREATE_PUBLIC_VIDEO_CATEGORY';
export const CREATE_CATEGORY_DATA = ' CREATE_CATEGORY_DATA';
export const REMOVE_CATEGORY_DATA = ' REMOVE_CATEGORY_DATA';
export const CREATE_HOST_INFO = ' CREATE_HOST_INFO';

// Autocomplete-upload-form configSettings

export const AUTO_COMPLETE_SOURCE_CONFIG = {
    text: 'tagname',
    value: 'tagid',
};

// Autocomplete-property-form configSettings

export const AUTO_COMPLETE_PROPERTY_SOURCE_CONFIG = {
    text: 'name',
    value: 'id',
    description: 'description',
};

// Autocomplete-city-form configSettings

export const AUTO_COMPLETE_CITY_SOURCE_CONFIG = {
    text: 'name',
    value: 'id',
};

// Autocomplete-property-form configSettings

export const AUTO_COMPLETE_PROPERTY_SEARCH_SOURCE_CONFIG = {
    text: 'name',
    value: 'id',
};

// form-page validation

export const VALIDATE_FORM_PAGE = 'VALIDATE_FORM_PAGE';

// property Information

export const GET_VIDEO_INFO = 'GET_VIDEO_INFO';
export const EMPTY_VIDEO_INFO_LIST = 'EMPTY_VIDEO_INFO_LIST';
export const HANDLE_VIDEO_INPUT_CHANGE = 'HANDLE_VIDEO_INPUT_CHANGE';
export const DELETE_VIDEO_CONTENT = 'DELETE_VIDEO_CONTENT';
export const VALIDATE_LINK_VIDEOS_DATA = 'VALIDATE_LINK_VIDEOS_DATA';
export const UPLOAD_PROPERTY_DETAILS = 'UPLOAD_PROPERTY_DETAILS';
export const PROPERTY_STATUS_CHANGE = 'PROPERTY_STATUS_CHANGE';
export const SORT_PROPERTY = 'SORT_PROPERTY';
export const PRE_POPULATE_LINK_VIDEO = 'PRE_POPULATE_LINK_VIDEO';
export const ADD_NEW_LINK_VIDEO = 'ADD_NEW_LINK_VIDEO';
export const FETCH_DEVICE_LIST = 'FETCH_DEVICE_LIST';
export const UPDATE_LINKED_DEVICE = 'UPDATE_LINKED_DEVICE';
export const CREATE_PROPERTY_SEARCHED_LIST = 'CREATE_PROPERTY_SEARCHED_LIST';
export const EMPTY_PROPERTY_SEARCHED_LIST = 'EMPTY_PROPERTY_SEARCHED_LIST';
export const CREATE_VIDEO_CATEGORIES = 'CREATE_VIDEO_CATEGORIES';
export const FETCH_RECOMMENDED_VIDEOS = 'FETCH_RECOMMENDED_VIDEOS';
export const UPDATE_RECOMMENDED_VIDEOS = 'UPDATE_RECOMMENDED_VIDEOS';
export const CLEAR_PROPERTY_DATA = 'CLEAR_PROPERTY_DATA';
export const FETCH_PROPERTY_HOSTED_VIDEOS = 'FETCH_PROPERTY_HOSTED_VIDEOS';
export const CLEAR_PROPERTY_HOSTED_VIDEOS = 'CLEAR_PROPERTY_HOSTED_VIDEOS';
export const UPDATE_PROPERTY_HOSTED_VIDEOS = 'UPDATE_PROPERTY_HOSTED_VIDEOS';
export const UPDATE_PROPERTY_HOSTED_INFO = 'UPDATE_PROPERTY_HOSTED_INFO';
export const ADD_PROPERTY_HOSTED_SLIDES = 'ADD_PROPERTY_HOSTED_SLIDES';
export const TOGGLE_LOADER = 'TOGGLE_LOADER';


// Property Slides

export const PROPERTY_CONTENT = 'slides';
export const PROPERTY_CONTENT_VIDEO = 'video';
export const GET_DEFAULT_TEMPLATES = 'GET_DEFAULT_TEMPLATES';
export const UPDATE_CURRENT_TEMPLATE = 'UPDATE_CURRENT_TEMPLATE';
export const ADD_CURRENT_TEMPLATE = 'ADD_CURRENT_TEMPLATE';
export const UPDATE_SELECTED_TEMPLATE = 'UPDATE_SELECTED_TEMPLATE';
export const CLEAR_SELECTED_TEMPLATE = 'CLEAR_SELECTED_TEMPLATE';
export const DELETE_CURRENT_TEMPLATE = 'DELETE_CURRENT_TEMPLATE';
export const UPDATE_SELECTED_TEMPLATE_THUMBNAIL = 'UPDATE_SELECTED_TEMPLATE_THUMBNAIL';
export const CLEAR_DELETE_AND_SLIDE_LIST_ARRAY = 'CLEAR_DELETE_AND_SLIDE_LIST_ARRAY';
export const UPDATE_SLIDESHOW = 'UPDATE_SLIDESHOW';
export const CREATE_SLIDESHOW = 'CREATE_SLIDESHOW';
// browserStorage

export const BROWSER_STORAGE = {
    ACCESS_TOKEN: 'access_token',
};

// external links

export const RECOMMENDED_VIDEO_FEEDBACK_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScUGNAy_nSB6JXLpmXvkcXKxAQe4lRuB1aZLZ7_xy1iKJDTJQ/viewform?usp=sf_link';
export const RECOMMENDED_VIDEO_DOC_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScUGNAy_nSB6JXLpmXvkcXKxAQe4lRuB1aZLZ7_xy1iKJDTJQ/viewform?usp=sf_link';
export const RECOMMENDED_VIDEO_TIPS_URL = 'http://www.welcometv.net/hostrecordingtips.html#';
export const IOS_APP_LINK = 'https://itunes.apple.com/us/app/welcometv-studio/id1313224647?mt=8';
export const LOCATION_SURVEY_LINK = 'http://www.welcome.systems/currentcoverage.html';
export const WELCOME_STATIC_SITE = 'http://www.welcome.systems';

export const HOST_VIDEO_CATEGORIES = {
    1: 'introduction',
    2: 'amenities',
    3: 'neighborhood',
    4: 'recommendations',
};

// user roles

export const USER_TYPE = {
    GUEST: 'GUEST',
    OPERATOR: 'OPERATOR',
    ADMIN: 'ADMIN',
    HOST: 'HOST',
    VENDOR: 'VENDOR',
};

// SearchDropDown menu list used in SearchBar component

export const SELECT_MENU_LIST = [
    { name: '0', description: 'all' },
    { name: '1', description: 'enable' },
    { name: '2', description: 'disable' },
];

export const SELECT_MENU_LIST_DEVICE = [
    { name: '0', description: 'all' },
    { name: '1', description: 'enable' },
    { name: '2', description: 'disable' },
    { name: '3', description: 'linked' },
    { name: '4', description: 'notLinked' },
];

// user lists

export const UPDATE_USER_STATUS = 'UPDATE_USER_STATUS';
export const UPDATE_USER = 'UPDATE_USER';
export const GET_ROLES = 'GET_ROLES';
export const SORT_USER_LIST = 'SORT_USER_LIST';

// meta-tags lists

export const UPDATE_TAG_STATUS = 'UPDATE_TAG_STATUS';
export const UPDATE_TAG = 'UPDATE_TAG';
export const SORT_TAG_LIST = 'SORT_TAG_LIST';

// user-location lists

export const CREATE_COUNTRY_LIST = 'CREATE_COUNTRY_LIST';
export const CREATE_STATE_LIST = 'CREATE_STATE_LIST';
export const CREATE_REGION_LIST = 'CREATE_REGION_LIST';
export const CREATE_CITY_LIST = 'CREATE_CITY_LIST';
export const EMPTY_CITY_LIST = 'EMPTY_CITY_LIST';

// thumbnails management

export const UPLOAD_IMAGE_THUMBNAILS = 'UPLOAD_IMAGE_THUMBNAILS';

// Header Min-Height

export const headerHeight = 57;

// Minimum Recommended Videos

export const RECOMMENDED_VIDEOS_SIZE = 12;
export const MINIMUM_VIDEOS_TO_SELECT = 10;
export const CATEGORY_VIDEOS_SIZE = 8;

// Social Media Links

export const SOCIAL_LINKS = {
    FACEBOOK: 'http://facebook.com/www.welcome.systems/',
    TWITTER: 'https://mobile.twitter.com/Welcome_Systems',
    LINKED_IN: 'https://www.linkedin.com/company/welcome-systems',
};

export const GOOGLE_SUPPORT = {
    cookieUrl: 'https://support.google.com/chrome/answer/95647?hl=en',
    locationUrl: 'https://support.google.com/accounts/answer/3118687?hl=en',
};
export const MOZILLA_SUPPORT = {
    cookieUrl: 'https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences',
    locationUrl: 'https://support.mozilla.org/en-US/questions/988163',
};
export const SAFARI_SUPPORT = {
    cookieUrl: 'https://support.apple.com/kb/PH21411?viewlocale=en_IN&locale=en_IN',
    locationUrl: 'https://support.apple.com/en-in/HT203033',
};
export const OPERA_SUPPORT = {
    cookieUrl: 'http://www.opera.com/help/tutorials/security/privacy/',
    locationUrl: 'http://help.opera.com/Mac/10.60/en/geolocation.html',
};
export const IE_SUPPORT = {
    cookieUrl: 'https://support.microsoft.com/en-in/help/17442/windows-internet-explorer-delete-manage-cookies',
    locationUrl: 'https://privacy.microsoft.com/en-us/windows-10-location-and-privacy',
};
export const BLINK_SUPPORT = {
    cookieUrl: 'https://blinkforhome.com/pages/cookie-policy',
    locationUrl: 'https://blinkforhome.com/pages/privacy-policy',
};

// current displayed Page

export const UPDATE_CURRENT_DISPLAY = 'UPDATE_CURRENT_DISPLAY';
export const FETCH_IMAGE_THUMBNAILS = 'FETCH_IMAGE_THUMBNAILS';
export const DELETE_IMAGE_THUMBNAILS = 'DELETE_IMAGE_THUMBNAILS';
export const BLOCK_UPLOAD_THUMBNAIL = 'BLOCK_UPLOAD_THUMBNAIL';
export const UNBLOCK_UPLOAD_THUMBNAIL = 'UNBLOCK_UPLOAD_THUMBNAIL';

export const PAGES = {
    VIDEOMANAGE: 0,
    VIDEOUPLOAD: 1,
    METATAGS: 2,
    USERS: 3,
    PROFILE: 4,
    PROPERTY: 5,
    DEVICES: 6,
    LINKDEVICE: 7,
    TOS: 8,
    POLICY: 9,
};

// sideBar Admin Menu

export const ADMIN_MENU_LIST = [
    {
        id: 'propertySection',
        icon: 'library_books',
        children: [
            { id: 'property', url: '/', index: 5 },
        ],
    },
    {
        id: 'videoSection',
        icon: 'video_library',
        children: [
            { id: 'manageVideo', url: '/videos', index: 0 },
            { id: 'videoUpload', url: '/videoUpload', index: 1 },
            { id: 'tagsSubMenu', url: '/tags', index: 2 },
        ],
    },
    {
        id: 'devices',
        icon: 'live_tv',
        children: [
            { id: 'deviceSubMenu', url: '/devices', index: 6 },
            { id: 'link', url: '/link', index: 7 },
        ],
    },
    {
        id: 'users',
        icon: 'group',
        children: [
            { id: 'usersSubMenu', url: '/users', index: 3 },
            { id: 'profileSubMenu', url: '/profile', index: 4 },
        ],
    },
    {
        id: 'aboutSection',
        icon: 'description',
        children: [
            { id: 'tos', url: '/tos', index: 8 },
            { id: 'privacyPolicy', url: '/policy', index: 9 },
        ],
    },

];

// sideBar Host Menu

export const HOST_MENU_LIST = [
    {
        id: 'propertySection',
        icon: 'library_books',
        children: [
            { id: 'property', url: '/', index: 5 },
        ],
    },
    {
        id: 'videoSection',
        icon: 'video_library',
        children: [
            { id: 'manageVideo', url: '/videos', index: 0 },
            { id: 'videoUpload', url: '/videoUpload', index: 1 },
        ],
    },
    {
        id: 'devices',
        icon: 'live_tv',
        children: [
            { id: 'link', url: '/link', index: 7 },
        ],
    },
    {
        id: 'profileSection',
        icon: 'person',
        children: [
            { id: 'profileSubMenu', url: '/profile', index: 4 },
        ],
    },
    {
        id: 'aboutSection',
        icon: 'description',
        children: [
            { id: 'tos', url: '/tos', index: 8 },
            { id: 'privacyPolicy', url: '/policy', index: 9 },
        ],
    },
];

// sideBar User Menu

export const GUEST_MENU_LIST = [
    {
        id: 'videoSection',
        icon: 'video_library',
        children: [
            { id: 'manageVideo', url: '/', index: 0 },
            { id: 'videoUpload', url: '/videoUpload', index: 1 },
        ],
    },
    {
        id: 'profileSection',
        icon: 'person',
        children: [
            { id: 'profileSubMenu', url: '/profile', index: 4 },
        ],
    },
    {
        id: 'aboutSection',
        icon: 'description',
        children: [
            { id: 'tos', url: '/tos', index: 8 },
            { id: 'privacyPolicy', url: '/policy', index: 9 },
        ],
    },
];

