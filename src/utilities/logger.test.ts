import { LoggerLevel } from '@/models/types/logger';
import logger from '@/utilities/loggerUtility';

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
    // ACT
    logger.log('info message', LoggerLevel.info);
    // ASSERT
    expect(console.info).toHaveBeenCalledWith(expect.stringContaining('info message'));
  });

  it('should log debug messages', () => {
    // ACT
    logger.log('debug message', LoggerLevel.debug);
    // ASSERT
    expect(console.debug).toHaveBeenCalledWith(expect.stringContaining('debug message'));
  });

  it('should log warning messages', () => {
    // ACT
    logger.log('warning message', LoggerLevel.warning);
    // ASSERT
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('warning message'));
  });

  it('should log error messages', () => {
    // ACT
    logger.log('error message', LoggerLevel.error);
    // ASSERT
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('error message'));
  });

  it('should not log messages if the log level is not enabled', () => {
    // ARRANGE
    process.env.LOG_MINIMUM_LEVEL = LoggerLevel.error;
    // ACT
    logger.log('info message', LoggerLevel.info);
    // ASSERT
    expect(console.log).not.toHaveBeenCalled();
  });

  it('should log messages to the console in non-production environments', () => {
    // ARRANGE
    process.env = Object.assign(process.env, { NODE_ENV: 'development' });
    // ACT
    logger.log('info message', LoggerLevel.info);
    // ASSERT
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('info message'));
  });

  it('should log messages with default log level', () => {
    // ACT
    logger.log('default message');
    // ASSERT
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('default message'));
  });
});
