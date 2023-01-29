// handling multiple environment configuration
let environment = (process.env.NODE_ENV).toString().trim().toLowerCase();
switch (environment) {
case 'production' :
    environment = 'production';
    break;
case 'qa2' :
    environment = 'qa2';
    break;
case 'uat' :
    environment = 'uat';
    break;
case 'qa' :
    environment = 'qa';
    break;
default :
    environment = 'development';
}

if (!process.env.BROWSER) {
    console.log('-------------- Loading configurations for environment = ' + environment + ' ------------ ');
}
const appConfig = require('./' + environment + '.js');
export default appConfig;
