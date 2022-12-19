import React from 'react';
import styles from './auth.module.scss';
import registerImg from '../../assets/register.png';
import Card from '../../components/card/Card';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../../firebase/config';
import Loader from '../../components/loader/Loader';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  Timestamp,
  where,
} from 'firebase/firestore';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [apellido2, setApellido2] = useState('');
  const [membresia, setMembresia] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const initialState = {
    nombre: '',
    apellido: '',
    contrasena: '',
    estado_membresia: '',
    fecha_corte: '',
  };

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      toast.error('Las contraseñas no coinciden');
    }
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLoading(false);
        const registro = doc(db, 'usuarios', email);

        setDoc(registro, {
          nombre: nombre,
          apellido1: apellido,
          apellido2: apellido2,
          email: email,
          contrasena: password,
          estado_membresia: membresia,
          id_usuario: '',
          fecha_corte: Timestamp.now().toDate(),
        })
          // setDoc((db, 'usuarios', email), {
          //   nombre: nombre,
          //   apellido1: apellido,
          //   apellido2: apellido2,
          //   email: email,
          //   contrasena: password,
          //   estado_membresia: membresia,
          //   id_usuario: '',
          //   fecha_corte: Timestamp.now().toDate(),
          // })
          .then(() => {
            signOut(auth);
            toast.success('Registro exitoso...');
            //window.open('https://google.com');
            navigate('/login');
          })
          .catch((error) => {
            signOut(auth);
            toast.error(error.message);
          });
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
        <Card>
          <div className={styles.form}>
            <h2>Registrarse</h2>

            <form onSubmit={registerUser}>
              <input
                type="text"
                placeholder="Nombre"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <input
                type="text"
                placeholder="Apellido Paterno"
                required
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
              <input
                type="text"
                placeholder="Apellido Materno"
                required
                value={apellido2}
                onChange={(e) => setApellido2(e.target.value)}
              />
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <input
                type="password"
                placeholder="Confirmar contraseña"
                required
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Registrarse
              </button>
            </form>
            <span className={styles.register}>
              <p>Ya tienes cuenta?</p>
              <Link to="/login">Iniciar sesion</Link>
            </span>
          </div>
        </Card>
        <div className={styles.img}>
          <img src={registerImg} alt="Register" width="300" />
        </div>
      </section>
    </>
  );
};

export default Register;
