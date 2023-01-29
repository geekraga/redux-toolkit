import { apiUrl } from '../constants/apiConstant';

export default({
    loginPath: apiUrl.AUTH + apiUrl.authentication,
    swaggerPath: apiUrl.AUTH + apiUrl.swaggerLink,
    userInfoPath: apiUrl.BASE + apiUrl.getUserInfo,
    FB_CLIENT_ID: apiUrl.FB_CLIENT_ID,
    GOOGLE_CLIENT_ID: apiUrl.GOOGLE_CLIENT_ID,
    GOOGLE_ANALYTICS_KEY: apiUrl.GOOGLE_ANALYTICS_KEY,
    fbAuthPath: apiUrl.BASE + apiUrl.FB_AUTH,
    googleAuthPath: apiUrl.BASE + apiUrl.GPLUS_AUTH,
    AWS_CONFIG: apiUrl.AWS_CONFIG,
    forgotPasswordPath: apiUrl.BASE + apiUrl.getUserInfo + apiUrl.forgotPassword,
    validateTokenPath: apiUrl.BASE + apiUrl.getUserInfo + apiUrl.validateToken,
    resetPasswordPath: apiUrl.BASE + apiUrl.getUserInfo + apiUrl.resetpassword,
});
