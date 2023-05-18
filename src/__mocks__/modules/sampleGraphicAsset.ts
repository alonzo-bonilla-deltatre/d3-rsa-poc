import { PageStructureItemType } from '@/models/types/pageStructure';

const sampleGraphicAsset = {
  key: {
    id: 'GraphicAsset',
    namespace: 'd3-external',
  },
  type: PageStructureItemType.module,
  properties: {
    assetTag: 'react-poc-supercars-logo',
    assetName: 'Logo',
    assetLink: '/#nolink',
    className: 'test',
    assetWidth: '200',
    assetHeight: '100',
    transformation: 'logos',
  },
  slot: 'logo',
};

export { sampleGraphicAsset };
