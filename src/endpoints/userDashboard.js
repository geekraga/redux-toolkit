import { apiUrl } from '../constants/apiConstant';

export default({
    userDashboardPath: apiUrl.BASE + apiUrl.getUserInfo,
    createUserPath: apiUrl.BASE + apiUrl.getUserInfo + apiUrl.register,
    verifyUserPath: apiUrl.BASE + apiUrl.getUserInfo + apiUrl.verifyUser,
    updateImagePath: apiUrl.BASE + apiUrl.getUserInfo + apiUrl.updateProfileImage,
    updatePasswordPath: apiUrl.BASE + apiUrl.getUserInfo + apiUrl.updatePassword,
});
