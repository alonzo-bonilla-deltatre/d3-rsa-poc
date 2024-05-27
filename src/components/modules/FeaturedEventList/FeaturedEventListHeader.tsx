import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import HeaderTitle from '@/components/commons/HeaderTitle/HeaderTitle';
import React from 'react';
import { translate } from '@/helpers/translationHelper';
import Typography from '@/components/commons/Typography/Typography';

type EventListHeaderProps = {
  headerTitle?: string;
  headerTitleHeadingLevel?: string;
  hideHeaderTitle?: boolean;
};
const EventListHeader = ({ headerTitle, headerTitleHeadingLevel, hideHeaderTitle }: EventListHeaderProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Typography variant={'caption-m'} className="uppercase text-grey-100">{translate('calendar')}</Typography>
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
