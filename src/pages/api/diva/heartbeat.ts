import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Handles the API request to render the Diva Player Heartbeat.
 *
 * This function always returns a 200 status code with the message 'OK'.
 *
 * @param {NextApiRequest} req - The API request object.
 * @param {NextApiResponse} res - The API response object.
 */
const renderDivaPlayerHeartbeat = (req: NextApiRequest, res: NextApiResponse) => {
  // This heartbeat API will always return 200 status
  res.status(200).send('OK');
};

export default renderDivaPlayerHeartbeat;
