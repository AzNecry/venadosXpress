import React from 'react';
import { HiUserRemove } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectEmail } from '../../redux/slice/authSlice';

const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === 'angelrynher@gmail.com') {
    return children;
  }
  return (
    <section style={{ height: '80vh' }}>
      <div className="container">
        <h2>Acceso denegado.</h2>
        <p>Esta pagina es solo para Admin.</p>
        <br />
        <Link to="/">
          <button className="--btn">&larr; Volver a Inicio</button>
        </Link>
      </div>
    </section>
  );
};

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === 'angelrynher@gmail.com') {
    return children;
  }
  return null;
};

export default AdminOnlyRoute;
