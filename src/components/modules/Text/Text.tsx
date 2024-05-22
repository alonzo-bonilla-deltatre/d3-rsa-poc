import { ComponentProps, ModuleProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import logger from '@/utilities/loggerUtility';
import React from 'react';
import dynamic from 'next/dynamic';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { ForgeDapiEntityCode } from '@/models/types/forge';
import ModuleContainer from '@/components/commons/ModuleContainer/ModuleContainer';

const Markdown = dynamic(() => import('@/components/commons/Markdown/Markdown'));

type TextProps = {
  slug?: string;
  textAlignment?: string;
} & ModuleProps;

const Text = async ({ data }: { data: ComponentProps }) => {
  const { slug, textAlignment, isFullWidth } = data.properties as TextProps;

  if (moduleIsNotValid(data, ['slug'])) return null;

  const textEntity = await getEntity(ForgeDapiEntityCode.pageBuilderTextEditors, slug, {
    variables: data.variables,
  });
  if (!textEntity) {
    logger.log(`Cannot find Text entity with slug ${slug} `, LoggerLevel.warning);
    return null;
  }

  const textAlignmentCssClassVariants: Record<string, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  return (
    <ModuleContainer isFullWidth={isFullWidth}>
      <Markdown
        markdownText={textEntity?.fields?.body?.toString() ?? ''}
        classNames={`${textAlignmentCssClassVariants[textAlignment ? textAlignment : 'left']}`}
      />
    </ModuleContainer>
  );
};

export default Text;
