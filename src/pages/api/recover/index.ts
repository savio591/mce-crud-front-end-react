import { query as q } from 'faunadb';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { api } from '../../../services/api';
import { fauna } from '../../../services/fauna';
import { recoverRequest } from '../../../services/recoverEmail';
import { nextUrl } from '../../../utils/nextUrl';

interface RecoverResponseData {
  message: string;
}

interface BackendResponse {
  email: string;
}

export default async function Recover(
  req: NextApiRequest,
  res: NextApiResponse<RecoverResponseData>
): Promise<void> {
  if (req.method === 'POST') {
    try {
      const { email } = req.body;

      const backendResponse = await api.get<BackendResponse[]>('/users/', {
        headers: {
          Authorization: `Bearer ${process.env.BACKEND_ADMIN_TOKEN}`,
        },
      });

      if (backendResponse.status === 200) {
        const user = backendResponse.data.find(
          userItem => userItem.email === email
        );

        if (user) {
          const response = await fauna.query<{
            data: { token: string; identifier: string };
          }>(
            q.Create(q.Collection('verification_requests'), {
              data: {
                identifier: email,
                token: uuidv4(),
                createdAt: q.Time('now'),
              },
            })
          );
          if (response) {
            const { token, identifier } = response.data;
            recoverRequest({
              identifier,
              token,
              baseUrl: nextUrl,
              url: `${nextUrl}/api/recover/callback?email=${identifier}&token=${token}`,
            });
            return res.status(200).json({ message: 'ok' });
          }
        }
      }

      return res.status(404).json({ message: 'error' });
    } catch (err) {
      return res.status(404).json({ message: 'error' });
    }
  }

  return res
    .status(404)
    .json({ message: 'You can fetch(GET) recover? It isnt have sense.' });
}
