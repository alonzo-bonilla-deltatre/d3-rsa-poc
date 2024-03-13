import { ComponentProps, EditorialModuleProps, ModuleProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import logger from '@/utilities/logger';
import React from 'react';
import dynamic from 'next/dynamic';
import { getBooleanProperty, getDarkClass } from '@/helpers/pageComponentPropertyHelper';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import SectionWithHeader from '@/components/common/SectionWithHeader/SectionWithHeader';
import { ForgeDapiEntityCode } from '@/models/types/forge';

const Markdown = dynamic(() => import('@/components/common/Markdown/Markdown'));

type TextProps = {
  slug?: string;
  textAlignment?: string;
} & EditorialModuleProps;

const Text = async ({ data }: { data: ComponentProps }) => {
  const { isFullWidth, headerTitle, headerTitleHeadingLevel, hideHeaderTitle, slug, textAlignment, isDark } =
    data.properties as TextProps;

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
    <SectionWithHeader
      data={{
        headerTitle: headerTitle,
        headerTitleHeadingLevel: headerTitleHeadingLevel,
        hideHeaderTitle: getBooleanProperty(hideHeaderTitle),
        hasFullWidthHeader: isFullWidth,
        hasFullWidthContent: isFullWidth,
        sectionClassName: `d3-text-block ${isFullWidth ? '-full-width' : ''} ${getDarkClass(isDark)}`,
        children: (
          <Markdown
            markdownText={textEntity?.fields?.body?.toString() ?? ''}
            classNames={`${textAlignmentCssClassVariants[textAlignment ? textAlignment : 'left']}`}
          />
        ),
      }}
    />
  );
};

export default Text;
