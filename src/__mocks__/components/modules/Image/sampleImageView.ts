import { ForgeEntityCode, ForgeEntityType } from '@/models/types/forge';
import { defaultCloudinaryTransformations } from '@/utilities/defaultCloudinaryTransformationsUtility';

const defaultLinkCssClass = 'flex flex-col items-start';
export const leftLinkCssClass = 'flex flex-col items-start';
export const centerLinkCssClass = 'flex flex-col items-center';
export const rightLinkCssClass = 'flex flex-col items-end';

const defaultImageContainerCssClass = 'flex justify-start';
export const leftImageContainerCssClass = 'flex justify-start';
export const centerImageContainerCssClass = 'flex justify-center';
export const rightImageContainerCssClass = 'flex justify-end';

export const defaultView = {
  link: 'https://www.google.com/search?q=Kylian+Mbappe',
  linkCssClass: defaultLinkCssClass,
  imageContainerCssClass: defaultImageContainerCssClass,
  imageTransformation: {
    mobile: defaultCloudinaryTransformations.ratio16_9_size60,
    tablet: defaultCloudinaryTransformations.ratio16_9_size60,
    desktop: defaultCloudinaryTransformations.ratio16_9_size60,
  },
  imageEntity: {
    id: '01ca7e18-2ff3-4c1b-bfa8-642474879944',
    type: ForgeEntityType.customEntity,
    _translationId: '18227c8b-548c-49c8-8214-9f1d35b5c124',
    _entityId: '01ca7e18-2ff3-4c1b-bfa8-642474879944',
    selfUrl:
      'https://forge-dapi.integrations-lab-forge.deltatre.digital/v2/content/en-gb/page-builder-gad-asset/my-new-image',
    slug: 'my-new-image',
    title: 'My new image',
    tags: [],
    relations: [],
    references: {},
    fields: {
      tag: 'webcomp_ab42dee4-138a-412b-8ec3-cdd579bab80f',
      altText: 'Kylian Mbappe',
      caption: 'The French footballer',
      clickThroughUrl: 'https://www.google.com',
    },
    createdBy: 'Author',
    lastUpdatedBy: 'Author',
    lastUpdatedDate: '2022-10-28T09:13:17.998Z',
    contentDate: '2022-10-28T09:10:01.495Z',
    featured: 0,
    entityCode: ForgeEntityCode.pageBuilderGadAsset,
    _listAvailability: 0,
    image: {
      title: '',
      templateUrl: '',
      format: '',
      slug: '',
    },
    context: null,
    headline: '',
    parts: [],
    url: '',
    thumbnail: {
      title: '',
      templateUrl: '',
      format: '',
      slug: '',
    },
  },
  asset: {
    name: 'Kylian_Mbappe_pyebj0',
    publicId: 'sandbox-integrations/Ali/Kylian_Mbappe_pyebj0',
    resourceType: 'image',
    type: 'upload',
    format: 'png',
    tags: ['webcomp_ab42dee4-138a-412b-8ec3-cdd579bab80f'],
    tagsInString: 'webcomp_ab42dee4-138a-412b-8ec3-cdd579bab80f',
    created: '2022-10-28T09:09:11Z',
    uploaded: '0001-01-01T00:00:00Z',
    width: 0,
    height: 0,
    length: 1049092,
    assetUrl:
      'https://res.cloudinary.com/forgephotos/image/upload/{formatInstructions}/v1666948151/sandbox-integrations/Ali/Kylian_Mbappe_pyebj0.png',
    assetThumbnailUrl:
      'https://res.cloudinary.com/forgephotos/image/upload/{formatInstructions}/v1666948151/sandbox-integrations/Ali/Kylian_Mbappe_pyebj0.jpg',
    assetOriginalUrl:
      'https://res.cloudinary.com/forgephotos/image/upload/v1666948151/sandbox-integrations/Ali/Kylian_Mbappe_pyebj0.png',
    assetOriginalCdnUrl:
      'https://res.cloudinary.com/forgephotos/image/upload/v1666948151/sandbox-integrations/Ali/Kylian_Mbappe_pyebj0.png',
    version: '1666948151',
    imageMetadata: null,
    context: null,
    imageAnalysis: null,
    path: 'image/upload/v1666948151/sandbox-integrations/Ali/Kylian_Mbappe_pyebj0',
    pathWithFormat: 'image/upload/v1666948151/sandbox-integrations/Ali/Kylian_Mbappe_pyebj0.png',
    templatedPath: 'image/upload/{formatInstructions}/v1666948151/sandbox-integrations/Ali/Kylian_Mbappe_pyebj0',
    templatedPathWithFormat:
      'image/upload/{formatInstructions}/v1666948151/sandbox-integrations/Ali/Kylian_Mbappe_pyebj0.png',
  },
  caption: 'The French footballer',
};
