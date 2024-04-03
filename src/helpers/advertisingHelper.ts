import { LoggerLevel } from '@/models/types/logger';
import logger from '@/utilities/loggerUtility';

/**
 * Converts a string representing ad sizes into an array of numbers.
 * @param {string} sizeString - The string representing the ad sizes in the format 'widthxheight'.
 * @returns {number[] | null} An array of numbers representing the ad sizes, or null if the format is incorrect.
 */
export const getAdSizesFromString = (sizeString: string): number[] | null => {
  if (/^\d+x\d+$/.test(sizeString)) {
    return sizeString.split('x').map(Number);
  }
  logger.log(
    'Advertising error: cannot render module without correct size: must have this format 320x70',
    LoggerLevel.error
  );
  return null;
};

/**
 * Displays an ad on the page.
 * @async
 * @param {typeof window.googletag} googletag - The Google Publisher Tag API object.
 * @param {string} slotName - The name of the ad slot.
 * @param {number[] | null} sizes - The sizes of the ad.
 * @param {string} uniqueId - The unique ID of the ad.
 */
export const displayAd = /* istanbul ignore next */ async (
  googletag: typeof window.googletag,
  slotName: string,
  sizes: number[] | null,
  uniqueId: string
) => {
  if (!sizes) return;
  const promise = () =>
    new Promise<void>((resolve) =>
      googletag.cmd.push(() => {
        googletag.defineSlot(slotName, sizes as googletag.GeneralSize, uniqueId)?.addService(googletag.pubads());
        googletag.pubads().enableSingleRequest();
        googletag.pubads().collapseEmptyDivs();
        googletag.enableServices();
        resolve();
      })
    );
  await promise();
  googletag.display(uniqueId);
};
