import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import { getSession, signIn, signOut } from 'next-auth/client';
import { useEffect, useState } from 'react';

interface DashboardProps {
  session: Session;
}

export default function Dashboard({ session }: DashboardProps): JSX.Element {
  const [user, setUser] = useState({} as Session);

  useEffect(() => {
    setUser(session);
  }, [session]);

  return (
    <>
      {!user ? (
        <button type="button" onClick={async () => signIn('github')}>
          Login with gh
        </button>
      ) : (
        <button type="button" onClick={async () => signOut()}>
          Logout
        </button>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: `${process.env.NEXT_PUBLIC_VERCEL_URL}`,
      props: {},
    };
  }
  return {
    props: { session },
  };
};
