import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  selectCartItems,
  selectCartTotalAmount,
} from '../../redux/slice/cartSlice';
import { selectEmail } from '../../redux/slice/authSlice';
import {
  selectBillingAddress,
  selectShippingAddress,
} from '../../redux/slice/checkoutSlice';
import { toast } from 'react-toastify';
import CheckoutForm from '../../components/checkoutForm/CheckoutForm';

const Checkout = () => {
  const [message, setMessage] = useState('');

  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const customerEmail = useSelector(selectEmail);

  const shippingAddress = useSelector(selectShippingAddress);
  const billingAddress = useSelector(selectBillingAddress);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

  const description = `eShop payment: email: ${customerEmail}, Amount: ${totalAmount}`;

  return (
    <>
      <section>
        <div className="container">{<h3>{message}</h3>}</div>
        <CheckoutForm />
      </section>
    </>
  );
};

export default Checkout;
