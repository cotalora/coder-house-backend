const log4js = require('log4js');

log4js.configure({
    appenders: {
        fileAppender: { type: 'file', filename: './logs/general.log'},
        fileWarnAppender: { type: 'file', filename: './logs/warn.log'},
        fileErrorAppender: { type: 'file', filename: './logs/error.log'},
        console: { type: 'console' },
    },
    categories: {
        default: { appenders: ['fileAppender', 'console'], level: 'trace' },
        warnCategory: { appenders: ['fileWarnAppender', 'console'], level: 'warn' },
        errorCategory: { appenders: ['fileErrorAppender', 'console'], level: 'error' },
    }
});

const loggerWarn = log4js.getLogger('warnCategory');
const loggerError = log4js.getLogger('errorCategory');
const logger = log4js.getLogger();

module.exports = { logger, loggerWarn, loggerError };