import { ButtonHTMLAttributes } from 'react';
import styles from '../styles/Button.module.scss';

export function Button({
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
  return (
    // eslint-disable-next-line react/button-has-type
    <button {...props} className={styles.button}>
      {props.children}
    </button>
  );
}
