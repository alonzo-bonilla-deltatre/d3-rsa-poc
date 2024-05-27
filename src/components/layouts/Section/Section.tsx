import { getBooleanProperty, getHideLayout, getStringProperty } from '@/helpers/pageComponentPropertyHelper';
import { ComponentProps, HeaderTitleProps, LayoutProps } from '@/models/types/components';
import { StructureItem } from '@/models/types/pageStructure';
import { renderItem } from '@/services/renderService';
import SectionContainer from '@/components/commons/SectionContainer/SectionContainer';
import HeaderTitle from '@/components/commons/HeaderTitle/HeaderTitle';
import React from 'react';

const Section = ({ data }: { data: ComponentProps }) => {
  const { removeSectionHtmlTag, isFullWidth } = data.properties as LayoutProps;
  const { headerTitle, headerTitleHeadingLevel, hideHeaderTitle } = data.properties as HeaderTitleProps;
  if (getHideLayout(data)) {
    return null;
  }

  return (
    <SectionContainer
      isFullWidth={isFullWidth}
      removeSectionHtmlTag={removeSectionHtmlTag}
    >
      <HeaderTitle
        headerTitle={headerTitle}
        headerTitleHeadingLevel={getStringProperty(headerTitleHeadingLevel?.toLowerCase()) ?? 'h2'}
        hideHeaderTitle={getBooleanProperty(hideHeaderTitle)}
        className={'mb-6'}
      ></HeaderTitle>
      {data.items?.map((item: StructureItem) => renderItem(item, data.variables, data.metadata, data.previewToken))}
    </SectionContainer>
  );
};

export default Section;
