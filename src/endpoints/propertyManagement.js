import { apiUrl } from '../constants/apiConstant';

export default({
    propertyListPath: apiUrl.BASE + apiUrl.fetchProperty,
    languageNamePath: apiUrl.BASE + apiUrl.languageName,
    uploadPropertyInfoPath: apiUrl.BASE + apiUrl.uploadPropertyData,
    propertyChangeStatusPath: apiUrl.BASE + apiUrl.uploadPropertyData + apiUrl.changestatus,
    fetchDeviceListPath: apiUrl.BASE + apiUrl.fetchDevice,
    deviceListPath: apiUrl.BASE + apiUrl.deviceList,
    devicePairPath: apiUrl.BASE + apiUrl.devicePair,
    deviceUnpairPath: apiUrl.BASE + apiUrl.deviceUnpair,
    deviceChangeStatusPath: apiUrl.BASE + apiUrl.fetchDevice + apiUrl.changestatus,
    propertySearch: apiUrl.BASE + apiUrl.propertySearch,
    generatePublicVideoUrl: apiUrl.BASE + apiUrl.generatePublicVideoUrl,
    recommendedVideoUrl: apiUrl.BASE + apiUrl.uploadPropertyData + apiUrl.recommendedVideoList,
    videoCategoriesUrl: apiUrl.BASE + apiUrl.recommendedVideoCategories,
    uploadHostVideoUrl: apiUrl.BASE + apiUrl.uploadHostVideo,
    autoLocateUrl: apiUrl.BASE + apiUrl.mapLatLongToAddress,
    templatesUrl: apiUrl.BASE + apiUrl.defaultTemplates,
    slidesUrl: apiUrl.BASE + apiUrl.slide,
});
