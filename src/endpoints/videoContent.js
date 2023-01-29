import { apiUrl } from '../constants/apiConstant';

export default({
    videoDataPath: apiUrl.BASE + apiUrl.content,
    languagePath: apiUrl.BASE + apiUrl.language,
    contentIdPath: apiUrl.BASE + apiUrl.contentType,
    metaSuggestionPath: apiUrl.BASE + apiUrl.metaSuggestion,
    uploadContentPath: apiUrl.BASE + apiUrl.content,
    uploadSatausPath: apiUrl.BASE + apiUrl.uploadStatus,
    BUCKET_DIR_PARAMS: apiUrl.BUCKET_DIR_PARAMS,
});
