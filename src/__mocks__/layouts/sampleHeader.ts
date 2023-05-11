import { PageStructureItemType, StructureItem } from '@/models/types/pageStructure';
import { sampleGraphicAsset } from '../modules/sampleGraphicAsset';
import { sampleMiddleContent } from '../modules/sampleHtmlContent';

const sampleHeader = {
  key: {
    id: 'Header',
    namespace: 'd3-external',
  },
  type: 'layout',
  properties: {},
  slot: 'main',
  slots: ['logo'],
  items: [sampleMiddleContent],
};

export { sampleHeader };
