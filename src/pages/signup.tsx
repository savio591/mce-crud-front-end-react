/* eslint-disable jsx-a11y/label-has-associated-control */
import { SyntheticEvent, useState } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';

import { Form } from '../components/Form';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

import formPageStyles from '../styles/FormPages.module.scss';

export default function SignUp(): JSX.Element {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSendingRequest, setIsSendingRequest] = useState(false);

  function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function handlerLogin(event: SyntheticEvent): Promise<void> {
    event.preventDefault();

    setIsSendingRequest(true);

    const response = await fetch('/api/test', { method: 'POST' });

    if (response.ok) {
      await delay(2000);
      setIsSendingRequest(false);
      setEmail('Sucesso!!');
      await delay(2000);
      router.push('/dashboard');
      return;
    }
    setIsSendingRequest(false);
    setEmail('NN deu certo man');
  }

  return (
    <>
      <Head>
        <title>Cadastro | MCE Tech</title>
      </Head>
      <main className={formPageStyles.container}>
        <Form onSubmit={handlerLogin} headerTitle="Cadastro">
          <label htmlFor="email">
            Email
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="seuemail@email.com"
              title="Digite o seu email"
              value={email}
              onInput={event => setEmail(event.currentTarget.value)}
              autoFocus
              required
            />
          </label>
          <label htmlFor="password">
            Senha
            <Input
              id="password"
              type="password"
              placeholder="*********"
              title="Digite a sua senha"
              autoComplete="current-password"
              value={password}
              onInput={event => {
                setPassword(event.currentTarget.value);
              }}
              minLength={8}
              required
            />
          </label>
          <label htmlFor="password">
            Confirmar senha
            <Input
              id="password"
              type="password"
              placeholder="*********"
              title="Confirme sua senha"
              autoComplete="current-password"
              value={confirmPassword}
              onInput={event => {
                setConfirmPassword(event.currentTarget.value);
                if (password === event.currentTarget.value) {
                  event.currentTarget.setCustomValidity('');
                  return;
                }
                event.currentTarget.setCustomValidity(
                  'As senhas não coincidem. Verifique novamente'
                );
              }}
              minLength={8}
              required
            />
          </label>
          <Button type="submit" disabled={isSendingRequest}>
            {!isSendingRequest ? 'Login' : 'Aguarde...'}
          </Button>
          <p>
            Já possui uma conta?{' '}
            <Link href="/login">
              <a>Entrar</a>
            </Link>
          </p>
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
