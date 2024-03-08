import { isLoggerEnabledByLevel, LoggerLevel } from '@/models/types/logger';

/**
 * The minimum log level.
 * This is retrieved from the environment variable LOG_MINIMUM_LEVEL.
 * If the environment variable is not provided, it defaults to LoggerLevel.info.
 *
 * @type {LoggerLevel}
 */
/* istanbul ignore next */
const logMinimumLevel = (process.env.LOG_MINIMUM_LEVEL as LoggerLevel) ?? LoggerLevel.info;

/**
 * Logger utility for logging messages.
 *
 * This utility provides a log function that logs messages with a timestamp and a log level.
 * The log function checks if the log level is enabled based on the minimum log level specified in the environment variables.
 * If the log level is enabled, it creates a log object with the timestamp, log level, and message, and logs the message.
 * If the NODE_ENV environment variable is not set to 'production', it logs the message to the console.
 *
 * @typedef {Object} logger
 * @property {Function} log - The function for logging messages.
 */
const logger = {
  /**
   * Logs a message with a timestamp and a log level.
   *
   * This function takes a message and a log level as input. If the log level is enabled based on the minimum log level,
   * it creates a log object with the timestamp, log level, and message, and logs the message.
   * If the NODE_ENV environment variable is not set to 'production', it logs the message to the console.
   *
   * @param {string} message - The message to log.
   * @param {LoggerLevel} [type=LoggerLevel.info] - The log level of the message.
   */
  log: (message: string, type: LoggerLevel = LoggerLevel.info): void => {
    if (isLoggerEnabledByLevel(logMinimumLevel, type)) {
      const utcNowDate = new Date().toUTCString();

      const nowDate = new Date();
      const hours = nowDate.getUTCHours();
      const minutes = nowDate.getUTCMinutes();
      const seconds = nowDate.getUTCSeconds();

      const log = {
        Timestamp: utcNowDate,
        Level: type,
        MessageTemplate: message,
        RenderedMessage: message,
      };

      if (process.env.NODE_ENV !== 'production') {
        console.log(`[${hours}:${minutes}:${seconds} ${type}] ${message}`);
      } else {
        switch (type) {
          case LoggerLevel.info:
            console.info(JSON.stringify(log));
            break;
          case LoggerLevel.debug:
            console.debug(JSON.stringify(log));
            break;
          case LoggerLevel.warning:
            console.warn(JSON.stringify(log));
            break;
          case LoggerLevel.error:
            console.error(JSON.stringify(log));
            break;
          /* istanbul ignore next */
          default:
            console.log(JSON.stringify(log));
            break;
        }
      }
    }
  },
};

export default logger;
