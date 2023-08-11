import { ComponentProps, HeaderTitleProps } from '@/models/types/components';
import { getSelection } from '@/services/forgeDistributionService';
import { DistributionEntity } from '@/models/types/forge';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
import HeaderTitle from '@/components/common/HeaderTitle/HeaderTitle';
import logger from '@/utilities/logger';
import { LoggerLevel } from '@/models/types/logger';

// @ts-ignore
const Partner = dynamic(() => import('@/components/common/Partner/Partner'));

type ModuleProps = {
  selectionSlug?: string;
} & HeaderTitleProps;

const Partners = async ({ ...data }: ComponentProps) => {
  const { headerTitle, headerTitleHeadingLevel, hideHeaderTitle, ctaTitle, ctaLink, selectionSlug } =
    data.properties as ModuleProps;
  if (!Object.hasOwn(data.properties, 'selectionSlug') || !selectionSlug?.length) {
    const invalidSlugErrorMessage = 'Cannot render Partners module with empty selectionSlug';
    logger.log(invalidSlugErrorMessage, LoggerLevel.warning);
    throw new Error(invalidSlugErrorMessage);
  }
  const selectionFetch = getSelection(selectionSlug);
  const [selection] = await Promise.all([selectionFetch]);
  const items = selection?.items;

  return (
    <>
      <HeaderTitle
        headerTitle={headerTitle}
        headerTitleHeadingLevel={headerTitleHeadingLevel}
        hideHeaderTitle={hideHeaderTitle?.toString() === 'true'}
        ctaTitle={ctaTitle}
        ctaLink={ctaLink}
      ></HeaderTitle>
      <div className="grid grid-flow-row-dense lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
        {items &&
          items.map((entity: DistributionEntity) => {
            return (
              <Partner
                key={nanoid()}
                entity={entity}
                width={100}
                height={50}
              ></Partner>
            );
          })}
      </div>
    </>
  );
};
export default Partners;
