import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';

import { iconParser } from '../../utils/iconParser';

import styles from './SideBar.module.scss';
import buttonStyle from '../../styles/Button.module.scss';

interface SidebarProps {
  navigationData: {
    url: string;
    name: string;
    icon: string;
  }[];
}

export function Sidebar({ navigationData }: SidebarProps): JSX.Element {
  const router = useRouter();

  return (
    <main className={styles.container}>
      <div className={styles.containerSide}>
        <h1 className={styles.title}>Mind Education</h1>
        <nav className={styles.nav}>
          <h2>Navegação</h2>
          <ul className={styles.menu}>
            {navigationData.map(item => {
              return (
                <li key={item.name}>
                  <Link href={item.url}>
                    <a>
                      <button
                        type="button"
                        className={buttonStyle.sidebar}
                        data-is-selected={item.url.endsWith(router.pathname)}
                      >
                        {iconParser(item.icon)}
                        {item.name}
                      </button>
                    </a>
                  </Link>
                </li>
              );
            })}
            {/* <li>
              <Link href="/users">
                <a>
                  <button
                    type="button"
                    className={buttonStyle.sidebar}
                    data-is-selected={active}
                  >
                    <FaUser />
                    Usuários
                  </button>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/users">
                <a>
                  <button type="button" className={buttonStyle.sidebar}>
                    <FaUser />
                    Usuários
                  </button>
                </a>
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </main>
  );
}
