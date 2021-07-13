/* eslint-disable no-restricted-globals */
import { useEffect, useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import { getSession, useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';

import { Header } from '../../../../components/Header';
import { Breadcrumb } from '../../../../components/Breadcrumb';
import { Sidebar } from '../../../../components/SideBar';
import { Form } from '../../../../components/Form';
import { Input } from '../../../../components/Input';
import { Button } from '../../../../components/Button';

import { api } from '../../../../services/api';
import { cpfInputMask } from '../../../../utils/cpfInputMask';

import styles from '../../../../styles/Dashboard.module.scss';

type User = {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  acesso: number;
  nivel: number;
};

interface DashboardProps {
  serverStatus: { ok: boolean };
  navigationData: {
    url: string;
    name: string;
    icon: string;
  }[];
  user: User;
}

interface SessionProps extends Session {
  accessToken: string;
  user: User;
}

interface ResponseMessage {
  type: 'success' | 'error';
  message: string;
}

export default function DashboardUsers({
  serverStatus,
  navigationData,
  user,
}: DashboardProps): JSX.Element {
  const [session] = useSession() as [SessionProps, boolean];
  const routes = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [access, setAccess] = useState(0);
  const [level, setLevel] = useState(0);
  const [responseMessage, setResponseMessage] =
    useState<ResponseMessage | null>(null);

  useEffect(() => {
    setName(user.nome);
    setEmail(user.email);
    setCpf(user.cpf);
    setAccess(user.acesso);
    setLevel(user.nivel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(): Promise<void> {
    const body = {
      nome: name,
      email,
      cpf,
      senha: password,
      acesso: Number(access),
      nivel: Number(level),
    };
    const headers = {
      Authorization: `Bearer ${session.accessToken}`,
    };

    try {
      window.event.preventDefault();
      const response = await api.put(`/users/${user.id}`, body, { headers });

      if (response.status === 200) {
        setResponseMessage({
          message: 'Atualizado com sucesso!',
          type: 'success',
        });
        routes.reload();
      }
    } catch (err) {
      setResponseMessage({
        message: 'Ocorreu um erro ao atualizar dados',
        type: 'error',
      });
    }
  }

  if (!serverStatus.ok) {
    return (
      <>
        <Head>
          <title>Erro | MCE Onboarding</title>
        </Head>
        <main>
          <h1>Erro ao carreagar página.</h1>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard | MCE Onboarding</title>
      </Head>
      <main className={styles.container}>
        <Sidebar navigationData={navigationData} />
        <div className={styles.content}>
          <Header />
          <Breadcrumb list="Editar usuário" />

          <Form
            onSubmit={() => handleSubmit()}
            headerTitle="Meu perfil"
            dataFormRole="edit-user"
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
            <Input
              name="nome"
              required
              placeholder="Nome completo"
              title="Nome completo"
              value={name}
              onChange={event => setName(event.currentTarget.value)}
            />
            <Input
              name="email"
              required
              placeholder="Email"
              title="Email"
              value={email}
              onChange={event => setEmail(event.currentTarget.value)}
            />
            <Input
              name="cpf"
              required
              placeholder="cpf"
              pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}"
              maxLength={14}
              title="Digite um CPF no formato: xxx.xxx.xxx-xx"
              value={cpf}
              onChange={event =>
                setCpf(cpfInputMask(event.currentTarget.value))
              }
            />
            <Input
              name="acesso"
              required
              placeholder="Acesso"
              title="Acesso"
              type="number"
              value={access}
              onChange={event => setAccess(Number(event.currentTarget.value))}
            />
            <Input
              name="nivel"
              required
              placeholder="Nivel"
              title="Nivel"
              type="number"
              value={level}
              onChange={event => setLevel(Number(event.currentTarget.value))}
            />
            <Input
              name="senha"
              required
              placeholder="Senha"
              title="Senha"
              type="password"
              value={password}
              onChange={event => setPassword(event.currentTarget.value)}
            />
            <Button>Salvar</Button>
          </Form>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async req => {
  const session = (await getSession(req)) as SessionProps;
  const navigationData = [
    {
      url: '/dashboard',
      name: 'Dashboard',
      icon: 'Dashboard',
    },
    {
      url: `/dashboard/users`,
      name: 'Usuários',
      icon: 'FiUser',
    },
  ];

  if (session?.user.acesso === 1) {
    const response = await api.get(`/users/${req.params.slug}`, {
      headers: { Authorization: `Bearer ${session.accessToken}` },
    });

    if (response.status === 200) {
      return {
        props: {
          serverStatus: { ok: true },
          isAdmin: true,
          navigationData,
          user: response.data,
        },
      };
    }
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
    props: {
      error: 'Você não está logado',
    },
  };
};
