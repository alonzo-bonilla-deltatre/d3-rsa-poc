import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import HeaderTitle from '@/components/common/HeaderTitle/HeaderTitle';
import React from 'react';

type AlbumHeaderProps = {
  headerTitle?: string;
  headerTitleHeadingLevel?: string;
  hideHeaderTitle?: boolean;
};

const AlbumHeader = ({ headerTitle, headerTitleHeadingLevel, hideHeaderTitle }: AlbumHeaderProps) => {
  return (
    <div className="container flex flex-row relative z-10 pb-6">
      <HeaderTitle
        headerTitle={headerTitle}
        headerTitleHeadingLevel={headerTitleHeadingLevel}
        hideHeaderTitle={getBooleanProperty(hideHeaderTitle)}
        className="d3-ty-heading-1"
      ></HeaderTitle>
    </div>
  );
};

export default AlbumHeader;
