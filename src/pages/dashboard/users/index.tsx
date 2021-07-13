/* eslint-disable no-alert */
/* eslint-disable @next/next/no-img-element */
import { RiToolsFill, RiCloseCircleLine } from 'react-icons/ri';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import { getSession, useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';

import { Header } from '../../../components/Header';
import { Sidebar } from '../../../components/SideBar';
import { Breadcrumb } from '../../../components/Breadcrumb';

import styles from '../../../styles/Dashboard.module.scss';
import { api } from '../../../services/api';

type User = {
  id: number;
  nome: string;
  email: string;
  acesso: number;
  createdAt: Date;
};

interface DashboardProps {
  serverStatus: { ok: boolean };
  navigationData: {
    url: string;
    name: string;
    icon: string;
  }[];
  users: User[];
}

interface SessionProps extends Session {
  accessToken: string;
  user: User;
}

export default function DashboardUsers({
  serverStatus,
  navigationData,
  users,
}: DashboardProps): JSX.Element {
  const [session] = useSession() as [SessionProps, boolean];
  const routes = useRouter();

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

  async function handleDeleteUser(id: number): Promise<void> {
    window.event.preventDefault();
    const confirm = window.confirm('Deseja realmente deletar esta conta?');

    if (confirm) {
      const response = await api.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      if (response.status === 200) {
        routes.reload();
      }
    }
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
          <Breadcrumb list="Usuários" />
          <article className={styles.usersTable}>
            <table>
              <thead>
                <tr>
                  <th> </th>
                  <th>#</th>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Data de cadastro</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {users?.map(user => (
                  <tr key={user.id}>
                    <td> </td>
                    <td>{user.id}</td>
                    <td>{user.nome}</td>
                    <td>{user.email}</td>
                    <td>
                      {new Date(user.createdAt).toLocaleDateString('pt-br')}
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() =>
                          routes.push(`/dashboard/users/edit/${user.id}`)
                        }
                      >
                        <RiToolsFill size={30} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <RiCloseCircleLine size={30} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
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
      url: '/dashboard/users',
      name: 'Usuários',
      icon: 'FiUser',
    },
  ];

  if (session?.user) {
    if (session?.user.acesso === 1) {
      try {
        const response = await api.get('users', {
          headers: { Authorization: `Bearer ${session.accessToken}` },
        });

        if (response.status === 200) {
          return {
            props: {
              serverStatus: { ok: true },
              isAdmin: true,
              navigationData,
              users: response.data,
            },
          };
        }
        throw new Error('Error on find users');
      } catch {
        return {
          props: {
            serverStatus: { ok: false },
          },
          redirect: {
            destination: '/api/auth/signout',
          },
        };
      }
    }

    navigationData.pop();
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
      props: {
        error: 'Você não está logado',
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
