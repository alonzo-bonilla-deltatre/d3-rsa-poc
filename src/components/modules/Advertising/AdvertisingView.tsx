'use client';

import useAdvertising from '@/hooks/useAdvertising';

type AdvertisingViewProps = {
  mobileSlotName: string;
  desktopSlotName: string;
  uniqueId: string;
  mobileSize: string;
  desktopSize: string;
};

const AdvertisingView = ({
  uniqueId,
  mobileSize,
  mobileSlotName,
  desktopSize,
  desktopSlotName,
}: AdvertisingViewProps) => {
  const classes = useAdvertising({ uniqueId, mobileSize, mobileSlotName, desktopSize, desktopSlotName });
  if (!classes) return null;
  return (
    <div className="my-4 flex">
      <div
        className={`mx-auto lg:hidden ${classes.mobile}`}
        id={`${uniqueId}-mobile`}
      ></div>
      <div
        className={`mx-auto hidden lg:block ${classes.desktop}`}
        id={`${uniqueId}-desktop`}
      ></div>
    </div>
  );
};

export default AdvertisingView;
