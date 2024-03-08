import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import healthCheck, { ReadyStatus } from '@/pages/api/healthz/ready';

jest.mock('axios');
let mockAxiosGet: jest.SpyInstance<Promise<unknown>>;
let mockRes: NextApiResponse;
const mockReq = {} as NextApiRequest;

describe('/healthz/ready', () => {
  beforeEach(() => {
    mockAxiosGet = jest.spyOn(axios, 'get');

    mockRes = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn(),
      json: jest.fn().mockReturnThis(),
    } as unknown as NextApiResponse;
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should return ready status when all APIs are ready', async () => {
    // ARRANGE
    mockAxiosGet.mockResolvedValue(ReadyStatus.READY);

    // ACT
    await healthCheck(mockReq, mockRes);

    //ASSERT
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: ReadyStatus.READY,
      services: {
        frontendApi: ReadyStatus.READY,
        forgeApi: ReadyStatus.READY,
        vocabularyToolApi: ReadyStatus.READY,
        gadApi: ReadyStatus.READY,
      },
    });
    expect(mockRes.end).toHaveBeenCalled();
  });

  it('should return not ready status when frontendApi is not ready', async () => {
    // ARRANGE
    mockAxiosGet.mockRejectedValueOnce(ReadyStatus.NOT_READY);
    mockAxiosGet.mockResolvedValueOnce(ReadyStatus.READY);
    mockAxiosGet.mockResolvedValueOnce(ReadyStatus.READY);
    mockAxiosGet.mockResolvedValueOnce(ReadyStatus.READY);

    // ACT
    await healthCheck(mockReq, mockRes);

    // ASSERT
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: ReadyStatus.NOT_READY,
      services: {
        frontendApi: ReadyStatus.NOT_READY,
        forgeApi: ReadyStatus.READY,
        vocabularyToolApi: ReadyStatus.READY,
        gadApi: ReadyStatus.READY,
      },
    });
    expect(mockRes.end).toHaveBeenCalled();
  });

  it('should return not ready status when forgeApi is not ready', async () => {
    // ARRANGE
    mockAxiosGet.mockResolvedValueOnce(ReadyStatus.READY);
    mockAxiosGet.mockRejectedValueOnce(ReadyStatus.NOT_READY);
    mockAxiosGet.mockResolvedValueOnce(ReadyStatus.READY);
    mockAxiosGet.mockResolvedValueOnce(ReadyStatus.READY);

    // ACT
    await healthCheck(mockReq, mockRes);

    // ASSERT
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: ReadyStatus.NOT_READY,
      services: {
        frontendApi: ReadyStatus.READY,
        forgeApi: ReadyStatus.NOT_READY,
        vocabularyToolApi: ReadyStatus.READY,
        gadApi: ReadyStatus.READY,
      },
    });
    expect(mockRes.end).toHaveBeenCalled();
  });

  it('should return not ready status when vocabularyToolApi is not ready', async () => {
    // ARRANGE
    mockAxiosGet.mockResolvedValueOnce(ReadyStatus.READY);
    mockAxiosGet.mockResolvedValueOnce(ReadyStatus.READY);
    mockAxiosGet.mockRejectedValueOnce(ReadyStatus.NOT_READY);
    mockAxiosGet.mockResolvedValueOnce(ReadyStatus.READY);

    // ACT
    await healthCheck(mockReq, mockRes);

    // ASSERT
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: ReadyStatus.NOT_READY,
      services: {
        frontendApi: ReadyStatus.READY,
        forgeApi: ReadyStatus.READY,
        vocabularyToolApi: ReadyStatus.NOT_READY,
        gadApi: ReadyStatus.READY,
      },
    });
    expect(mockRes.end).toHaveBeenCalled();
  });

  it('should return not ready status when gadApi is not ready', async () => {
    // ARRANGE
    mockAxiosGet.mockResolvedValueOnce(ReadyStatus.READY);
    mockAxiosGet.mockResolvedValueOnce(ReadyStatus.READY);
    mockAxiosGet.mockResolvedValueOnce(ReadyStatus.READY);
    mockAxiosGet.mockRejectedValueOnce(ReadyStatus.NOT_READY);

    // ACT
    await healthCheck(mockReq, mockRes);

    // ASSERT
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: ReadyStatus.NOT_READY,
      services: {
        frontendApi: ReadyStatus.READY,
        forgeApi: ReadyStatus.READY,
        vocabularyToolApi: ReadyStatus.READY,
        gadApi: ReadyStatus.NOT_READY,
      },
    });
    expect(mockRes.end).toHaveBeenCalled();
  });
});
