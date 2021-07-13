import NextAuth, { Session, User } from 'next-auth';
import Providers from 'next-auth/providers';
import { FaunaAdapter } from '@next-auth/fauna-adapter';

import { api } from '../../../services/api';
import { fauna } from '../../../services/fauna';

interface CredentialsProps {
  email: string;
  password: string;
}

interface SessionUserData extends Session {
  user: {
    name: string;
    email: string;
    image: string;
    user: {
      id: number;
      nome: string;
      email: string;
      cpf: string;
      acesso: number;
      nivel: number;
    };
  };
}

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials: CredentialsProps): Promise<User | null> {
        try {
          const { email: login, password: senha } = credentials;

          const response = await api.post('/auth', { login, senha });

          const user = response.data;

          if (response.status === 200) {
            return user;
          }

          return null;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  session: { jwt: true },
  adapter: FaunaAdapter({ faunaClient: fauna }),

  callbacks: {
    async jwt(token, user, account) {
      if (account && user) {
        return {
          accessToken: user.token,
          user,
        };
      }
      return token;
    },
    async session(session, token) {
      const newSession = token as SessionUserData;
      if (token) {
        return {
          ...session,
          user: newSession.user.user,
          accessToken: newSession.accessToken,
        };
      }

      return session;
    },
  },
});
