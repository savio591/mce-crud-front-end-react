import { InputHTMLAttributes } from 'react';
import styles from '../styles/Input.module.scss';

export function Input({
  ...props
}: InputHTMLAttributes<HTMLInputElement>): JSX.Element {
  return <input {...props} className={styles.input} />;
}
