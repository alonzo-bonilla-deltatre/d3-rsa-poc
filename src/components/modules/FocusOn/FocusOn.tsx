import React from 'react';
import logger from '@/utilities/logger';
import { ComponentProps, ModuleProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import { notFound } from 'next/navigation';
import FocusOnView from './FocusOnView';
import HeaderTitle from '@/components/common/HeaderTitle/HeaderTitle';
import { getBooleanProperty, getDarkClass } from '@/helpers/pageComponentPropertyHelper';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { ForgeDapiEntityCode } from '@/models/types/forge';

type FocusOnProps = {
  slug?: string;
} & ModuleProps;

const FocusOn = async ({ data }: { data: ComponentProps }) => {
  const { slug, headerTitle, headerTitleHeadingLevel, hideHeaderTitle, isDark } = data.properties as FocusOnProps;

  if (moduleIsNotValid(data, ['slug'])) return null;

  const storyEntity = await getEntity(ForgeDapiEntityCode.stories, slug, {
    hasLinkRules: true,
    variables: data.variables,
  });
  if (storyEntity == null) {
    logger.log(`Cannot find story entity with slug ${slug} `, LoggerLevel.warning);
    notFound();
  }
  const hasFullWidthHeader = true;
  const hasFullWidthContent = true;

  return (
    <section className={`d3-section`}>
      <div className={`d3-section__header px-4 ${!hasFullWidthHeader ? 'container' : ''}`}>
        <HeaderTitle
          className="d3-section__header-title"
          headerTitle={headerTitle}
          headerTitleHeadingLevel={headerTitleHeadingLevel}
          hideHeaderTitle={getBooleanProperty(hideHeaderTitle)}
        ></HeaderTitle>
      </div>
      <div className={`d3-section__content ${!hasFullWidthContent ? 'container' : ''}`}>
        <FocusOnView
          storyEntity={storyEntity}
          darkClassName={getDarkClass(isDark)}
        />
      </div>
    </section>
  );
};

export default FocusOn;
