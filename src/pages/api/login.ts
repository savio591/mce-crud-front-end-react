import { NextApiRequest, NextApiResponse } from 'next';
import { query as q } from 'faunadb';
import { fauna } from '../../services/fauna';

type User = {
  ref: {
    id: string;
  };
  data: {
    email: string;
    name: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'POST') {
    try {
      const { email, password } = JSON.parse(req.body);

      const response = await fauna.query<User>(
        q.Login(q.Match(q.Index('getUserByEmail'), q.Casefold(email)), {
          password,
          ttl: q.TimeAdd(q.Now(), 3, 'hour'),
        })
      );
      return res.status(200).json(response);
    } catch (err) {
      return res.status(400).json({ message: `error` });
    }
  }
  return res.status(400).json({ message: `error` });
}
