import { getBooleanPropertyDefault, getStringProperty } from '@/helpers/pageComponentPropertyHelper';
import { DistributionEntity } from '@/models/types/forge';
import { FormEntity, FormFields } from '@/models/types/forge.customEntityFields';
import { LoggerLevel } from '@/models/types/logger';
import logger from '@/utilities/logger';
import axios from 'axios';

/**
 * Function to get a `FormEntity` based on the provided `DistributionEntity`.
 * It retrieves the `FormFields` from the `DistributionEntity` and gets the properties of the form fields.
 * The `FormEntity` is created with these properties and returned.
 *
 * @param {DistributionEntity} distributionEntity - The distribution entity to use.
 * @returns {Promise<FormEntity>} - The created `FormEntity`.
 */
export const getFormEntity = async (distributionEntity: DistributionEntity): Promise<FormEntity> => {
  const fields = distributionEntity?.fields as FormFields;
  const description = getStringProperty(fields?.description);
  const inputFields = fields.inputFields ? fields.inputFields : null;
  const submitActionLabel = getStringProperty(fields?.submitActionLabel);
  const senderEmail = getStringProperty(fields?.senderEmail);
  const subjectEmail = getStringProperty(fields?.subjectEmail);
  const bodyEmail = getStringProperty(fields?.bodyEmail);
  const subjectResponseEmail = getStringProperty(fields?.subjectResponseEmail);
  const bodyResponseEmail = getStringProperty(fields?.bodyResponseEmail);
  const sendResponseEmail = getBooleanPropertyDefault(fields?.sendResponseEmail, false);
  const sendResponseEmailFormFieldName = getStringProperty(fields?.sendResponseEmailFormFieldName);
  const receiverEmail = getStringProperty(fields?.receiverEmail);

  const formEntity = {
    description,
    inputFields,
    submitActionLabel,
    senderEmail,
    subjectEmail,
    bodyEmail,
    subjectResponseEmail,
    bodyResponseEmail,
    sendResponseEmail,
    sendResponseEmailFormFieldName,
    receiverEmail,
  } as FormEntity;

  return { ...distributionEntity, ...formEntity };
};

/**
 * Function to validate a reCAPTCHA token.
 * It sends a POST request to the reCAPTCHA API with the secret key and the provided token.
 * If the response is successful, it returns `true`.
 * If the response is not successful or an error occurs during the request, it logs the error and throws an error.
 *
 * @param {string} captchaToken - The reCAPTCHA token to validate.
 * @returns {Promise<boolean>} - `true` if the validation is successful, otherwise an error is thrown.
 * @throws {Error} - If the validation is not successful or an error occurs during the request.
 */
export const recaptchaValidation = async (captchaToken: string) => {
  if (!process.env.RECAPTCHA_SECRET_KEY || !process.env.RECAPTCHA_SITE_KEY) {
    return true;
  }
  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`
    );
    if (response.data.success) {
      return true;
    } else {
      throw new Error('reCAPTCHA verification failed.');
    }
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    logger.log(message ?? 'Internal server error', LoggerLevel.error);
    throw new Error('reCAPTCHA verification failed.');
  }
};
