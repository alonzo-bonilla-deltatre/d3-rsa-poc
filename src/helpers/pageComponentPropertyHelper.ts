import { ComponentProps } from '@/models/types/components';

/**
 * Returns a boolean value based on the provided property value.
 *
 * @param {boolean | undefined} propertyValue - The property value to check.
 * @returns {boolean} True if the property value is not undefined and is true, false otherwise.
 */
export const getBooleanProperty = (propertyValue?: boolean): boolean => {
  return propertyValue !== undefined && propertyValue;
};

/**
 * Returns a boolean value based on the provided string property value.
 *
 * @param {string | undefined} propertyValue - The string property value to check.
 * @returns {boolean} True if the property value is not undefined and is 'true' (case-insensitive), false otherwise.
 */
export const getBooleanPropertyFromString = (propertyValue?: string): boolean => {
  return !!(propertyValue && propertyValue.toLowerCase() === 'true');
};

/**
 * Returns a boolean value based on the provided property value, or a default value if the property value is undefined.
 *
 * @param {boolean | undefined} propertyValue - The property value to check.
 * @param {boolean | undefined} defaultValue - The default value to return if the property value is undefined.
 * @returns {boolean} The property value if it is not undefined, the default value if the property value is undefined and the default value is not undefined and is true, false otherwise.
 */
export const getBooleanPropertyDefault = (propertyValue?: boolean, defaultValue?: boolean): boolean => {
  return propertyValue ?? defaultValue ?? false;
};

/**
 * Returns the opposite of a boolean value based on the provided property value.
 *
 * @param {boolean | undefined} propertyValue - The property value to check.
 * @returns {boolean} False if the property value is not undefined and is true, true otherwise.
 */
export const getOppositeBooleanProperty = (propertyValue?: boolean): boolean => {
  const property = getBooleanProperty(propertyValue);
  return !property;
};

/**
 * Returns a number value based on the provided property value, or a default value if the property value is undefined.
 *
 * @param {number | undefined} propertyValue - The property value to check.
 * @param {number} defaultValue - The default value to return if the property value is undefined.
 * @returns {number} The property value if it is not undefined, the default value otherwise.
 */
export const getNumberProperty = (propertyValue?: number, defaultValue: number = 0): number => {
  return propertyValue !== undefined ? Number(propertyValue) : defaultValue;
};

/**
 * Returns a string value based on the provided property value, or a default value if the property value is undefined.
 *
 * @param {string | null | undefined} propertyValue - The property value to check.
 * @param {string} defaultValue - The default value to return if the property value is undefined.
 * @returns {string} The property value if it is not null or undefined, the default value otherwise.
 */
export const getStringProperty = (propertyValue?: string | null, defaultValue: string = ''): string => {
  return propertyValue ?? defaultValue;
};

/**
 * Returns a string value based on the provided boolean property value.
 *
 * @param {boolean | undefined} propertyValue - The boolean property value to check.
 * @returns {string} 'dark' if the property value is true, 'light' otherwise.
 */
export const getDarkClass = (propertyValue?: boolean): string => {
  return getDarkTheme(propertyValue);
};

/**
 * Returns a string value based on the provided boolean property value.
 *
 * @param {boolean | undefined} propertyValue - The boolean property value to check.
 * @returns {string} 'dark' if the property value is true, 'light' otherwise.
 */
export const getDarkTheme = (propertyValue?: boolean): string => {
  const property = getBooleanPropertyDefault(Boolean(propertyValue), false);
  return property ? 'dark' : 'light';
};

/**
 * Returns a boolean value based on the hideModule property of the provided properties object.
 *
 * @param {ComponentProps & { hideModule?: boolean } | undefined} properties - The properties object to check.
 * @returns {boolean} True if the properties object is not undefined and the hideModule property is true, false otherwise.
 */
export const getHideModule = (properties?: ComponentProps & { hideModule?: boolean }): boolean => {
  return properties?.properties !== undefined && properties.properties.hideModule === true;
};

/**
 * Returns a boolean value based on the hideLayout property of the provided properties object.
 *
 * @param {ComponentProps & { hideLayout?: boolean } | undefined} properties - The properties object to check.
 * @returns {boolean} True if the properties object is not undefined and the hideLayout property is true, false otherwise.
 */
export const getHideLayout = (properties?: ComponentProps & { hideLayout?: boolean }): boolean => {
  return properties?.properties !== undefined && properties.properties.hideLayout === true;
};

/**
 * Returns a string value based on the provided heading level.
 *
 * @param {string | undefined} headingLevel - The heading level to check.
 * @param {string} defaultLevel - The default heading level to return if the heading level is undefined.
 * @returns {string} The heading level if it is not undefined, the default level otherwise.
 */
export const getHeadingTag = (headingLevel?: string, defaultLevel: string = 'h2'): string => {
  return headingLevel !== undefined ? headingLevel.toLowerCase() : defaultLevel;
};

/**
 * Returns a string value based on the provided heading level.
 *
 * @param {string | undefined} headingLevel - The heading level to check.
 * @returns {string} The heading level number if the heading level is not undefined, '2' otherwise.
 */
export const getHeadingTagNumber = (headingLevel?: string): string => {
  return headingLevel !== undefined ? getHeadingTag(headingLevel).substring(1) : '2';
};
