import styles from './Breadcrumb.module.scss';

interface BreadcrumbProps {
  list: string | string[];
}

export function Breadcrumb({ list }: BreadcrumbProps): JSX.Element {
  return typeof list === 'object' ? (
    <div className={styles.breadcrumb}>
      <ul>
        {list.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  ) : (
    <div className={styles.breadcrumb}>
      <ul>
        <li>{list}</li>
      </ul>
    </div>
  );
}
