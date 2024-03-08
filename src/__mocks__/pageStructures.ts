import { PageStructureItemType, PageStructureResponse } from '@/models/types/pageStructure';
import { ForgeMetadataCategoryType, ForgeSEOMetadataKey } from '@/models/types/forge';

const indexStructure: PageStructureResponse = {
  data: {
    structure: {
      key: {
        id: 'default',
        namespace: 'urn:forgegosandbox',
      },
      type: PageStructureItemType.template,
      properties: {},
      slots: ['main'],
      items: [
        {
          key: {
            id: 'Promo',
            namespace: 'urn:online-common',
          },
          type: PageStructureItemType.module,
          properties: {
            title: 'Promo module title',
          },
          slot: 'main',
        },
        {
          key: {
            id: 'Section',
            namespace: 'urn:online-common-xrc',
          },
          type: PageStructureItemType.layout,
          properties: {
            templates: '4',
            sectionTitle: 'TITLE SECTION',
          },
          slot: 'main',
          slots: ['item'],
          items: [
            {
              key: {
                id: 'Brightcove',
                namespace: 'urn:online-common',
              },
              type: PageStructureItemType.module,
              properties: {
                title: 'Brightcove first module title',
              },
              slot: 'item',
            },
            {
              key: {
                id: 'Brightcove',
                namespace: 'urn:online-common',
              },
              type: PageStructureItemType.module,
              properties: {
                title: 'Brightcove second module title',
              },
              slot: 'item',
            },
          ],
        },
      ],
    },
    variables: [
      {
        type: 'keyValue',
        key: 'ishomepage',
        keyValue: {
          value: 'True',
          valueType: 'boolean',
        },
      },
      {
        type: 'keyValue',
        key: 'testali',
        keyValue: {
          value: 'helloworld',
          valueType: 'string',
        },
      },
    ],
    metadata: [
      {
        category: ForgeMetadataCategoryType.seo,
        key: ForgeSEOMetadataKey.title,
        value: 'Deltatre Frontend Rendering Engine',
        type: 'string',
      },
      {
        category: ForgeMetadataCategoryType.seo,
        key: ForgeSEOMetadataKey.description,
        value: 'POC for the new frontend rendering engine',
        type: 'string',
      },
    ],
  },
  meta: {
    version: '1.0',
  },
};

export { indexStructure };
