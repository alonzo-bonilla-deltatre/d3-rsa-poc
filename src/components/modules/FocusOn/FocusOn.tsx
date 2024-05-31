import React from 'react';
import logger from '@/utilities/loggerUtility';
import { ComponentProps, HeaderTitleProps, ModuleProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import { notFound } from 'next/navigation';
import FocusOnView from './FocusOnView';
import HeaderTitle from '@/components/commons/HeaderTitle/HeaderTitle';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { ForgeDapiEntityCode } from '@/models/types/forge';
import ModuleContainer from '@/components/commons/ModuleContainer/ModuleContainer';

type FocusOnProps = ModuleProps & HeaderTitleProps;

const FocusOn = async ({ data }: { data: ComponentProps }) => {
  const { slug, headerTitle, headerTitleHeadingLevel, hideHeaderTitle, isFullWidth } = data.properties as FocusOnProps;

  if (moduleIsNotValid(data, ['slug'])) return null;

  const storyEntity = await getEntity(ForgeDapiEntityCode.stories, slug, {
    hasLinkRules: true,
    variables: data.variables,
  });
  if (!storyEntity) {
    logger.log(`Cannot find ${ForgeDapiEntityCode.stories} entity with slug ${slug} `, LoggerLevel.warning);
    notFound();
  }

  return (
    <ModuleContainer isFullWidth={isFullWidth}>
      <HeaderTitle
        className="d3-section__header-title"
        headerTitle={headerTitle}
        headerTitleHeadingLevel={headerTitleHeadingLevel}
        hideHeaderTitle={getBooleanProperty(hideHeaderTitle)}
      ></HeaderTitle>
      <FocusOnView storyEntity={storyEntity} />
    </ModuleContainer>
  );
};

export default FocusOn;
