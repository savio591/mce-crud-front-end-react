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
        <Form onSubmit={handlerLogin} headerTitle="ESQUECI MINHA SENHA">
          <label htmlFor="email">
            Insira seu e-mail
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
          <Button type="submit" disabled={isSendingRequest}>
            {!isSendingRequest ? 'ENVIAR CÓDIGO' : 'Aguarde...'}
          </Button>
          <p>
            Já possui uma conta?
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
