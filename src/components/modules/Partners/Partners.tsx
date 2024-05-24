import Partner from '@/components/commons/Partner/Partner';
import { getDataVariable } from '@/helpers/dataVariableHelper';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { ComponentProps, EditorialListModuleProps } from '@/models/types/components';
import { getSelection } from '@/services/forgeDistributionService';
import { getSiteUrl } from '@/services/configurationService';
import { DistributionEntity } from '@/models/types/forge';

const Partners = async ({ data }: { data: ComponentProps }) => {
  const { selectionSlug, isFullWidth } = data.properties as EditorialListModuleProps;

  if (moduleIsNotValid(data, ['selectionSlug'])) return null;

  const baseUrl = process.env.BASE_URL || (await getSiteUrl());

  const selectionFetch = getSelection(selectionSlug);
  const [selection] = await Promise.all([selectionFetch]);
  const items = selection?.items;

  if (!items?.length) return null;

  const direction = getDataVariable(data.variables, 'direction') || '';
  const source = getDataVariable(data.variables, 'source') || '';

  return (
    <div
      className={`flex flex-row justify-center ${
        direction === 'vertical' ? 'flex-col items-center' : ' '
      } flex-wrap gap-4`}
    >
      {items.map((entity: DistributionEntity) => {
        return (
          <Partner
            key={entity.id ?? entity._translationId}
            entity={entity}
            direction={direction}
            baseUrl={baseUrl}
            width={200}
            height={50}
          />
        );
      })}
    </div>
  );
};

export default Partners;
