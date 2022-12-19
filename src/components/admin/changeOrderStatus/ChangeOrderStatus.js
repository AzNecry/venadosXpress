import { collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../../../firebase/config';
import { CLEAR_CART } from '../../../redux/slice/cartSlice';
import Card from '../../card/Card';
import Loader from '../../loader/Loader';
import styles from './ChangeOrderStatus.module.scss';

const ChangeOrderStatus = ({ order, id }) => {
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const editOrder = (e, id) => {
    e.preventDefault();
    setIsLoading(true);
    const orderConfig = {
      userID: order.userID,
      userEmail: order.userEmail,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      editedAt: Timestamp.now().toDate(),
    };

    try {
      setDoc(doc(db, 'orders', id), orderConfig);
      setIsLoading(false);

      toast.success('Estado de pedido actualizado');

      navigate('/admin/orders');
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className={styles.status}>
        <Card cardClass={styles.card}>
          <h4>Actualizar estado</h4>
          <form onSubmit={(e) => editOrder(e, id)}>
            <span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="" disabled>
                  -- Elige estado --
                </option>
                <option value="Pedido realizado">Pedido realizado</option>
                <option value="Procesando...">Procesando...</option>
                <option value="Enviado">Enviado</option>
                <option value="Entregado">Entregado</option>
              </select>
            </span>
            <span>
              <button type="submit" className="--btn --btn-primary">
                Actualizar estado
              </button>
            </span>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ChangeOrderStatus;
