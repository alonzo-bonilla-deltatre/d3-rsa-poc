import { getDefaultInputPattern, validateField, validateFilesClient, validateFilesServer } from '@/helpers/formHelper';
import { LoggerLevel } from '@/models/types/logger';
import logger from '@/utilities/logger';
import formidable from 'formidable';
import { NextApiResponse } from 'next';

jest.mock('@/utilities/logger');

describe('getDefaultInputPattern function', () => {
  it('should return undefined with no managed type', () => {
    expect(getDefaultInputPattern(0)).toBeUndefined();
  });

  it('should return the email pattern', () => {
    expect(getDefaultInputPattern(4)).toBe('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$');
  });

  it('should return the password pattern', () => {
    expect(getDefaultInputPattern(5)).toBe('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}');
  });

  it('should return the phone pattern', () => {
    expect(getDefaultInputPattern(3)).toBe('^[0-9]*$');
  });
});

describe('validateFilesServer function', () => {
  let mockRes: any;
  const mockLogger = logger.log as jest.Mock;
  const invalidFiles = {
    file: [
      {
        lastModifiedDate: 2023,
        newFilename: '286ddbe5360b27f9a2cdcef03.png',
        originalFilename: 'localhost_3000_test_enr.png',
        mimetype: 'image/svg',
        size: 383354,
      },
    ],
  };
  const fields = {
    'full-name': ['My name'],
    nationality: ['ITAs'],
    email: ['test@deltatre.com'],
    'long-text': ['Long text'],
    'consent-consent': ['on'],
    'consent-test': ['on'],
    file: ['image/jpeg,image/gif,image/png,application/pdf'],
    dropdown: ['one'],
  };
  beforeEach(() => {
    mockRes = {
      setHeader: jest.fn(),
      write: jest.fn(),
      end: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as NextApiResponse;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should log and break the foreach if format is not supported', () => {
    validateFilesServer(invalidFiles as unknown as formidable.Files, fields, mockRes);
    expect(mockLogger).toHaveBeenLastCalledWith('File [object Object] has a not supported format', LoggerLevel.error);
  });

  it('should not log and not break the foreach', () => {
    const validFiles = {
      file: [
        {
          lastModifiedDate: 2023,
          newFilename: '286ddbe5360b27f9a2cdcef03.png',
          originalFilename: 'test.png',
          mimetype: 'image/png',
          size: 383354,
        },
      ],
    };
    validateFilesServer(validFiles as unknown as formidable.Files, fields, mockRes);
    expect(mockLogger).not.toHaveBeenCalled();
  });

  it('should log and not break the foreach if size = 0', () => {
    const validFiles = {
      file: [
        {
          lastModifiedDate: 2023,
          newFilename: '286ddbe5360b27f9a2cdcef03.png',
          originalFilename: 'test.png',
          mimetype: '',
          size: 0,
        },
      ],
    };
    validateFilesServer(validFiles as unknown as formidable.Files, fields, mockRes);
    expect(mockLogger).toHaveBeenCalled();
  });

  it('should not log and break the foreach if size = 0 and mimetype is undefined', () => {
    const validFiles = {
      file: [
        {
          lastModifiedDate: 2023,
          newFilename: '286ddbe5360b27f9a2cdcef03.png',
          originalFilename: 'test.png',
        },
      ],
    };
    validateFilesServer(validFiles as unknown as formidable.Files, fields, mockRes);
    expect(mockLogger).toHaveBeenCalled();
  });

  it('should not log and break the foreach if size = 0 and mimetype is undefined', () => {
    const validFiles = {
      file: undefined,
    };
    validateFilesServer(validFiles as unknown as formidable.Files, {}, mockRes);
    expect(mockLogger).toHaveBeenCalled();
  });
});

describe('validateFilesClient function', () => {
  const invalidFiles = {
    file: {
      data: [
        {
          lastModified: 1699964346278,
          lastModifiedDate: 'Tue Nov 14 2023 13:19:06 GMT+0100 (Central European Standard Time)',
          name: 'test.mp4',
          size: 383354,
          type: 'video/mp4',
          webkitRelativePath: '',
        },
      ],
      accept: 'image/jpeg,image/gif,image/png,application/pdf',
    },
  };
  const handler = jest.fn();

  it('Should return false if a file is not valid', () => {
    const result = validateFilesClient(
      invalidFiles as unknown as Record<
        string,
        {
          data: File[];
          accept: string;
        }
      >,
      handler
    );
    expect(result).toBeFalsy();
    expect(handler).toHaveBeenCalled();
  });

  it('Should return false if files are valid', () => {
    const validFiles = {
      file: {
        data: [
          {
            lastModified: 1699964346278,
            lastModifiedDate: 'Tue Nov 14 2023 13:19:06 GMT+0100 (Central European Standard Time)',
            name: 'test.png',
            size: 383354,
            type: 'image/png',
            webkitRelativePath: '',
          },
        ],
        accept: 'image/jpeg,image/gif,image/png,application/pdf',
      },
    };
    const result = validateFilesClient(
      validFiles as unknown as Record<
        string,
        {
          data: File[];
          accept: string;
        }
      >,
      handler
    );
    expect(result).toBeTruthy();
    expect(handler).not.toHaveBeenCalled();
  });
});

describe('validateField function', () => {
  const mockLogger = logger.log as jest.Mock;
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should return true if the field is valid', () => {
    const field = {
      name: 'name',
      value: 'test',
      maxLength: '5',
      required: true,
      fieldType: 0,
      pattern: '',
    };
    const result = validateField(field);
    expect(result).toBeTruthy();
  });

  it('Should return false if a value is empty and the field is required', () => {
    const field = {
      name: 'name',
      value: '',
      maxLength: '5',
      required: true,
      fieldType: 0,
      pattern: '',
    };
    const result = validateField(field);
    expect(result).toBeFalsy();
    expect(mockLogger).toHaveBeenLastCalledWith('"name" must have a value', LoggerLevel.error);
  });

  it('Should return false if the value has more characters than maxLenght', () => {
    const field = {
      name: 'name',
      value: 'test test test',
      maxLength: '5',
      required: true,
      fieldType: 0,
      pattern: '',
    };
    const result = validateField(field);
    expect(result).toBeFalsy();
    expect(mockLogger).toHaveBeenLastCalledWith('"name" has not a valid length', LoggerLevel.error);
  });
  it('Should return false if do not respect the pattern', () => {
    const field = {
      name: 'phone',
      value: 'abc',
      maxLength: '5',
      required: true,
      fieldType: 3,
      pattern: '',
    };
    const result = validateField(field);
    expect(result).toBeFalsy();
    expect(mockLogger).toHaveBeenLastCalledWith(
      // prettier-ignore
      '"phone" does not respect the specific input pattern \"^[0-9]*$"',
      LoggerLevel.error
    );
  });

  it('Should use default pattern if pattern is undefined', () => {
    const field = {
      name: 'phone',
      value: 'abc',
      maxLength: '5',
      required: true,
      fieldType: undefined,
      pattern: undefined,
    };
    const result = validateField(field);
    expect(result).toBeTruthy();
  });

  it('Should return false if do not respect the pattern', () => {
    const field = {
      name: 'phone',
      value: 'abc',
      maxLength: '5',
      required: true,
      fieldType: 3,
      pattern: '^[0-9]*$',
    };
    const result = validateField(field);
    expect(result).toBeFalsy();
    expect(mockLogger).toHaveBeenLastCalledWith(
      // prettier-ignore
      '"phone" does not respect the specific input pattern \"^[0-9]*$"',
      LoggerLevel.error
    );
  });
});
