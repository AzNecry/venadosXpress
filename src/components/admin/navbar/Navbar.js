import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { selectUsername } from '../../../redux/slice/authSlice';
import { useSelector } from 'react-redux';
import styles from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : '');
const Navbar = () => {
  const username = useSelector(selectUsername);

  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color="#fff" />
        <h4>{username}</h4>
      </div>
      <nav>
        <ul>
          {/*<li>
            <NavLink to="/admin/home" className={activeLink}>
              Home
            </NavLink>
          </li>
          */}
          <li>
            <NavLink to="/admin/all-products" className={activeLink}>
              <h5>Todos los productos</h5>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-product/ADD" className={activeLink}>
              <h5>Agregar producto</h5>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={activeLink}>
              <h5>Pedidos</h5>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
