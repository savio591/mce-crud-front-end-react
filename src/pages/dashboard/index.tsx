/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import { getSession, useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';

import Head from 'next/head';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/SideBar';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Button } from '../../components/Button';

import styles from '../../styles/Dashboard.module.scss';

interface DashboardProps {
  serverStatus: { ok: boolean };
  navigationData: {
    url: string;
    name: string;
    icon: string;
  }[];
}

interface SessionProps extends Session {
  user: {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    acesso: number;
    nivel: number;
  };
}

export default function Dashboard({
  serverStatus,
  navigationData,
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

  return (
    <>
      <Head>
        <title>Dashboard | MCE Onboarding</title>
      </Head>
      <main className={styles.container}>
        <Sidebar navigationData={navigationData} />
        <div className={styles.content}>
          <Header />
          <Breadcrumb list="Dashboard" />
          <section className={styles.welcome}>
            <div>
              <h1>
                Bem vindo, <br />
                <span>{session?.user.nome}</span>
              </h1>
              <Button onClick={() => routes.push(`/dashboard/users/edit`)}>
                Editar perfil
              </Button>
            </div>
            <img
              src="/images/welcome-figure.svg"
              alt="Figura de um desenvolvedor criando um wireframe"
            />
          </section>
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
      return {
        props: {
          serverStatus: { ok: true },
          isAdmin: true,
          navigationData,
        },
      };
    }
    navigationData.pop();
    return {
      props: {
        serverStatus: { ok: true },
        isAdmin: false,
        navigationData,
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
