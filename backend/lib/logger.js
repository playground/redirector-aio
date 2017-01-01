import winston from 'winston';
import dotenv from 'dotenv';
import slackTransport from 'winston-slack-transport';

dotenv.config();
var nodeEnv = process.env.NODE_ENV || 'dev.local';
var appName = process.env.APP_NAME || 'redirector';
var slackWebhook = process.env.LOGGER_SLACK_WEBHOOK;

/*
  If using clustering with pm2 we should have unique logs files.  However, while pm2 is restarting a lot unique log files are annoying.
  Will set as an attribute on the cookbook so that this can be changed as desired.
*/
var loggerIncludePid = (process.env.LOGGER_INCLUDE_PID === 'true') ? true : false;
var loggerDir = process.env.LOGGER_DIR || '.';
var logfile = (process.pid && loggerIncludePid) ? `${loggerDir}/${appName}-${process.pid}.log` : `${loggerDir}/${appName}.log`;

console.log(`Logging to ${logfile}`);

var logger = new (winston.Logger)({
  rewriters: [
    (level, msg, meta) => {
      meta.nodeEnv = nodeEnv;
      meta.service = appName;
      return meta;
    }
  ],
  transports: [
    new (winston.transports.File)({filename: logfile}),
    new (winston.transports.Console)()
  ]
});

if (slackWebhook !== undefined) {
  logger.add(slackTransport, {
    webhook_url: 'slackWebhook',
    level: 'error',
    handleExceptions: true
  });
}

module.exports = logger;
module.exports.stream = {
  write: function(message) {
      logger.info(message);
    }
};
