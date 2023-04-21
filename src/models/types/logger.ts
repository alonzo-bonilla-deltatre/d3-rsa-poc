export enum LoggerLevel {
  info = 'Information',
  debug = 'Debug',
  warning = 'Warning',
  error = 'Error',
}

export function isLoggerEnabledByLevel(loggerLevel: LoggerLevel, loggerTypeLevel: LoggerLevel): boolean {
  if (loggerLevel === LoggerLevel.info) {
    return true;
  }
  if (
    loggerLevel === LoggerLevel.debug &&
    (loggerTypeLevel === LoggerLevel.debug ||
      loggerTypeLevel === LoggerLevel.warning ||
      loggerTypeLevel === LoggerLevel.error)
  ) {
    return true;
  }
  if (
    loggerLevel === LoggerLevel.warning &&
    (loggerTypeLevel === LoggerLevel.warning || loggerTypeLevel === LoggerLevel.error)
  ) {
    return true;
  }
  if (loggerLevel === LoggerLevel.error && loggerTypeLevel === LoggerLevel.error) {
    return true;
  }
  return false;
}
