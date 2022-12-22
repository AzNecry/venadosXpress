import React, { useEffect } from 'react';
import { useState } from 'react';
import styles from './auth.module.scss';
import loginImg from '../../assets/login.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaDove, FaGoogle } from 'react-icons/fa';
import Card from '../../components/card/Card';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth, db } from '../../firebase/config';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import { useSelector } from 'react-redux';
import { selectPreviousURL } from '../../redux/slice/cartSlice';
import { selectUsuario } from '../../redux/slice/usuariosSlice';
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import useFetchDocument from '../../customHooks/useFetchDocument';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [membresia, setMembresia] = useState(null);
  const previousURL = useSelector(selectPreviousURL);
  const { id } = useParams();

  const { document } = useFetchDocument('usuarios', id);

  useEffect(() => {
    setMembresia(document);
  }, [document]);

  const redirectUser = () => {
    if (previousURL.includes('cart')) {
      return navigate('/cart');
    }
    navigate('/');
  };
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    //setIsLoading(true);

    // const refMiembro = collection(db, 'usuarios');
    // const quer = query(refMiembro, where('email', '==', email));
    //const docSnap()
    // refMiembro.get().then(quer);
    //if()
    //const docRef = doc(refMiembro, where('email', '==', email));
    // const docSnap = getDoc(docRef);

    // console.log(docSnap.data);
    // membresia = docSnap.data;
    const docRef = doc(db, 'usuarios', email);

    const docSnap = await getDoc(docRef);

    if (!docSnap.data().estado_membresia) {
      toast.error('No tiene membresia');
      setIsLoading(false);
      window.open(
        `http://187.189.158.166:12188/membresias?id=${
          docSnap.data().id_usuario
        }`
      );
      navigate('/login');
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setIsLoading(false);
          toast.success('Cuenta con membresia');
          toast.success('Inicio de sesión exitoso...');
          redirectUser();
        })
        .catch((error) => {
          toast.error(error.message);
          setIsLoading(false);
        });
    }
  };

  //LOGIN GOOGLE
  // const provider = new GoogleAuthProvider();
  // const signInWithGoogle = () => {
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       const user = result.user;
  //       toast.success('Login Successful...');
  //       redirectUser();
  //     })
  //     .catch((error) => {
  //       toast.error(error.message);
  //     });
  // };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width="300" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Iniciar sesion</h2>
            <form onSubmit={loginUser}>
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
              <button type="submit" className="--btn --btn-primary --btn-block">
                Iniciar sesion
              </button>
              <div className={styles.links}>
                <Link to="/reset">Olvide mi contraseña</Link>
              </div>
              {/* <p>-- or --</p> */}
            </form>

            {/* <button
              className="--btn --btn-danger --btn-block"
              onClick={signInWithGoogle}
            >
              <FaGoogle color="#fff" />
              Login with Google
            </button> */}

            <span className={styles.register}>
              <p>No tienes una cuenta? </p>

              <Link to="/register"> Registrarse</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
