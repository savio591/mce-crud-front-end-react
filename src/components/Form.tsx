import { FormHTMLAttributes, ReactNode } from 'react';
import styles from '../styles/Form.module.scss';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

export function Form({ children, ...props }: FormProps): JSX.Element {
  return (
    <form {...props} className={styles.form}>
      {children}
    </form>
  );
}
