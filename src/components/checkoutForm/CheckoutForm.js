import React, { useEffect, useState } from 'react';
import Card from '../card/Card';
import CheckoutSummary from '../checkoutSummary/CheckoutSummary';
import styles from './CheckoutForm.module.scss';
import spinnerImg from '../../assets/spinner.jpg';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { selectEmail, selectUserID } from '../../redux/slice/authSlice';
import {
  CLEAR_CART,
  selectCartItems,
  selectCartTotalAmount,
} from '../../redux/slice/cartSlice';
import { selectShippingAddress } from '../../redux/slice/checkoutSlice';

const CheckoutForm = () => {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userID = useSelector(selectUserID);
  const userEmail = useSelector(selectEmail);
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const shippingAddress = useSelector(selectShippingAddress);

  const saveOrder = () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const orderConfig = {
      userID,
      userEmail,
      orderDate: date,
      orderTime: time,
      orderAmount: cartTotalAmount,
      orderStatus: 'Orden puesta',
      cartItems,
      shippingAddress,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, 'orders'), orderConfig);
      dispatch(CLEAR_CART());
      toast.success('Orden guardada');
      navigate('/checkout-success');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    setIsLoading(true);

    toast.success('Pago exitoso');
    saveOrder();
    setIsLoading(false);
  };

  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Compra</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={styles.card}>
              <CheckoutSummary />
            </Card>
          </div>
          <div>
            <Card cardClass={`${styles.card} ${styles.pay}`}>
              <h3>Compra</h3>
              <button
                disabled={isLoading}
                id="submit"
                className={styles.button}
              >
                <span id="button-text">
                  {isLoading ? (
                    <img
                      src={spinnerImg}
                      alt="Loading..."
                      style={{ width: '20px' }}
                    />
                  ) : (
                    'Pagar ahora'
                  )}
                </span>
              </button>
              {message && <div id={styles['payment-message']}>{message}</div>}
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutForm;
