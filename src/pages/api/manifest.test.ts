import { NextApiRequest, NextApiResponse } from 'next';
import { getManifestJson } from '@/services/manifestService';
import { ManifestResponse } from '@/models/types/manifest';
import renderManifest from './manifest';

jest.mock('@/services/manifestService', () => ({
  getManifestJson: jest.fn(),
}));

const mockReq = {} as NextApiRequest;
let mockRes: any;

describe('renderManifest', () => {
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

  it('should render the manifest.json content', async () => {
    // ARRANGE
    const mockResponse: ManifestResponse = {
      name: 'My App',
      short_name: 'My Short App',
      start_url: '/home',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#000000',
      scope: '/',
      icons: [
        {
          src: '/path/to/icon.svg',
          sizes: '72x72 96x96 128x128 256x256',
          type: 'svg',
        },
      ],
      related_applications: [
        {
          platform: 'itunes',
          url: 'https://itunes.apple.com/app/my-app/id123456789',
          id: '123456789',
        },
        {
          platform: 'play',
          url: 'https://play.google.com/store/apps/details?id=com.example.app',
          id: 'com.example.app',
        },
      ],
    };

    (getManifestJson as jest.Mock).mockResolvedValueOnce(mockResponse);

    // ACT
    await renderManifest(mockReq, mockRes);

    // ASSERT
    expect(mockRes.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
    expect(mockRes.send).toHaveBeenCalledWith(mockResponse);
    expect(mockRes.end).toHaveBeenCalled();
  });

  it('should render empty response if manifest content is null', async () => {
    // ARRANGE
    (getManifestJson as jest.Mock).mockResolvedValueOnce(null);

    // ACT
    await renderManifest(mockReq, mockRes);

    // ASSERT
    expect(mockRes.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
    expect(mockRes.send).toHaveBeenCalledWith('');
    expect(mockRes.end).toHaveBeenCalled();
  });

  it('should handle errors', async () => {
    // ARRANGE
    const mockError = new Error('Mock error');

    (getManifestJson as jest.Mock).mockRejectedValueOnce(mockError);

    // ACT
    await renderManifest(mockReq, mockRes);

    // ASSERT
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith('Internal server error');
  });
});
