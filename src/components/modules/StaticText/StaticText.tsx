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

type StaticTextProps = {
  staticText?: string;
};

const StaticText = async ({ data }: { data: ComponentProps }) => {
  const { staticText } = data.properties as StaticTextProps;

  if (!staticText) {
    logger.log('Static text not found', LoggerLevel.error);
    return null;
  }

  return (
    <Markdown
      markdownText={staticText}
    />
  );
};

export default StaticText;
