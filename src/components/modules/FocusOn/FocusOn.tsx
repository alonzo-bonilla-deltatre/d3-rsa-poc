import React from 'react';
import logger from '@/utilities/logger';
import { ComponentProps, HeaderTitleProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import { notFound } from 'next/navigation';
import FocusOnView from './FocusOnView';
import HeaderTitle from '@/components/common/HeaderTitle/HeaderTitle';

type ModuleProps = {
  slug?: string;
} & HeaderTitleProps;

const FocusOn = async ({ ...data }: ComponentProps) => {
  const props = data.properties as ModuleProps;
  const { headerTitle, headerTitleHeadingLevel, hideHeaderTitle } = props as ModuleProps;
  const invalidSlugErrorMessage = 'Cannot render FocusOn module with empty slug';
  if (!Object.hasOwn(props, 'slug') || !props.slug?.length) {
    logger.log(invalidSlugErrorMessage, LoggerLevel.warning);
    throw new Error(invalidSlugErrorMessage);
  }

  const storyEntity = await getEntity('stories', props.slug, {
    hasLinkRules: true,
    variables: data.variables,
  });
  if (storyEntity == null) {
    logger.log(`Cannot find story entity with slug ${props.slug} `, LoggerLevel.warning);
    notFound();
  }

  return (
    <>
      <section className="mb-32 p-0">
        <div className="container mx-auto px-4">
          <HeaderTitle
            headerTitle={headerTitle}
            headerTitleHeadingLevel={headerTitleHeadingLevel}
            hideHeaderTitle={hideHeaderTitle?.toString() === 'true'}
          ></HeaderTitle>
        </div>

        <FocusOnView storyEntity={storyEntity} />
      </section>
    </>
  );
};

export default FocusOn;
