import { isLoggerEnabledByLevel, LoggerLevel } from '@/models/types/logger';

const logMinimumLevel = (process.env.LOG_MINIMUM_LEVEL as LoggerLevel) ?? LoggerLevel.info;

const nodeEnv = process.env.NODE_ENV;

const logger = {
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
          default:
            console.log(JSON.stringify(log));
            break;
        }
      }
    }
  },
};

export default logger;
