/**
 * Checks if a given date is greater than the current date.
 *
 * This function takes a date string as input, converts it to a Date object, and compares it with the current date.
 * If the input date is greater than the current date, the function returns true.
 * If the input date is not greater than the current date, the function returns false.
 *
 * @param {string} dateString - The date string to check.
 * @returns {boolean} True if the input date is greater than the current date, false otherwise.
 */
export const isDateGreaterThanNow = (dateString: string) => {
  const inputDate = new Date(dateString);
  const now = new Date();
  return inputDate > now;
};

/**
 * Checks if a given date is less than the current date.
 *
 * This function takes a date string as input, converts it to a Date object, and compares it with the current date.
 * If the input date is less than the current date, the function returns true.
 * If the input date is not less than the current date, the function returns false.
 *
 * @param {string} dateString - The date string to check.
 * @returns {boolean} True if the input date is less than the current date, false otherwise.
 */
export const isDateMinorThanNow = (dateString: string) => {
  const inputDate = new Date(dateString);
  const now = new Date();
  return inputDate < now;
};
