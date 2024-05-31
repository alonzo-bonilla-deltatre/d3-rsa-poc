import SectionContainer from '@/components/commons/SectionContainer/SectionContainer';
import { getGridChildrenCssClasses } from '@/components/layouts/DynamicGrid/DynamicGridHelper';
import { getHideLayout, getOppositeBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import { ComponentProps, LayoutProps } from '@/models/types/components';
import { renderItemsInSlot } from '@/services/renderService';

export type DynamicGridProps = {
  gridTemplate: string;
  componentProps: ComponentProps;
} & LayoutProps;

const DynamicGrid = ({ gridTemplate, componentProps }: DynamicGridProps) => {
  const { isFullWidth, removeSectionHtmlTag } = componentProps.properties as DynamicGridProps;
  const { items, variables, metadata, previewToken } = componentProps;
  const childrenClasses: string[] = getGridChildrenCssClasses(gridTemplate);
  const slotsLength: number = gridTemplate.split('-').length;
  if (getHideLayout(componentProps)) {
    return null;
  }

  return (
    <SectionContainer
      isFullWidth={isFullWidth}
      removeSectionHtmlTag={removeSectionHtmlTag}
      className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-4 lg:gap-y-6"
    >
      {[...Array(slotsLength)].map((_, index: number) => (
        <div
          className={`col-span-1 ${childrenClasses[index]}`}
          key={index}
        >
          {renderItemsInSlot(items, 'col' + (index + 1), variables, metadata, previewToken)}
        </div>
      ))}
    </SectionContainer>
  );
};

export default DynamicGrid;
