import AccordionComponent from '@/components/common/Accordion/Accordion';
import SectionWithHeader from '@/components/common/SectionWithHeader/SectionWithHeader';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { getBooleanProperty, getDarkClass } from '@/helpers/pageComponentPropertyHelper';
import { ComponentProps, ModuleProps } from '@/models/types/components';
import { DistributionEntity, ForgeDapiEntityCode } from '@/models/types/forge';
import { getEntity } from '@/services/forgeDistributionService';

type AccordionProps = {
  slug?: string;
  expandFirstElement?: boolean;
} & ModuleProps;

const Accordion = async ({ data }: { data: ComponentProps }) => {
  const { isFullWidth, slug, headerTitle, headerTitleHeadingLevel, hideHeaderTitle, expandFirstElement, isDark } =
    data.properties as AccordionProps;

  if (moduleIsNotValid(data, ['slug'])) return null;

  const accordionEntity: DistributionEntity | null = await getEntity(ForgeDapiEntityCode.accordions, slug, {
    variables: data.variables,
  });

  if (!accordionEntity || !accordionEntity.fields?.accordions || accordionEntity.fields.accordions.length === 0)
    return null;

  return (
    <SectionWithHeader
      data={{
        headerTitle: headerTitle,
        headerTitleHeadingLevel: headerTitleHeadingLevel,
        hideHeaderTitle: getBooleanProperty(hideHeaderTitle),
        hasFullWidthHeader: isFullWidth,
        hasFullWidthContent: isFullWidth,
        sectionClassName: `d3-accordion ${isFullWidth ? '-full-width' : ''} ${getDarkClass(isDark)}`,
        children: (
          <AccordionComponent
            elements={accordionEntity.fields.accordions}
            expandFirstElement={expandFirstElement}
          />
        ),
      }}
    />
  );
};
export default Accordion;
