import { apiUrl } from '../constants/apiConstant';

export default({
    deviceListPath: apiUrl.BASE + apiUrl.fetchDevice,
    deviceChangeStatusPath: apiUrl.BASE + apiUrl.fetchDevice + apiUrl.changestatus,
});
