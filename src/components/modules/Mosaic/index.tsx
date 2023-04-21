import { ComponentProps } from '@/models/types/components';
import { getAllEntities, getQueryString } from '@/services/dapiService';
import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import { getAssetsByTag } from '@/services/gadService';
import logger from '@/utilities/logger';
import { LoggerLevel } from '@/models/types/logger';
import ModuleTitle from '@/components/common/ModuleTitle';
import React from 'react';
import MosaicContainer from '@/components/modules/Mosaic/MosaicContainer';

type ModuleProps = {
  moduleTitle: string;
  headingLevel: string;
  displayModuleTitle: string;
  entityType: string;
  skip: number;
  limit: number;
  tags: string;
};

const Mosaic = async ({ ...data }: ComponentProps) => {
  const { moduleTitle, headingLevel, displayModuleTitle, entityType, skip, limit, tags } =
    data.properties as ModuleProps;
  if (!Object.hasOwn(data.properties, 'entityType') || !entityType.length) {
    logger.log('Cannot render TestMosaicList module with empty entityType', LoggerLevel.warning);
    return null;
  }

  const queryString = getQueryString({ skip, limit, tags });

  const promoEntitiesFetch = getAllEntities(entityType, queryString);

  const [promos] = await Promise.all([promoEntitiesFetch]);
  const items = promos?.items;

  const gadAssetsPlaceHolderFetch = getAssetsByTag('react-poc-placeholder');

  const [gadThumbnailPlaceHolderAssets] = await Promise.all([gadAssetsPlaceHolderFetch]);
  const thumbnailPlaceHolder: GraphicAssetsDashboardItem | null = gadThumbnailPlaceHolderAssets?.length
    ? gadThumbnailPlaceHolderAssets[0]
    : null;

  return items?.length ? (
    <>
      <section className="mt-8">
        <ModuleTitle
          canRender={/true/.test(displayModuleTitle)}
          heading={headingLevel}
          text={moduleTitle}
        ></ModuleTitle>
        <div className="flex px-8">
          <MosaicContainer
            items={items}
            thumbnailPlaceHolder={thumbnailPlaceHolder}
          ></MosaicContainer>
        </div>
      </section>
    </>
  ) : (
    <div />
  );
};
export default Mosaic;
