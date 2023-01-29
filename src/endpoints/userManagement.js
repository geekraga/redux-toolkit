import { apiUrl } from '../constants/apiConstant';

export default({
    userListPath: apiUrl.BASE + apiUrl.users,
    userRolesPath: apiUrl.BASE + apiUrl.roles,
    userChangeStatusPath: apiUrl.BASE + apiUrl.user + apiUrl.changestatus,
    updateUserPath: apiUrl.BASE + apiUrl.user + apiUrl.updateUser,
});
