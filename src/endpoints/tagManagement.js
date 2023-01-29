import { apiUrl } from '../constants/apiConstant';

export default({
    tagListPath: apiUrl.BASE + apiUrl.tags,
    tagChangeStatusPath: apiUrl.BASE + apiUrl.tag + apiUrl.updateUser,
});
