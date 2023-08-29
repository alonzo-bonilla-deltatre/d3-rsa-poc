import { ComponentProps, HeaderTitleProps } from '@/models/types/components';
import { getEntityList } from '@/services/forgeDistributionService';
import logger from '@/utilities/logger';
import { LoggerLevel } from '@/models/types/logger';
import GridListComponent from '@/components/common/list/Grid/Grid';
import HeaderTitle from '@/components/common/HeaderTitle/HeaderTitle';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';

type ModuleProps = {
  skip?: number;
  limit?: number;
  selectionSlug?: string;
} & HeaderTitleProps;

const GridList = async ({ ...data }: ComponentProps) => {
  const { headerTitle, headerTitleHeadingLevel, hideHeaderTitle, ctaTitle, ctaLink, skip, limit, selectionSlug } =
    data.properties as ModuleProps;
  if (!Object.hasOwn(data.properties, 'selectionSlug') || !selectionSlug?.length) {
    const invalidSlugErrorMessage = 'Cannot render GridList module with empty selectionSlug';
    logger.log(invalidSlugErrorMessage, LoggerLevel.warning);
    throw new Error(invalidSlugErrorMessage);
  }

  const items = await getEntityList(selectionSlug, null, {
    hasThumbnailPlaceholder: true,
    hasLinkRules: true,
    skip,
    limit,
    variables: data.variables,
  });

  return (
    items?.length && (
      <>
        <HeaderTitle
          headerTitle={headerTitle}
          headerTitleHeadingLevel={headerTitleHeadingLevel}
          hideHeaderTitle={getBooleanProperty(hideHeaderTitle)}
          ctaTitle={ctaTitle}
          ctaLink={ctaLink}
        ></HeaderTitle>
        <GridListComponent items={items} />
      </>
    )
  );
};
export default GridList;
