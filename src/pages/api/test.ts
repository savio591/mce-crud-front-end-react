import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  if (req.method === 'POST') {
    return res.status(200).json({ message: 'ok' });
  }
  return res.status(400).json({ message: `error` });
}
