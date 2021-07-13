import { signOut } from 'next-auth/client';
// import { RiSearchLine } from 'react-icons/ri';

import styles from './Header.module.scss';

export function Header(): JSX.Element {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <div role="none">
          {/* <button type="button" aria-label="Pesquisar">
            <RiSearchLine size={20} />
          </button>
          <input
            name="buscar"
            placeholder="Pesquisar..."
            aria-label="Pesquisar"
          /> */}
        </div>
        <button
          type="submit"
          data-role="signout"
          onClick={() => {
            signOut();
          }}
        >
          Logout
        </button>
      </div>
    </main>
  );
}
