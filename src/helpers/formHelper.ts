import { FormFieldType } from '@/models/types/forge.customEntityFields';
import { LoggerLevel } from '@/models/types/logger';
import logger from '@/utilities/logger';
import formidable from 'formidable';
import { NextApiResponse } from 'next';

/**
 * Returns the default input pattern for a given form field type.
 *
 * @param {FormFieldType} fieldType - The type of the form field.
 * @returns {string | undefined} The default input pattern for the given form field type, or undefined if there is no default pattern.
 */
export const getDefaultInputPattern = (fieldType: FormFieldType) => {
  let pattern;
  switch (fieldType) {
    case FormFieldType.Email:
      // prettier-ignore
      pattern = "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$";
      break;
    case FormFieldType.Password:
      pattern = '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}';
      break;
    case FormFieldType.Phone:
      pattern = '^[0-9]*$';
      break;
    default:
      pattern = undefined;
      break;
  }
  return pattern;
};

/**
 * Validates the files in a server-side request.
 *
 * This function iterates over each file in the request and checks if its MIME type is included in the accepted MIME types for the corresponding field.
 * If a file is not accepted, it logs an error and sends a 500 response.
 *
 * @param {formidable.Files} files - The files in the request.
 * @param {formidable.Fields} fields - The fields in the request.
 * @param {NextApiResponse} res - The response object.
 */
export const validateFilesServer = (files: formidable.Files, fields: formidable.Fields, res: NextApiResponse) => {
  for (const [key, value] of Object.entries(files)) {
    const acceptValuesArray = fields[key]?.[0]?.split(',');
    const isAccepted = value?.some((file) => acceptValuesArray?.includes(file.mimetype ?? '') && file.size > 0);
    if (!isAccepted) {
      logger.log(`File ${value} has a not supported format`, LoggerLevel.error);
      res.status(500).send('Not supported format');
      break;
    }
  }
};

/**
 * Validates the files in a client-side request.
 *
 * This function iterates over each file in the request and checks if its MIME type is included in the accepted MIME types for the corresponding field.
 * If a file is not accepted, it calls the provided handler function and returns false.
 *
 * @param {Record<string, { data: File[]; accept: string; }>} files - The files in the request.
 * @param {() => void} handler - The function to call if a file is not accepted.
 * @returns {boolean} True if all files are accepted, false otherwise.
 */
export const validateFilesClient = (
  files: Record<
    string,
    {
      data: File[];
      accept: string;
    }
  >,
  handler: () => void
) => {
  let isValid = true;
  for (const [_key, value] of Object.entries(files)) {
    const acceptValuesArray = value.accept.split(',');
    const isAccepted = value.data?.some((file) => acceptValuesArray?.includes(file.type));
    if (!isAccepted) {
      handler();
      isValid = false;
      break;
    }
  }
  return isValid;
};

/**
 * Validates a form field.
 *
 * This function checks if a required field has a value, if a field's value does not exceed its maximum length, and if a field's value matches its input pattern.
 * If a field is invalid, it logs an error and returns false.
 *
 * @param {object} field - The field to validate.
 * @param {string} field.name - The name of the field.
 * @param {string | undefined} field.value - The value of the field.
 * @param {string | undefined} field.maxLength - The maximum length of the field.
 * @param {boolean | undefined} field.required - Whether the field is required.
 * @param {number | undefined} field.fieldType - The type of the field.
 * @param {string | undefined} field.pattern - The input pattern of the field.
 * @returns {boolean} True if the field is valid, false otherwise.
 */
export const validateField = (field: {
  name: string;
  value?: string;
  maxLength?: string;
  required?: boolean;
  fieldType?: number;
  pattern?: string;
}) => {
  if (!field.value && field.required) {
    logger.log(`"${field.name}" must have a value`, LoggerLevel.error);
    return false;
  }
  if (field.maxLength && field?.value && field.value?.toString().length > +field.maxLength) {
    logger.log(`"${field.name}" has not a valid length`, LoggerLevel.error);
    return false;
  }
  const pattern = field.pattern ? field.pattern : getDefaultInputPattern(field.fieldType as FormFieldType);
  if (pattern && field?.value) {
    const reg = new RegExp(pattern);
    if (!reg.test(field.value)) {
      logger.log(`"${field.name}" does not respect the specific input pattern "${pattern}"`, LoggerLevel.error);
      return false;
    }
  }
  return true;
};
