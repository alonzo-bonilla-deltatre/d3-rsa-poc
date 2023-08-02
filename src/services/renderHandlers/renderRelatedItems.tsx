/* instanbul ignore file */
import { LoggerLevel } from '@/models/types/logger';
import logger from '@/utilities/logger';

import renderEditorialRelatedItem from '@/components/relatedItems/EditorialEntity/EditorialEntityWrapper';
import renderPromoRelatedItem from '@/components/relatedItems/Promo/PromoWrapper';
import { DistributionEntity } from '@/models/types/forge';

const relatedItemsList: Record<any, (item: DistributionEntity) => React.ReactElement> = {
  story: renderEditorialRelatedItem,
  'customentity.brightcovevideo': renderEditorialRelatedItem,
  'customentity.promo': renderPromoRelatedItem,
};

export const renderRelatedItem = (item: DistributionEntity): React.ReactElement => {
  let relItemType = item.type;
  if (relItemType === 'customentity') {
    relItemType = `customentity.${item.entityCode}`;
  }
  const renderRelatedItem = relatedItemsList[relItemType];
  if (renderRelatedItem) {
    return renderRelatedItem({ ...item } as DistributionEntity);
  }
  logger.log(`Cannot render RELATED ITEM ${relItemType}`, LoggerLevel.warning);
  return <></>;
};
