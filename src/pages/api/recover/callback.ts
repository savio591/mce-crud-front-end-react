import { query as q } from 'faunadb';
import { NextApiRequest, NextApiResponse } from 'next';
import { api } from '../../../services/api';
import { fauna } from '../../../services/fauna';

interface RecoverResponseData {
  message: string;
}

interface CallbackRequestBody {
  email: string;
  token: string;
  password: string;
}

interface BackendResponse {
  email: string;
  password: string;
  id: string;
}

export default async function Recover(
  req: NextApiRequest,
  res: NextApiResponse<RecoverResponseData>
): Promise<void> {
  if (req.method === 'POST') {
    try {
      const {
        email: identifier,
        token,
        password,
      }: CallbackRequestBody = req.body;

      const backendResponse = await api.get<BackendResponse[]>('/users/', {
        headers: {
          Authorization: `Bearer ${process.env.BACKEND_ADMIN_TOKEN}`,
        },
      });

      if (backendResponse.status === 200) {
        const response = await fauna.query<{
          ref: q.ExprArg;
          data: { identifier: string; token: string };
        }>(
          q.Get(
            q.Match(q.Index('verification_request_by_token'), token, identifier)
          )
        );

        const userToRecoverPassword = backendResponse.data.find(
          user => user.email === response.data.identifier
        );

        if (userToRecoverPassword) {
          await api.put(
            `users/${userToRecoverPassword.id}`,
            {
              senha: password,
            },
            {
              headers: {
                Authorization: `Bearer ${process.env.BACKEND_ADMIN_TOKEN}`,
              },
            }
          );

          await fauna.query(q.Delete(q.Ref(response.ref)));
          return res.status(200).json({ message: 'sucess!' });
        }
      }

      return res.status(404).json({ message: 'Error on save password' });
    } catch (err) {
      return res.status(404).json(err);
    }
  }

  return res
    .status(404)
    .json({ message: 'You can fetch(GET) recover? It isnt have sense.' });
}
