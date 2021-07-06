import { query as q } from 'faunadb';

import NextAuth from 'next-auth';

import Providers from 'next-auth/providers';

import { fauna } from '../../../services/fauna';

interface CredentialsProps {
  email: string;
  password: string;
}

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user',
    }),
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials: CredentialsProps) {
        const { email, password } = credentials;
        // const parseCredentialsToBasicAuth = Buffer.from(
        //   `${email}:${password}`
        // ).toString('base64');

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/login`,
          {
            method: 'POST',
            body: JSON.stringify({ email, password }),
          }
        );

        const tokens = await response.json();

        if (response.ok && tokens) {
          return tokens;
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async signIn(user, account, profile) {
      // console.log({ user, account, profile });
      // const { email } = user;
      // await fauna.query(
      //   q.If(
      //     q.Not(
      //       q.Exists(q.Match(q.Index('user_by_email'), q.Casefold(user.email)))
      //     ),
      //     q.Create(q.Collection('users'), { data: { email } }),
      //     q.Get(q.Match(q.Index('user_by_email'), q.Casefold(user.email)))
      //   )
      // );

      return true;
    },
  },
});
