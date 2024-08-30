import { ComponentProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import logger from '@/utilities/loggerUtility';
import { getHideModule } from '@/helpers/pageComponentPropertyHelper';

/**
 * Checks if a module is valid based on its properties and a set of validation rules.
 *
 * This function first checks if the module is hidden. If it is, it logs a warning and returns true.
 * Then, it iterates over each field in the validation array. If a field is not a property of the module, it logs a warning and sets the notValid flag to true.
 * Finally, it returns the notValid flag.
 *
 * @param {ComponentProps} data - The properties of the module to validate.
 * @param {string[]} [validation] - The fields that are required for the module to be valid.
 * @returns {boolean} True if the module is not valid, false otherwise.
 */
export const moduleIsNotValid = (data: ComponentProps, validation?: string[]): boolean => {
  let notValid = false;
  if (getHideModule(data)) {
    logger.log(`Cannot render ${data?.itemKey?.id} module because it has been set as hidden`, LoggerLevel.warning);
    return true;
  }
  validation?.forEach((field) => {
    if (!Object.hasOwn(data.properties, field)) {
      logger.log(`Cannot render ${data?.itemKey?.id} module with empty '${field}'`, LoggerLevel.warning);
      notValid = true;
    }
  });
  return notValid;
};
