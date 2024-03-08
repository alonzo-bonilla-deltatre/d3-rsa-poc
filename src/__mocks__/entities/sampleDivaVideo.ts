import { DistributionEntity, ForgeEntityType } from '@/models/types/forge';
import { DivaVideoFields } from '@/models/types/forge.customEntityFields';

export const sampleVideoEntity: DistributionEntity & { fields: DivaVideoFields } = {
  id: '',
  parts: [],
  type: ForgeEntityType.customEntity,
  _translationId: 'c35333c7-38ad-44f1-adfb-8f9ac850100e',
  _entityId: '784eb6f7-1d28-4152-8d87-6a759a9c337e',
  selfUrl: 'https://forge-dapi.icc-dev.deltatre.digital/v2/content/en-gb/videos/icc-test-vod-drm-free',
  slug: 'icc-test-vod-drm-free',
  title: 'ICC Test - VOD - DRM - Free',
  tags: [
    {
      type: 'type',
      _translationId: 'e653941c-6e01-4e8b-9158-00792b0a7c0f',
      _entityId: '898bfb7b-df27-4282-bdee-631916c79ac5',
      selfUrl: 'https://forge-dapi.icc-dev.deltatre.digital/v2/content/en-gb/tags/offer-type-free',
      title: 'Free',
      slug: 'offer-type-free',
      neutralSlug: 'offer-type-free',
      externalSourceName: 'offertype',
      externalSourceReference: {
        SourceId: '301ed5e4-2b57-4dcd-8fd8-464ccf04ee19',
        SourceName: 'offertype',
      },
      extraData: {
        entitlementScopeId: '213',
      },
      fields: {},
    },
  ],
  relations: [],
  references: {},
  fields: {
    videoId: '8759995c-8244-41e4-866d-76f29d4d179e',
    videoStatus: 'OnDemand',
    videoDuration: 'PT25S',
    description: 'Description',
    offer: 'Free',
    workflow: 'VOD',
    restrictedCountries: ['false|250'],
    v_has_data: false,
  },
  createdBy: 'icc-forge-diva-connector-worker-client',
  lastUpdatedBy: 'Federico Bortoluzzi',
  lastUpdatedDate: '2023-10-10T13:24:39.062Z',
  contentDate: '2023-10-09T14:18:59.427Z',
  featured: 0,
  thumbnail: {
    title: 'thumb',
    templateUrl: 'https://res.cloudinary.com/icc-web/image/upload/{formatInstructions}/dev/tfr4n4ndzaplzadw5l7p',
    format: 'png',
    slug: 'thumb-x6273',
  },
  entityCode: 'video',
  _listAvailability: 0,
};
