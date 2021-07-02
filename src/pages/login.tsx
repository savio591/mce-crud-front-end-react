import { GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { SyntheticEvent, useState } from 'react';

import { Form } from '../components/Form';

export default function Login(): JSX.Element {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function handlerLogin(event: SyntheticEvent): Promise<void> {
    event.preventDefault();

    if (username === 'savio591' && password === 'shoppng591') {
      const response = await fetch('/api/test', { method: 'POST' });

      if (response.ok) {
        setUsername('Sucesso!!');
        await delay(2000);
        router.push('/dashboard');
        return;
      }
      setUsername('NN deu certo man');
    }
  }

  return (
    <>
      <Head>
        <title>Login | MCE Tech</title>
      </Head>
      <main>
        <Form onSubmit={handlerLogin}>
          <label htmlFor="username" aria-labelledby="username">
            <input
              id="username"
              type="text"
              autoComplete="nickname"
              placeholder="usuário"
              value={username}
              onInput={event => setUsername(event.currentTarget.value)}
              required
            />
          </label>
          <label htmlFor="password" aria-labelledby="password">
            <input
              id="password"
              type="password"
              placeholder="senha"
              autoComplete="current-password"
              value={password}
              onInput={event => setPassword(event.currentTarget.value)}
              required
            />
          </label>
          <button type="submit">Register</button>
        </Form>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { message: 'ok' },
    revalidate: 60 * 60 * 24,
  };
};
