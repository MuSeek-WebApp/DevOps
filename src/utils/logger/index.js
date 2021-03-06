import appRoot from 'app-root-path';
import { createLogger, format, transports } from 'winston';

const customFormat = format.printf((info) => {
  return `${info.timestamp} ${info.level}: ${info.message} `;
});

const options = {
  file: {
    level: 'debug',
    filename: 'server.log',
    dirname: `${appRoot}/logs`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5
  },
  console: {
    level: 'debug',
    handleExceptions: true
  }
};

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'DD-MM-YYYY HH:mm:ss'
    }),
    customFormat
  ),
  transports: [new transports.File(options.file)]
});

logger.add(new transports.Console(options.console));

export default logger;
