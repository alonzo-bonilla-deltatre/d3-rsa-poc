import { GraphicAssetsDashboardItem } from '@/models/types/gad';

const sampleAsset: GraphicAssetsDashboardItem = {
  name: 'TestName',
  publicId: 'TestPublicId',
  resourceType: 'image',
  type: 'private',
  format: 'png',
  tags: ['test-tag'],
  tagsInString: 'test-tag',
  created: '2022-01-01T00:00:00Z',
  uploaded: '2022-01-01T00:00:00Z',
  width: 0,
  height: 0,
  length: 10000,
  assetUrl: 'https://test.url.com/image/private/{formatInstructions}/v0000000000/Test.png',
  assetThumbnailUrl: 'https://test.url.com/image/private/{formatInstructions}/v0000000000/Test.jpg',
  assetOriginalUrl: 'https://test.url.com/image/private/s--Test--/v0000000000/Test.png',
  assetOriginalCdnUrl: 'https://test.url.com/image/private/v0000000000/Test.png',
  version: '0000000000',
  imageMetadata: null,
  context: null,
  imageAnalysis: null,
  path: 'image/private/v0000000000/Test',
  pathWithFormat: 'image/private/v0000000000/Test.png',
  templatedPath: 'image/private/{formatInstructions}/v0000000000/Test',
  templatedPathWithFormat: 'image/private/{formatInstructions}/v0000000000/Test.png',
};

export { sampleAsset };
