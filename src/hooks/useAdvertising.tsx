import { displayAd, getAdSizesFromString } from '@/helpers/advertisingHelper';
import { useEffect } from 'react';

/**
 * Props for the useAdvertising hook.
 *
 * @typedef {Object} AdvertisingProps
 * @property {string} mobileSlotName - The slot name for mobile ads.
 * @property {string} desktopSlotName - The slot name for desktop ads.
 * @property {string} uniqueId - The unique ID for the ad.
 * @property {string} mobileSize - The size for mobile ads in the format 'widthxheight'.
 * @property {string} desktopSize - The size for desktop ads in the format 'widthxheight'.
 */
type AdvertisingProps = {
  mobileSlotName: string;
  desktopSlotName: string;
  uniqueId: string;
  mobileSize: string;
  desktopSize: string;
};

/**
 * A React hook for displaying ads.
 *
 * This hook takes an object of props as input and uses them to display ads.
 * It uses the displayAd function from advertisingHelper to display the ads.
 * It also converts the ad sizes from strings to arrays of numbers.
 *
 * @param {AdvertisingProps} props - The props for the hook.
 * @returns {Object} An object with the mobile and desktop ad sizes in the format 'w-width h-height', or undefined if the ad sizes are not valid.
 */
const useAdvertising = ({ mobileSlotName, desktopSlotName, mobileSize, desktopSize, uniqueId }: AdvertisingProps) => {
  const mobileSizesArray = getAdSizesFromString(mobileSize);
  const desktopSizesArray = getAdSizesFromString(desktopSize);

  useEffect(() => {
    if (!window.googletag) return;
    displayAd(window.googletag, desktopSlotName, desktopSizesArray, `${uniqueId}-desktop`);
    displayAd(window.googletag, mobileSlotName, mobileSizesArray, `${uniqueId}-mobile`);
  }, [desktopSizesArray, desktopSlotName, mobileSizesArray, mobileSlotName, uniqueId]);

  if (!mobileSizesArray || !desktopSizesArray) return;

  return {
    mobile: `w-${mobileSizesArray[0]} h-${mobileSizesArray[1]}`,
    desktop: `w-${desktopSizesArray[0]} h-${desktopSizesArray[1]}`,
  };
};

export default useAdvertising;
