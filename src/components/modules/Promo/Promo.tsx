import { ComponentProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import { getSingleAssetByTag } from '@/services/gadService';
import logger from '@/utilities/logger';
import { notFound } from 'next/navigation';
import PromoView from './PromoView';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { ForgeDapiEntityCode } from '@/models/types/forge';

type PromoProps = {
  slug?: string;
};

const Promo = async ({ data }: { data: ComponentProps }) => {
  const properties = data.properties as PromoProps;

  if (moduleIsNotValid(data, ['slug'])) return null;

  const promoEntity = await getEntity(ForgeDapiEntityCode.promos, properties?.slug, {
    variables: data.variables,
  });

  if (!promoEntity) return null;

  const sponsor = await getSingleAssetByTag('sponsor-coates');

  return (
    <PromoView
      entity={promoEntity}
      sponsor={sponsor}
    ></PromoView>
  );
};

export default Promo;
