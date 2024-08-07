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

  beforeEach(() => {
    console.log = jest.fn();
    console.info = jest.fn();
    process.env = Object.assign(process.env, { NODE_ENV: 'production' });
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
    expect(console.info).toHaveBeenCalledWith(expect.stringContaining('default message'));
  });

  it('logs messages with colors in non-production environment', () => {
    // ARRANGE
    process.env = Object.assign(process.env, { NODE_ENV: 'development' });
    // ACT
    logger.log('Test message', LoggerLevel.info);
    // ASSERT
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Test message'));
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('\x1b[36m')); // Light blue for info
  });

  it('formats messages as JSON in production environment', () => {
    // ACT
    logger.log('Production test message', LoggerLevel.error);
    // ASSERT
    expect(console.error).toHaveBeenCalledWith(expect.stringMatching(/"MessageTemplate":"Production test message"/));
  });

  it('does not log if message level is below the minimum log level', () => {
    // ARRANGE
    process.env.LOG_MINIMUM_LEVEL = 'error';
    // ACT
    logger.log('Should not log this info message', LoggerLevel.info);
    // ASSERT
    expect(console.log).not.toHaveBeenCalled();
  });

  it('logs error messages in production environment as JSON', () => {
    // ACT
    logger.log('Error message for production', LoggerLevel.error);
    // ASSERT
    expect(console.error).toHaveBeenCalledWith(expect.stringMatching(/"Level":"Error"/));
    expect(console.error).toHaveBeenCalledWith(
      expect.stringMatching(/"MessageTemplate":"Error message for production"/)
    );
  });

  it('logs debug messages with blue color in non-production environment', () => {
    // ARRANGE
    process.env = Object.assign(process.env, { NODE_ENV: 'development' });
    // ACT
    logger.log('Debug message', LoggerLevel.debug);
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('\x1b[34m')); // Blue for debug
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Debug message'));
  });
});
