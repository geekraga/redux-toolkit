const winston = require('winston');

import ConsoleTransport from './console';
import { TEST_ENV } from '../../config';

const consoleLogLevel = TEST_ENV ? 'error' : 'info';

const logger = new (winston.Logger)({
  transports: [
    new ConsoleTransport({ level: consoleLogLevel }),
  ],
});

export default logger;
