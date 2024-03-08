import moment from 'moment';

/**
 * Formats a given date string into a specified format.
 *
 * This function takes a date string and a format string as input. If the date string is provided,
 * it formats the date string into the specified format and returns the formatted date string.
 * If the format string is not provided, it defaults to 'YYYY/MM/DD HH:mm:ss'.
 * If the date string is not provided, it returns null.
 *
 * @param {string} date - The date string to format.
 * @param {string} [format=''] - The format string to use for formatting the date.
 * @returns {string | null} The formatted date string, or null if the date string is not provided.
 */
export const formatDate = (date: string, format: string = '') => {
  if (date) {
    if (!format) {
      format = 'YYYY/MM/DD HH:mm:ss';
    }
    return moment(date).utc(false).format(format);
  } else {
    return null;
  }
};

/**
 * Returns the day part of a given date string in a specified format.
 *
 * This function takes a date string and a format string as input. If the date string is provided,
 * it formats the date string into the specified format and returns the day part of the formatted date string.
 * If the format string is not provided, it defaults to 'DD'.
 * If the date string is not provided, it returns null.
 *
 * @param {string} date - The date string to format.
 * @param {string} [format=''] - The format string to use for formatting the date.
 * @returns {string | null} The day part of the formatted date string, or null if the date string is not provided.
 */
export const getDay = (date: string, format: string = '') => {
  if (date) {
    if (!format) {
      format = 'DD';
    }
    return moment(date).utc(false).format(format);
  } else {
    return null;
  }
};

/**
 * Returns the month part of a given date string in a specified format.
 *
 * This function takes a date string and a format string as input. If the date string is provided,
 * it formats the date string into the specified format and returns the month part of the formatted date string.
 * If the format string is not provided, it defaults to 'MMM'.
 * If the date string is not provided, it returns null.
 *
 * @param {string} date - The date string to format.
 * @param {string} [format=''] - The format string to use for formatting the date.
 * @returns {string | null} The month part of the formatted date string, or null if the date string is not provided.
 */
export const getMonth = (date: string, format: string = '') => {
  if (date) {
    if (!format) {
      format = 'MMM';
    }
    return moment(date).utc(false).format(format);
  } else {
    return null;
  }
};

/**
 * Returns the year part of a given date string in a specified format.
 *
 * This function takes a date string and a format string as input. If the date string is provided,
 * it formats the date string into the specified format and returns the year part of the formatted date string.
 * If the format string is not provided, it defaults to 'YYYY'.
 * If the date string is not provided, it returns null.
 *
 * @param {string} date - The date string to format.
 * @param {string} [format=''] - The format string to use for formatting the date.
 * @returns {string | null} The year part of the formatted date string, or null if the date string is not provided.
 */
export const getYear = (date: string, format: string = '') => {
  if (date) {
    if (!format) {
      format = 'YYYY';
    }
    return moment(date).utc(false).format(format);
  } else {
    return null;
  }
};
