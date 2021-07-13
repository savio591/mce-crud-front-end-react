/* eslint-disable jsx-a11y/label-has-associated-control */
import { SyntheticEvent, useState } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';

import { Form } from '../../components/Form';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { vercelApi } from '../../services/api';
import formPageStyles from '../../styles/FormPages.module.scss';

export default function SignUp(): JSX.Element {
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSendingRequest, setIsSendingRequest] = useState(false);

  const { email, token } = router.query;

  if (!email && !token) {
    return <h1>Não há token</h1>;
  }

  async function handlerLogin(event: SyntheticEvent): Promise<void> {
    try {
      event.preventDefault();
      setIsSendingRequest(true);
      const response = await vercelApi.post('api/recover/callback', {
        email,
        password,
        token,
      });

      if (response.status === 200) {
        setIsSendingRequest(false);
        router.push('/dashboard');
      }

      throw new Error(response.data);
    } catch {
      setIsSendingRequest(false);
    }
  }
  // }

  return (
    <>
      <Head>
        <title>Recuperação de Senha | MCE Tech</title>
      </Head>
      <main className={formPageStyles.container}>
        <Form
          onSubmit={handlerLogin}
          headerTitle="RECUPERAÇÃO DE SENHA"
          headerSubtitle={`Recuperação de senha para ${email}`}
        >
          <label htmlFor="password">
            Senha
            <Input
              id="password"
              type="password"
              placeholder="*********"
              title="Digite a sua senha"
              value={password}
              onInput={event => {
                setPassword(event.currentTarget.value);
              }}
              minLength={8}
              autoFocus
              required
            />
          </label>
          <label htmlFor="password">
            Confirmar senha
            <Input
              id="confirm-password"
              type="password"
              placeholder="*********"
              title="Confirme sua senha"
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
            {!isSendingRequest ? 'CRIAR NOVA SENHA' : 'Aguarde...'}
          </Button>
          <p>
            Lembrou a senha?{' '}
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
  };
};
