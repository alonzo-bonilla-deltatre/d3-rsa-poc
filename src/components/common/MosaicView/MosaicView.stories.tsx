import { sampleAlbumDetails } from '@/__mocks__/modules/sampleAlbumDetails';
import type { Meta } from '@storybook/react';
import MosaicView from '@/components/common/MosaicView/MosaicView';

const meta: Meta<typeof MosaicView> = {
  title: 'UiComponents/MosaicPhotosGridView',
  component: MosaicView,
  tags: ['autodocs'],
};

export default meta;

export const MobileView = () => {
  window.innerWidth = 500;
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-0.5 w-full mt-5 grid-rows-[repeat(4,198.25px)]">
      <MosaicView items={sampleAlbumDetails} />;
    </div>
  );
};

export const DesktopView = () => {
  window.innerWidth = 1300;
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-0.5 h-[803px] w-full mt-5 grid-rows-[repeat(4,198.25px)]">
      <MosaicView items={sampleAlbumDetails} />;
    </div>
  );
};
