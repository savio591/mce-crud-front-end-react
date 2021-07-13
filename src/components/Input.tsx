import { InputHTMLAttributes, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import styles from '../styles/Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  eyeButtonHidden?: boolean;
}

export function Input({ ...props }: InputProps): JSX.Element {
  const [passwordShown, setPasswordShown] = useState(false);
  const isPasswordButton = props.type === 'password';

  const togglePassword = (): void => {
    setPasswordShown(!passwordShown);
  };

  if (isPasswordButton) {
    return (
      <div className={styles.container}>
        <input
          {...props}
          type={passwordShown ? 'text' : 'password'}
          className={styles.input}
        />
        {isPasswordButton && (
          <button
            type="button"
            className={styles.button}
            onClick={togglePassword}
            role="switch"
            aria-checked={passwordShown}
            aria-hidden
          >
            {passwordShown ? <FiEye /> : <FiEyeOff />}
          </button>
        )}
      </div>
    );
  }

  return <input {...props} className={styles.input} />;
}
