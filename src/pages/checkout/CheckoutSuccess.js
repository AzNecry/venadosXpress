import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSuccess = () => {
  return (
    <section>
      <div className="container">
        <h2>Pago exitoso</h2>
        <p>Gracias por la compra</p>
        <br />

        <button className="--btn --btn-primary">
          <Link to="/order-history">Ir a compras</Link>
        </button>
      </div>
    </section>
  );
};

export default CheckoutSuccess;
