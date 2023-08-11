import { ComponentProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import logger from '@/utilities/logger';
import React from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

// @ts-ignore
const Markdown = dynamic(() => import('@/components/common/Markdown/Markdown'));

type ModuleProps = {
  slug?: string;
  textAlignment?: string;
};

const Text = async ({ ...data }: ComponentProps) => {
  const properties = data.properties as ModuleProps;
  if (!Object.hasOwn(properties, 'slug') || !properties.slug?.length) {
    const invalidSlugErrorMessage = 'Cannot render Text module with empty slug';
    logger.log(invalidSlugErrorMessage, LoggerLevel.warning);
    return <div />;
  }

  const textEntity = await getEntity('page-builder-text-editor', properties?.slug);
  if (textEntity == null) {
    logger.log(`Cannot find Text entity with slug ${properties.slug} `, LoggerLevel.warning);
  }

  const textAlignmentCssClassVariants: Record<string, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  return textEntity ? (
    <Markdown
      markdownText={textEntity?.fields.body?.toString() ?? ''}
      classNames={`${textAlignmentCssClassVariants[properties.textAlignment ? properties.textAlignment : 'left']}`}
    />
  ) : (
    <div />
  );
};

export default Text;
