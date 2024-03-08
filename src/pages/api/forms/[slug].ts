/* istanbul ignore file */
import { validateFilesServer } from '@/helpers/formHelper';
import { LoggerLevel } from '@/models/types/logger';
import { recaptchaValidation } from '@/services/formService';
import { sendFormEmail } from '@/services/sendGridService';
import logger from '@/utilities/logger';
import { Formidable } from 'formidable';
import type { NextApiRequest, NextApiResponse } from 'next';

// first we need to disable the default body parser
/**
 * Configuration for the Next.js API route.
 *
 * This configuration disables the default body parser, allowing the use of a custom body parser.
 */
export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * Handler for the API route.
 *
 * This handler processes POST requests to the API route. It validates the request method, parses the request body using Formidable,
 * validates the files in the request, and sends an email with the form data.
 *
 * If the request method is not POST, it sends a 405 status code in the response.
 * If an error occurs, it logs the error and sends a 500 status code in the response.
 *
 * @async
 * @param {NextApiRequest} req - The Next.js API request.
 * @param {NextApiResponse} res - The Next.js API response.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405);
  }

  const slug = req.query.slug as string;
  const captchaToken = req.query.captchaToken as string;
  const form = new Formidable({
    allowEmptyFiles: true,
    uploadDir: './uploads/',
    keepExtensions: false,
    minFileSize: undefined,
    maxFileSize: 8000000, // the recommended limit is 8MB
  });

  const [fields, files] = await form.parse(req);

  if (files) {
    validateFilesServer(files, fields, res);
  }

  try {
    const recaptchaValidationResponse = await recaptchaValidation(captchaToken);
    if (recaptchaValidationResponse) {
      await sendFormEmail(slug, fields, files);
      res.status(200);
      res.end();
    }
  } catch (e) {
    let message;
    if (e instanceof Error) message = e.message;
    logger.log(
      `SEND GRID SUBMIT FORM Error: ${message} - ${JSON.stringify(e)}. Form Fields: ${JSON.stringify(
        fields
      )}. Form Files: ${JSON.stringify(files)}.`,
      LoggerLevel.error
    );
    res.status(500).send(message);
  }
}
