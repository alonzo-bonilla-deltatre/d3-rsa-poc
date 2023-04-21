'use client';

import { DistributionEntity } from '@/models/types/dapi';
import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import { transformations } from '@/utilities/cloudinaryTransformations';
import { nanoid } from 'nanoid';
import Masonry from 'react-masonry-css';
import MosaicItem from './MosaicItem';

type MosaicContainerProps = {
  items: DistributionEntity[];
  thumbnailPlaceHolder: GraphicAssetsDashboardItem | null;
};

const MosaicContainer = ({ ...data }: MosaicContainerProps) => {
  const { items, thumbnailPlaceHolder } = data as MosaicContainerProps;

  let transformationsList = ['mosaicSquareThumbnail', 'mosaicLandscapeThumbnail', 'mosaicPortraitThumbnail'];
  let textOverlapValue = [true, false];

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex"
        columnClassName="p-2"
      >
        {items.map((item: DistributionEntity) => {
          return (
            <MosaicItem
              key={nanoid()}
              item={item}
              thumbnailPlaceHolder={thumbnailPlaceHolder}
              transformation={
                transformations[transformationsList[Math.floor(Math.random() * transformationsList.length)]]
              }
              hasTextOverlap={textOverlapValue[Math.floor(Math.random() * textOverlapValue.length)]}
            ></MosaicItem>
          );
        })}
      </Masonry>
    </>
  );
};

export default MosaicContainer;
