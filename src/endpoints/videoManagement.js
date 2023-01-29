import { apiUrl } from '../constants/apiConstant';

export default({
    videoContentPath: apiUrl.BASE + apiUrl.contents,
    actionStatesPath: apiUrl.BASE + apiUrl.actionStates,
    videoDataPath: apiUrl.BASE + apiUrl.content,
    actionHandlePath: apiUrl.BASE + apiUrl.actions,
    transcodeActionPath: apiUrl.BASE + apiUrl.transcodeAction,
    downloadUrlsPath: apiUrl.BASE + apiUrl.content,
    fileBasePath: apiUrl.BASE,
});
