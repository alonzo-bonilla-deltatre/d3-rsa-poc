/* istanbul ignore file */
import { validateField } from '@/helpers/formHelper';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import logger from '@/utilities/loggerUtility';
import { AttachmentJSON } from '@sendgrid/helpers/classes/attachment';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import sgMail from '@sendgrid/mail';
import formidable from 'formidable';
import * as fs from 'fs';
import { DistributionEntity, ForgeDapiEntityCode } from '@/models/types/forge';

/**
 * Function to send an email with form data using SendGrid.
 * It retrieves a form entity from the Forge Distribution API using the provided `slug`.
 * If the form is not valid, it throws an error.
 * Otherwise, it sets the SendGrid API key and sends a response email and a receiver email if the form entity has a sender email.
 *
 * @param {string} slug - The slug of the form entity to get.
 * @param {formidable.Fields} fields - The form fields to validate and include in the email.
 * @param {formidable.Files} files - The form files to include in the email.
 * @throws {Error} - If the form is not valid.
 */
export const sendFormEmail = async (slug: string, fields: formidable.Fields, files: formidable.Files) => {
  const formEntity = await getEntity(ForgeDapiEntityCode.forms, slug);
  if (!isFormValid(fields, formEntity)) {
    throw new Error('Form is not valid');
  }

  sgMail.setApiKey(process.env.SEND_GRID_API_KEY ?? '');
  if (formEntity?.fields?.senderEmail) {
    await sendResponseEmail(fields, files, formEntity);
    await sendReceiverEmail(fields, files, formEntity);
  }
};

/**
 * Function to check if a form is valid.
 * It iterates over the provided fields and checks if each field is valid according to the corresponding field in the form entity.
 * If a field is not valid, it returns `false`.
 * If all fields are valid, it returns `true`.
 *
 * @param {formidable.Fields} fields - The form fields to check.
 * @param {DistributionEntity | null} formEntity - The form entity to use for validation.
 * @returns {boolean} - `true` if the form is valid, `false` otherwise.
 */
const isFormValid = (fields: formidable.Fields, formEntity: DistributionEntity | null) => {
  let isFormValid = true;
  if (fields && formEntity) {
    for (const key in fields) {
      // @ts-ignore
      const entityField = formEntity.fields?.inputFields?.find((field) => field.name === key);
      if (entityField) {
        if (
          !validateField({
            name: entityField.name,
            value: fields[key]?.[0],
            maxLength: entityField.maxLength,
            required: entityField.required,
            fieldType: entityField.fieldType,
            pattern: entityField.pattern,
          })
        ) {
          isFormValid = false;
          break;
        }
      }
    }
  }
  return isFormValid;
};

/**
 * Function to create the HTML content of an email message.
 * It iterates over the provided fields and adds each field to the HTML content.
 * The HTML content is returned as a string.
 *
 * @param {formidable.Fields} fields - The form fields to include in the HTML content.
 * @param {string} html - The initial HTML content.
 * @returns {string} - The HTML content of the email message.
 */
const createMessageHtml = (fields: formidable.Fields, html: string) => {
  for (const key in fields) {
    // @ts-ignore
    if (fields[key] && fields[key].length > 0 && fields[key][0] && fields[key][0].length > 0) {
      html += `<p>${key}: ${fields[key]}</p>`;
    }
  }
  return html;
};

/**
 * Function to create the attachments of an email message.
 * It iterates over the provided files and adds each file to the attachments.
 * The attachments are returned as an array of `AttachmentJSON` objects.
 *
 * @param {formidable.Files} files - The form files to include in the attachments.
 * @returns {AttachmentJSON[] | undefined} - The attachments of the email message.
 */
const createMessageAttachments = (files: formidable.Files) => {
  let attachments: AttachmentJSON[] = [];
  if (files?.file && files?.file?.length > 0) {
    files?.file.forEach((file: any) => {
      if (file?.filepath && file?.originalFilename && file?.mimetype) {
        let attachment = fs.readFileSync(file.filepath).toString('base64');
        attachments.push({
          content: attachment,
          filename: file.originalFilename,
          type: file.mimetype,
          disposition: 'attachment',
        });
      }
    });
    return attachments;
  }
};

/**
 * Function to send an email using SendGrid.
 * It sends an email with the provided message using SendGrid and logs the response.
 * If an error occurs during the request, it logs the error and throws an error.
 *
 * @param {formidable.Fields} fields - The form fields to include in the log message.
 * @param {formidable.Files} files - The form files to include in the log message.
 * @param {MailDataRequired} msg - The message to send.
 * @throws {Error} - If an error occurs during the request.
 */
const sendEmail = async (fields: formidable.Fields, files: formidable.Files, msg: MailDataRequired) => {
  try {
    await sgMail.send(msg).then((response) => {
      logger.log(
        `SEND GRID SUBMIT FORM Response: ${JSON.stringify(response)}. Form Fields: ${JSON.stringify(
          fields
        )}. Form Files: ${JSON.stringify(files)}. Message: ${JSON.stringify(msg)}`,
        LoggerLevel.debug
      );
    });
  } catch (e) {
    let message;
    if (e instanceof Error) message = e.message;
    logger.log(
      `SEND GRID SUBMIT FORM Error: ${message} - ${JSON.stringify(e)}. Form: ${JSON.stringify(
        fields
      )}. Message: ${JSON.stringify(msg)}`,
      LoggerLevel.error
    );
    throw new Error(message);
  }
};

/**
 * Function to send a response email using SendGrid.
 * If the form entity has a `sendResponseEmail` field and a `sendResponseEmailFormFieldName` field,
 * and the provided fields include the `sendResponseEmailFormFieldName` field,
 * it creates a message with the form entity's `senderEmail`, `subjectResponseEmail`, and `bodyResponseEmail` fields,
 * and the value of the `sendResponseEmailFormFieldName` field as the recipient,
 * and sends the email using SendGrid.
 *
 * @param {formidable.Fields} fields - The form fields to use.
 * @param {formidable.Files} files - The form files to include in the email.
 * @param {DistributionEntity | null} formEntity - The form entity to use.
 */
const sendResponseEmail = async (
  fields: formidable.Fields,
  files: formidable.Files,
  formEntity: DistributionEntity | null
) => {
  if (
    formEntity?.fields?.sendResponseEmail &&
    fields[formEntity?.fields?.sendResponseEmailFormFieldName] &&
    formEntity?.fields?.bodyResponseEmail
  ) {
    const msg = {
      to: fields[formEntity?.fields?.sendResponseEmailFormFieldName],
      from: formEntity?.fields?.senderEmail,
      subject: formEntity?.fields?.subjectResponseEmail ? formEntity?.fields?.subjectResponseEmail : formEntity.title,
      text: formEntity?.fields?.bodyResponseEmail,
    };
    await sendEmail(fields, files, msg);
  }
};

/**
 * Function to send a receiver email using SendGrid.
 * If the form entity has a `receiverEmail` field,
 * it creates a message with the form entity's `senderEmail`, `subjectEmail`, and `bodyEmail` fields,
 * and the `receiverEmail` field as the recipient,
 * and sends the email using SendGrid.
 *
 * @param {formidable.Fields} fields - The form fields to use.
 * @param {formidable.Files} files - The form files to include in the email.
 * @param {DistributionEntity | null} formEntity - The form entity to use.
 */
const sendReceiverEmail = async (
  fields: formidable.Fields,
  files: formidable.Files,
  formEntity: DistributionEntity | null
) => {
  if (formEntity?.fields?.receiverEmail) {
    let msg: MailDataRequired = {
      to: formEntity?.fields?.receiverEmail,
      from: formEntity?.fields?.senderEmail,
      subject: formEntity?.fields?.subjectEmail ? formEntity?.fields?.subjectEmail : formEntity.title,
      text: formEntity?.fields?.bodyEmail,
    };
    if (fields) {
      let html = `<p>${formEntity?.fields?.bodyEmail}</p>`;
      msg.html = createMessageHtml(fields, html);
    }
    const attachments = createMessageAttachments(files);
    if (attachments && attachments.length > 0) {
      msg.attachments = attachments;
    }
    await sendEmail(fields, files, msg);
  }
};
