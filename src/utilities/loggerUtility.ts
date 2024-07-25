import { isLoggerEnabledByLevel, LoggerLevel } from '@/models/types/logger';

/**
 * The minimum log level.
 * This is retrieved from the environment variable LOG_MINIMUM_LEVEL.
 * If the environment variable is not provided, it defaults to LoggerLevel.info.
 *
 * @type {LoggerLevel}
 */
/* istanbul ignore next */
const logMinimumLevel: LoggerLevel = (process.env.LOG_MINIMUM_LEVEL as LoggerLevel) ?? LoggerLevel.info;

/**
 * Defines the ANSI color codes for different log levels.
 *
 * This constant object maps `LoggerLevel` enums to their corresponding ANSI color codes,
 * allowing for colorized console output. The colors are intended to differentiate log levels visually,
 * making it easier to distinguish between informational messages, debug messages, warnings, and errors.
 *
 * @type {Object}
 * @property {string} LoggerLevel.info - ANSI color code for informational messages (light blue).
 * @property {string} LoggerLevel.debug - ANSI color code for debug messages (blue).
 * @property {string} LoggerLevel.warning - ANSI color code for warning messages (yellow).
 * @property {string} LoggerLevel.error - ANSI color code for error messages (red).
 */
const consoleColors: {
  [LoggerLevel.info]: string;
  [LoggerLevel.debug]: string;
  [LoggerLevel.warning]: string;
  [LoggerLevel.error]: string;
} = {
  [LoggerLevel.info]: '36', // light blue
  [LoggerLevel.debug]: '34', // blue
  [LoggerLevel.warning]: '33', // yellow
  [LoggerLevel.error]: '31', // red
};

/**
 * A utility for logging messages with various levels of severity.
 *
 * This logger provides a structured way to log messages throughout the application.
 * It supports different log levels (info, debug, warning, error) and adjusts the logging behavior
 * based on the application's running environment (production or not).
 *
 * In non-production environments, log messages are color-coded for readability in the console.
 * In production environments, log messages are formatted as JSON strings for structured logging.
 *
 * The logger checks the minimum log level set (via environment variable or defaulting to 'info')
 * to determine if a message should be logged. This allows for flexible control over what gets logged
 * based on the running environment and the current need for information or debugging.
 *
 * Usage:
 * logger.log('Your message here', LoggerLevel.info);
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
        console.log(`\x1b[${consoleColors[type]}m[${hours}:${minutes}:${seconds}] ${message} \x1b[0m`);
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
