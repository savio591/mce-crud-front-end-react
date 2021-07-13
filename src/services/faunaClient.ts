import { Client } from 'faunadb';

export const fauna = (secret: string): Client =>
  new Client({
    secret,
  });
