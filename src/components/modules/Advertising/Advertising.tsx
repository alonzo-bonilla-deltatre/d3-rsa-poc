import { ComponentProps } from '@/models/types/components';
import AdvertisingView from '@/components/modules/Advertising/AdvertisingView';
import { nanoid } from 'nanoid';

type AdvertisingProps = {
  mobileSlotName: string;
  desktopSlotName: string;
  mobileSize: string;
  desktopSize: string;
};

const Advertising = async ({ data }: { data: ComponentProps }) => {
  const { mobileSize, mobileSlotName, desktopSize, desktopSlotName } = data.properties as AdvertisingProps;
  const uniqueId = `ad-${nanoid()}`;

  return (
    <AdvertisingView
      uniqueId={uniqueId}
      mobileSize={mobileSize}
      mobileSlotName={mobileSlotName}
      desktopSize={desktopSize}
      desktopSlotName={desktopSlotName}
    />
  );
};

export default Advertising;
