import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useFetchCollection from '../../../customHooks/useFetchCollection';

import {
  selectOrderHistory,
  STORE_ORDERS,
} from '../../../redux/slice/orderSlice';
import Loader from '../../loader/Loader';
import styles from './Orders.module.scss';

const Orders = () => {
  const { data, isLoading } = useFetchCollection('orders');
  const orders = useSelector(selectOrderHistory);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);

  const handleClick = (id) => {
    navigate(`/admin/order-details/${id}`);
  };

  return (
    <>
      <div className={styles.order}>
        <h2>Historial de pedidos</h2>
        <p>
          Abre un pedido para <b>cambiar el estado del pedido</b>
        </p>
        <br />
        <>
          {isLoading && <Loader />}
          <div className={styles.table}>
            {orders.length === 0 ? (
              <p>No hay pedidos</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Fecha</th>
                    <th>ID de pedido</th>
                    <th>Precio de pedido</th>
                    <th>Estado de pedido</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => {
                    const {
                      id,
                      orderDate,
                      orderTime,
                      orderAmount,
                      orderStatus,
                    } = order;
                    return (
                      <tr key={id} onClick={() => handleClick(id)}>
                        <td>{index + 1}</td>
                        <td>
                          {orderDate} at {orderTime}
                        </td>
                        <td>{id}</td>
                        <td>
                          {'$'}
                          {orderAmount}
                        </td>
                        <td>
                          <p
                            className={
                              orderStatus !== 'Entregado'
                                ? `${styles.pending}`
                                : `${styles.delivered}`
                            }
                          >
                            {orderStatus}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      </div>
    </>
  );
};

export default Orders;
