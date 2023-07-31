/**
 * Get property's value from Components' props
 * @param propertyValue the property to look for
 * @returns the property boolean value or undefined, if found true return true, or false if is undefined or false
 */
export const getBooleanProperty = (propertyValue: boolean | undefined): boolean => {
  return propertyValue !== undefined && propertyValue;
};

/**
 * Get property's value from Components' props
 * @param propertyValue the property to look for
 * @param defaultValue default value in the property is undefined
 * @returns the property number value or undefined, if found number return number, or defaultValue if is undefined or not number
 */
export const getNumberProperty = (propertyValue: number | undefined, defaultValue: number = 0): number => {
  return propertyValue !== undefined ? Number(propertyValue) : defaultValue;
};
