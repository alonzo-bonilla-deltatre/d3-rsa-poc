import { getDefaultInputPattern, validateField, validateFilesClient, validateFilesServer } from '@/helpers/formHelper';
import { LoggerLevel } from '@/models/types/logger';
import logger from '@/utilities/loggerUtility';
import formidable from 'formidable';
import { NextApiResponse } from 'next';

jest.mock('@/utilities/loggerUtility');
const mockLogger = logger.log as jest.Mock;

describe('getDefaultInputPattern function', () => {
  it('should return undefined with no managed type', () => {
    // ASSERT
    expect(getDefaultInputPattern(0)).toBeUndefined();
  });

  it('should return the email pattern', () => {
    // ASSERT
    expect(getDefaultInputPattern(4)).toBe('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$');
  });

  it('should return the password pattern', () => {
    // ASSERT
    expect(getDefaultInputPattern(5)).toBe('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}');
  });

  it('should return the phone pattern', () => {
    // ASSERT
    expect(getDefaultInputPattern(3)).toBe('^[0-9]*$');
  });
});

describe('validateFilesServer function', () => {
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

  // ARRANGE
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

  it('should log and break the foreach if format is not supported', () => {
    // ACT
    validateFilesServer(invalidFiles as unknown as formidable.Files, fields, mockRes);
    // ASSERT
    expect(mockLogger).toHaveBeenLastCalledWith('File [object Object] has a not supported format', LoggerLevel.error);
  });

  it('should not log and not break the foreach', () => {
    // ARRANGE
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
    // ACT
    validateFilesServer(validFiles as unknown as formidable.Files, fields, mockRes);
    // ASSERT
    expect(mockLogger).not.toHaveBeenCalled();
  });

  it('should log and not break the foreach if size = 0', () => {
    // ARRANGE
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
    // ACT
    validateFilesServer(validFiles as unknown as formidable.Files, fields, mockRes);
    // ASSERT
    expect(mockLogger).toHaveBeenCalled();
  });

  it('should not log and break the foreach if size = 0 and mimetype is undefined', () => {
    // ARRANGE
    const validFiles = {
      file: [
        {
          lastModifiedDate: 2023,
          newFilename: '286ddbe5360b27f9a2cdcef03.png',
          originalFilename: 'test.png',
        },
      ],
    };
    // ACT
    validateFilesServer(validFiles as unknown as formidable.Files, fields, mockRes);
    // ASSERT
    expect(mockLogger).toHaveBeenCalled();
  });

  it('should not log and break the foreach if size = 0 and mimetype is undefined', () => {
    // ARRANGE
    const validFiles = {
      file: undefined,
    };
    // ACT
    validateFilesServer(validFiles as unknown as formidable.Files, {}, mockRes);
    // ASSERT
    expect(mockLogger).toHaveBeenCalled();
  });
});

describe('validateFilesClient function', () => {
  // ARRANGE
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
    // ACT
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
    // ASSERT
    expect(result).toBeFalsy();
    expect(handler).toHaveBeenCalled();
  });

  it('Should return false if files are valid', () => {
    // ARRANGE
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
    // ACT
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
    // ASSERT
    expect(result).toBeTruthy();
    expect(handler).not.toHaveBeenCalled();
  });
});

describe('validateField function', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should return true if the field is valid', () => {
    // ARRANGE
    const field = {
      name: 'name',
      value: 'test',
      maxLength: '5',
      required: true,
      fieldType: 0,
      pattern: '',
    };
    // ACT
    const result = validateField(field);
    // ASSERT
    expect(result).toBeTruthy();
  });

  it('Should return false if a value is empty and the field is required', () => {
    // ARRANGE
    const field = {
      name: 'name',
      value: '',
      maxLength: '5',
      required: true,
      fieldType: 0,
      pattern: '',
    };
    // ACT
    const result = validateField(field);
    // ASSERT
    expect(result).toBeFalsy();
    expect(mockLogger).toHaveBeenLastCalledWith('"name" must have a value', LoggerLevel.error);
  });

  it('Should return false if the value has more characters than maxLenght', () => {
    // ARRANGE
    const field = {
      name: 'name',
      value: 'test test test',
      maxLength: '5',
      required: true,
      fieldType: 0,
      pattern: '',
    };
    // ACT
    const result = validateField(field);
    // ASSERT
    expect(result).toBeFalsy();
    expect(mockLogger).toHaveBeenLastCalledWith('"name" has not a valid length', LoggerLevel.error);
  });
  it('Should return false if do not respect the pattern', () => {
    // ARRANGE
    const field = {
      name: 'phone',
      value: 'abc',
      maxLength: '5',
      required: true,
      fieldType: 3,
      pattern: '',
    };
    // ACT
    const result = validateField(field);
    // ASSERT
    expect(result).toBeFalsy();
    expect(mockLogger).toHaveBeenLastCalledWith(
      // prettier-ignore
      '"phone" does not respect the specific input pattern \"^[0-9]*$"',
      LoggerLevel.error
    );
  });

  it('Should use default pattern if pattern is undefined', () => {
    // ARRANGE
    const field = {
      name: 'phone',
      value: 'abc',
      maxLength: '5',
      required: true,
      fieldType: undefined,
      pattern: undefined,
    };
    // ACT
    const result = validateField(field);
    // ASSERT
    expect(result).toBeTruthy();
  });

  it('Should return false if do not respect the pattern', () => {
    // ARRANGE
    const field = {
      name: 'phone',
      value: 'abc',
      maxLength: '5',
      required: true,
      fieldType: 3,
      pattern: '^[0-9]*$',
    };
    // ACT
    const result = validateField(field);
    // ASSERT
    expect(result).toBeFalsy();
    expect(mockLogger).toHaveBeenLastCalledWith(
      // prettier-ignore
      '"phone" does not respect the specific input pattern \"^[0-9]*$"',
      LoggerLevel.error
    );
  });
});
