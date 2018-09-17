const winston = require('winston');
const path = require('path');

const logPath = path.join(__dirname,'logs/error.log');

const timestamp = () => {
  return new Date().toISOString();
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: logPath,
      level: 'error',
      timestamp:timestamp()
    }),
    new winston.transports.File({
      filename:'combined.log'
    })
  ]
})


module.exports = logger;
