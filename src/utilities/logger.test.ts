import { LoggerLevel } from '@/models/types/logger';
import logger from '@/utilities/logger';

jest.spyOn(console, 'log');
jest.spyOn(console, 'info');
jest.spyOn(console, 'debug');
jest.spyOn(console, 'warn');
jest.spyOn(console, 'error');

describe('logger', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should log info messages', () => {
    logger.log('info message', LoggerLevel.info);
    expect(console.info).toHaveBeenCalledWith(expect.stringContaining('info message'));
  });

  it('should log debug messages', () => {
    logger.log('debug message', LoggerLevel.debug);
    expect(console.debug).toHaveBeenCalledWith(expect.stringContaining('debug message'));
  });

  it('should log warning messages', () => {
    logger.log('warning message', LoggerLevel.warning);
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('warning message'));
  });

  it('should log error messages', () => {
    logger.log('error message', LoggerLevel.error);
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('error message'));
  });

  it('should not log messages if the log level is not enabled', () => {
    process.env.LOG_MINIMUM_LEVEL = LoggerLevel.error;
    logger.log('info message', LoggerLevel.info);
    expect(console.log).not.toHaveBeenCalled();
  });

  it('should log messages to the console in non-production environments', () => {
    process.env = Object.assign(process.env, { NODE_ENV: 'development' });
    logger.log('info message', LoggerLevel.info);
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('info message'));
  });

  it('should log messages with default log level', () => {
    logger.log('default message');
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('default message'));
  });
});
