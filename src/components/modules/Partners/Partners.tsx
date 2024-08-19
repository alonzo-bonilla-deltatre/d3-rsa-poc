import Partner from '@/components/commons/Partner/Partner';
import { getDataVariable } from '@/helpers/dataVariableHelper';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import { ComponentProps, EditorialListModuleProps } from '@/models/types/components';
import { getSelection } from '@/services/forgeDistributionService';
import { getSiteUrl } from '@/services/configurationService';
import { DistributionEntity } from '@/models/types/forge';
import ModuleContainer from '@/components/commons/ModuleContainer/ModuleContainer';

const Partners = async ({ data }: { data: ComponentProps }) => {
  const { selectionSlug, isFullWidth } = data.properties as EditorialListModuleProps;

  if (moduleIsNotValid(data, ['selectionSlug'])) return null;

  const baseUrl = process.env.BASE_URL || (await getSiteUrl());

  const selection = await getSelection(selectionSlug);
  const items = selection?.items;

  if (!items?.length) return null;

  const direction = getDataVariable(data.variables, 'direction') || '';
  const source = getDataVariable(data.variables, 'source') || '';

  return (
    <ModuleContainer isFullWidth={getBooleanProperty(isFullWidth)}>
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
    </ModuleContainer>
  );
};

export default Partners;
