/* eslint-disable jsx-a11y/label-has-associated-control */
import { SyntheticEvent, useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import { FiAlertCircle } from 'react-icons/fi';
import Head from 'next/head';
import Link from 'next/link';

import { Form } from '../components/Form';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

import formPageStyles from '../styles/FormPages.module.scss';

interface ResponseMessage {
  type: 'success' | 'error';
  message: string;
}

export default function Login(): JSX.Element {
  const [session] = useSession();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [responseMessage, setResponseMessage] =
    useState<ResponseMessage | null>(null);

  useEffect(() => {
    if (session?.user) {
      router.push('/dashboard');
    }
  }, [session?.user, router]);

  async function handlerLogin(event: SyntheticEvent): Promise<void> {
    event.preventDefault();
    setIsSendingRequest(true);
    setResponseMessage(null);

    const response = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (response.ok) {
      setResponseMessage({ message: 'Logado com sucesso!', type: 'success' });
      return;
    }

    setResponseMessage({
      message: 'Ocorreu um erro, tente novamente!',
      type: 'error',
    });
    setPassword('');
    setIsSendingRequest(false);
  }

  return (
    <>
      <Head>
        <title>Login | MCE Tech</title>
      </Head>
      <main className={formPageStyles.container}>
        <Form
          onSubmit={handlerLogin}
          headerTitle="Entrar"
          headerSubtitle="O seu passaporte para o futuro."
        >
          <div role="alertdialog">
            {responseMessage && (
              <>
                <FiAlertCircle
                  color={responseMessage.type === 'error' ? 'red' : 'green'}
                />
                <p>{responseMessage.message}</p>
              </>
            )}
          </div>
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
              onInput={event => setPassword(event.currentTarget.value)}
              minLength={8}
              required
            />
          </label>
          <Link href="/recovery">
            <a>Esqueci a minha senha</a>
          </Link>
          <Button type="submit" disabled={isSendingRequest}>
            {!isSendingRequest ? 'Login' : 'Aguarde...'}
          </Button>
          <p>
            Não possui uma conta?{' '}
            <Link href="/signup">
              <a>Registrar-se</a>
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
