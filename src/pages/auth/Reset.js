import React from 'react';
import styles from './auth.module.scss';
import Card from '../../components/card/Card';
import { Link } from 'react-router-dom';
import resetImg from '../../assets/forgot.png';
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { toast } from 'react-toastify';

import Loader from '../../components/loader/Loader';

const Reset = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success(
          'Revisa tu correo para el enlace de restablecer contraseña'
        );
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={resetImg} alt="Reset" width="300" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Restablecer contraseña</h2>

            <form onSubmit={resetPassword}>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button type="submit" className="--btn --btn-primary --btn-block">
                Restablecer contraseña
              </button>
              <div className={styles.links}>
                <p>
                  <Link to="/login">- Iniciar sesion</Link>
                </p>
                <p>
                  <Link to="/register">- Registrarse</Link>
                </p>
              </div>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Reset;
