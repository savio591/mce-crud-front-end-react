import { FormHTMLAttributes } from 'react';
import styles from '../styles/Form.module.scss';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  headerTitle: string;
  headerSubtitle?: string;
  dataFormRole?: string;
}

export function Form({
  children,
  headerTitle,
  headerSubtitle,
  dataFormRole,
  ...props
}: FormProps): JSX.Element {
  return (
    <div className={styles.container} role="form" data-form-role={dataFormRole}>
      <div className={styles.headers}>
        <h1>{headerTitle}</h1>
        {!!headerSubtitle && <h2>{headerSubtitle}</h2>}
      </div>
      <form {...props} className={styles.form}>
        {children}
      </form>
    </div>
  );
}
