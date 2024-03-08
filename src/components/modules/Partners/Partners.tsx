import Partner from '@/components/common/Partner/Partner';
import SectionWithHeader from '@/components/common/SectionWithHeader/SectionWithHeader';
import { MenuSources } from '@/components/modules/Menu/Menu';
import { getDataVariable } from '@/helpers/dataVariableHelper';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { getBooleanProperty, getDarkClass } from '@/helpers/pageComponentPropertyHelper';
import { ComponentProps, EditorialModuleProps } from '@/models/types/components';
import { getSelection } from '@/services/forgeDistributionService';
import { getSiteUrl } from '@/services/configurationService';
import { DistributionEntity } from '@/models/types/forge';

const Partners = async ({ data }: { data: ComponentProps }) => {
  const { headerTitle, hideHeaderTitle, selectionSlug, headerTitleHeadingLevel, isFullWidth, isDark } =
    data.properties as EditorialModuleProps;

  if (moduleIsNotValid(data, ['selectionSlug'])) return null;

  const baseUrl = process.env.BASE_URL || (await getSiteUrl());

  const selectionFetch = getSelection(selectionSlug);
  const [selection] = await Promise.all([selectionFetch]);
  const items = selection?.items;

  if (!items?.length) return null;

  const direction = getDataVariable(data.variables, 'direction') || '';
  const source = getDataVariable(data.variables, 'source') || '';

  const partners = (
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

  return source === MenuSources.footer ? (
    partners
  ) : (
    <SectionWithHeader
      data={{
        headerTitle: headerTitle,
        headerTitleHeadingLevel: headerTitleHeadingLevel,
        hideHeaderTitle: getBooleanProperty(hideHeaderTitle),
        hasFullWidthHeader: isFullWidth,
        hasFullWidthContent: isFullWidth,
        sectionClassName: `d3-partners ${isFullWidth ? '-full-width' : ''} ${getDarkClass(isDark)}`,
        headerTitleAlignment: 'center',
        children: partners,
      }}
    />
  );
};

export default Partners;
