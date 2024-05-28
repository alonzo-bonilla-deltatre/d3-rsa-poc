import { NextApiRequest, NextApiResponse } from 'next';

const renderDivaPlayerHeartbeat = (req: NextApiRequest, res: NextApiResponse) => {
  // This heartbeat API will always return 200 status
  res.status(200).send('OK');
};

export default renderDivaPlayerHeartbeat;
