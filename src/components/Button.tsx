/* eslint-disable react/button-has-type */
import { ButtonHTMLAttributes } from 'react';
import styles from '../styles/Button.module.scss';

export function Button({
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
  return (
    <button {...props} className={styles.button}>
      {props.children}
    </button>
  );
}
