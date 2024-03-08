import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Handler for the revalidation API route.
 *
 * This handler processes requests to the revalidation API route. It checks the token in the request headers,
 * and if the token is invalid, it sends a 401 status code and a JSON object with an error message in the response.
 *
 * It then checks if the path query parameter is provided in the request. If not, it sends a 400 status code and an error message in the response.
 *
 * If the token is valid and the path query parameter is provided, it attempts to revalidate the page at the specified path.
 * If the revalidation is successful, it sends a JSON object with a success message in the response.
 * If an error occurs during revalidation, it sends a 500 status code and an error message in the response.
 *
 * @async
 * @param {NextApiRequest} req - The Next.js API request.
 * @param {NextApiResponse} res - The Next.js API response.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.headers.token !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  if (!req.query.path?.length) {
    return res.status(400).send('The path querystring is needed');
  }

  try {
    await res.revalidate(req.query.path as string);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}
