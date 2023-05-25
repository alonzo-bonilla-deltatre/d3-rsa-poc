import { DistributionEntity } from '@/models/types/dapi';
import { ImageAsset } from '@/models/types/images';
import { Variable } from '@/models/types/pageStructure';
import { IMAGE_PLACEHOLDER } from '@/utilities/consts';
import { getDataVariable } from './dataVariableHelper';

/**
 * Given the entities array, check if there is the fallback image and fill, if needed
 * @param items the items to check
 * @param variables the variables from were to extract the placeholder image asset from
 * @returns the items enreached with the fallback image where needed
 */
export const getEntitiesWithPlaceholder = (items: DistributionEntity[] | null, variables?: Variable[] | undefined) => {
  const imagePlaceholderUrl = getDataVariable(variables, IMAGE_PLACEHOLDER);
  const fallbackImageAsset: ImageAsset = {
    title: 'no_image_available',
    templateUrl: imagePlaceholderUrl ?? '',
    format: '',
    slug: 'no_image_available',
  };

  items?.forEach((item) => {
    if (!item?.thumbnail || !item?.thumbnail?.templateUrl || item?.thumbnail?.templateUrl === '') {
      item.thumbnail = fallbackImageAsset;
    }
  });
  return items || [];
};
