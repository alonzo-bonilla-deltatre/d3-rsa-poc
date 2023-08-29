import { ComponentProps, HeaderTitleProps, LayoutProps } from '@/models/types/components';
import { renderItemsInSlot } from '@/services/renderService';
import { nanoid } from 'nanoid';
import { getGridChildrenCssClasses, getGridContainerCssClasses } from './DynamicGridHelper';
import HeaderTitle from '@/components/common/HeaderTitle/HeaderTitle';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';

export type DynamicGridProps = {
  gridTemplate: string;
  componentProps: ComponentProps;
};

const DynamicGrid = ({ ...data }: DynamicGridProps) => {
  const { removeSectionHtmlTag, isFullScreen } = data.componentProps.properties as LayoutProps;
  const dynamicGridContainerCssClass = getBooleanProperty(isFullScreen) ? 'w-full' : 'container w-full mx-auto';
  const DynamicGridContainer = `${
    getBooleanProperty(removeSectionHtmlTag) ? 'div' : 'section'
  }` as keyof JSX.IntrinsicElements;
  return (
    <DynamicGridContainer className={dynamicGridContainerCssClass}>
      {renderDynamicGridComponent(data)}
    </DynamicGridContainer>
  );
};

function renderDynamicGridComponent(data: DynamicGridProps) {
  const { headerTitle, headerTitleHeadingLevel, hideHeaderTitle, ctaTitle, ctaLink } = data.componentProps
    .properties as HeaderTitleProps;
  const { items, variables, metadata, previewToken } = data.componentProps;
  const classes: string[] = getGridChildrenCssClasses(data.gridTemplate);
  const slotsLength: number = data.gridTemplate.split('-').length;
  return (
    <>
      <HeaderTitle
        headerTitle={headerTitle}
        headerTitleHeadingLevel={headerTitleHeadingLevel}
        hideHeaderTitle={getBooleanProperty(hideHeaderTitle)}
        ctaTitle={ctaTitle}
        ctaLink={ctaLink}
      ></HeaderTitle>
      <div className={getGridContainerCssClasses(data.gridTemplate)}>
        {[...Array(slotsLength)].map((_, i: number) => (
          <div
            key={`col${i + 1}_${nanoid()}`}
            id={`col${i + 1}_${nanoid()}`}
            className={classes[i]}
          >
            {renderItemsInSlot(items, 'col' + (i + 1), variables, metadata, previewToken)}
          </div>
        ))}
      </div>
    </>
  );
}

export default DynamicGrid;
