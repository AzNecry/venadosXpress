import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetchDocument from '../../customHooks/useFetchDocument';
import spinnerImg from '../../assets/spinner.jpg';
import styles from './OrderDetails.module.scss';

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();

  const { document } = useFetchDocument('orders', id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Detalles de pedido</h2>
        <div>
          <Link to="/order-history">
            &larr; Regresar al historial de pedidos
          </Link>
        </div>
        <br />
        {order === null ? (
          <img sr={spinnerImg} alt="Loading..." style={{ width: '50px' }} />
        ) : (
          <>
            <p>
              <b>ID de pedido</b> {order.id}
            </p>
            <p>
              <b>Precio de pedido</b> {order.orderAmount}
            </p>
            <p>
              <b>Estado de pedido</b> {order.orderStatus}
            </p>
            <br />
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  {/*<th>Action</th>*/}
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <tr key={index + 1}>
                      <td>
                        <b>{index + 1}</b>
                      </td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: '100px' }}
                        />
                      </td>
                      <td>{price}</td>
                      <td>{cartQuantity}</td>
                      <td>{price * cartQuantity.toFixed(2)}</td>
                      {/*
                      <td classNam={styles.icons}>
                        <Link to={`/review-product/${id}`}>
                          <button className="--btn -btn-primary">
                            Review Product
                          </button>
                        </Link>
                      </td>
                  */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </section>
  );
};

export default OrderDetails;
