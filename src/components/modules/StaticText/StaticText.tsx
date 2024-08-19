import { ComponentProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import logger from '@/utilities/loggerUtility';
import React from 'react';
import Markdown from '@/components/commons/Markdown/Markdown';

type StaticTextProps = {
  staticText?: string;
};

const StaticText = ({ data }: { data: ComponentProps }) => {
  const { staticText } = data.properties as StaticTextProps;

  if (!staticText) {
    logger.log('Static text not found', LoggerLevel.error);
    return null;
  }

  return <Markdown markdownText={staticText} />;
};

export default StaticText;
