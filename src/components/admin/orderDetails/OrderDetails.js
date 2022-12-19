import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetchDocument from '../../../customHooks/useFetchDocument';
import styles from './OrderDetails.module.scss';
import spinnerImg from '../../../assets/spinner.jpg';
import ChangeOrderStatus from '../changeOrderStatus/ChangeOrderStatus';

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();

  const { document } = useFetchDocument('orders', id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  return (
    <>
      <div className={styles.table}>
        <h2>Pedido</h2>
        <div>
          <Link to="/admin/orders">&larr; Regresar a los pedidos</Link>
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
              <b>Precio de precio</b> {order.orderAmount}
            </p>
            <p>
              <b>Estado de orden</b> {order.orderStatus}
            </p>
            <p>
              <b>Dirección de envío</b>
              <br />
              Dirección: {order.shippingAddress.line1},{' '}
              {order.shippingAddress.line2}, {order.shippingAddress.city}
              <br />
              Estado: {order.shippingAddress.state}
              <br />
              País: {order.shippingAddress.country}
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
        <ChangeOrderStatus order={order} id={id} />
      </div>
    </>
  );
};

export default OrderDetails;
