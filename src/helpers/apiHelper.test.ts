import { handleApiError } from '@/helpers/apiHelper';
import logger from '@/utilities/logger';
import { LoggerLevel } from '@/models/types/logger';

jest.mock('@/utilities/logger');

describe('handleApiError function', () => {
  it('should write log with apiName and response.data if present', () => {
    const result = handleApiError(
      {
        status: 401,
        statusText: 'Unauthorized',
        data: {
          error: { message: 'Unauthorized' },
        },
      },
      'TEST API'
    );
    expect(result).toBe(null);
    expect(logger.log as jest.Mock).toHaveBeenCalledWith(expect.stringMatching('TEST API Error'), LoggerLevel.error);
    expect(logger.log as jest.Mock).toHaveBeenCalledWith(expect.stringMatching('401'), LoggerLevel.error);
    expect(logger.log as jest.Mock).toHaveBeenCalledWith(expect.stringMatching('Unauthorized'), LoggerLevel.error);
    expect(logger.log as jest.Mock).not.toHaveBeenCalledWith(expect.stringMatching('URL'), LoggerLevel.error);
  });
  it('should write log with apiName and exception without response.data', () => {
    const result = handleApiError(
      {
        status: 401,
        statusText: 'Unauthorized',
        message: 'message',
        stack: 'stack',
      },
      'TEST API'
    );
    expect(result).toBe(null);
    expect(logger.log as jest.Mock).toHaveBeenCalledWith(expect.stringMatching('TEST API Error'), LoggerLevel.error);
    expect(logger.log as jest.Mock).not.toHaveBeenCalledWith(expect.stringMatching('URL'), LoggerLevel.error);
    expect(logger.log as jest.Mock).toHaveBeenCalledWith(expect.stringMatching('message'), LoggerLevel.error);
    expect(logger.log as jest.Mock).toHaveBeenCalledWith(expect.stringMatching('stack'), LoggerLevel.error);
  });
  it('should write log with apiName and apiUrl if present', () => {
    const result = handleApiError(
      {
        status: 401,
        statusText: 'Unauthorized',
        message: 'message',
        stack: 'stack',
      },
      'TEST API',
      'url'
    );
    expect(result).toBe(null);
    expect(logger.log as jest.Mock).toHaveBeenCalledWith(expect.stringMatching('TEST API Error'), LoggerLevel.error);
    expect(logger.log as jest.Mock).toHaveBeenCalledWith(expect.stringMatching('URL'), LoggerLevel.error);
    expect(logger.log as jest.Mock).toHaveBeenCalledWith(expect.stringMatching('message'), LoggerLevel.error);
    expect(logger.log as jest.Mock).toHaveBeenCalledWith(expect.stringMatching('stack'), LoggerLevel.error);
  });
  it('should return null', () => {
    const result = handleApiError(null, 'TEST', 'url');
    expect(result).toBe(null);
  });
});
