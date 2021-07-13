import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';

export default function Home({ message }: { message: string }): JSX.Element {
  return (
    <div className={styles.container}>
      <Head>
        <title>MCE Onboarding</title>
        <meta name="description" content="Projeto MCE" />
        <link rel="image/png" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <h1>{message}</h1>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async req => {
  const session = await getSession(req);
  if (session?.user) {
    return {
      redirect: {
        destination: `/dashboard`,
      },
      props: { message: 'Redirecionando para o Dashboard' },
    };
  }
  return {
    redirect: {
      destination: `/login`,
    },
    props: { message: 'Redirecionando para a página de Login' },
  };
};
