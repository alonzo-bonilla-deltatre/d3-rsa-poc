import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import { ComponentProps, ModuleProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import logger from '@/utilities/loggerUtility';
import React from 'react';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { ForgeDapiEntityCode } from '@/models/types/forge';
import ModuleContainer from '@/components/commons/ModuleContainer/ModuleContainer';
import Markdown from '@/components/commons/Markdown/Markdown';

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
    logger.log(
      `Cannot find ${ForgeDapiEntityCode.pageBuilderTextEditors} entity with slug ${slug} `,
      LoggerLevel.warning
    );
    return null;
  }

  const textAlignmentCssClassVariants: Record<string, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  return (
    <ModuleContainer isFullWidth={getBooleanProperty(isFullWidth)}>
      <Markdown
        markdownText={textEntity?.fields?.body?.toString() ?? ''}
        classNames={`${textAlignmentCssClassVariants[textAlignment ? textAlignment : 'left']}`}
      />
    </ModuleContainer>
  );
};

export default Text;
