import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import HeaderTitle from '@/components/common/HeaderTitle/HeaderTitle';
import React from 'react';
import { translate } from '@/services/translationService';

type EventListHeaderProps = {
  headerTitle?: string;
  headerTitleHeadingLevel?: string;
  hideHeaderTitle?: boolean;
};
const EventListHeader = ({ headerTitle, headerTitleHeadingLevel, hideHeaderTitle }: EventListHeaderProps) => {
  return (
    <div className="flex flex-col justify-center items-center relative z-10">
      <span className="d3-ty-caption-medium uppercase text-grey-300 dark:text-grey-100">{translate('calendar')}</span>
      <HeaderTitle
        headerTitle={headerTitle}
        headerTitleHeadingLevel={headerTitleHeadingLevel}
        hideHeaderTitle={getBooleanProperty(hideHeaderTitle)}
        className="d3-ty-heading-1 mb-4 lg:mb-8"
      ></HeaderTitle>
    </div>
  );
};

export default EventListHeader;
