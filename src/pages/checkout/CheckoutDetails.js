import React, { useState } from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';
import CheckoutSummary from '../../components/checkoutSummary/CheckoutSummary';
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
} from '../../redux/slice/checkoutSlice';
import styles from './CheckoutDetails.module.scss';

const initialAddressState = {
  name: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  postal_code: '',
  country: '',
  phone: '',
};

const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };
  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    dispatch(SAVE_BILLING_ADDRESS(billingAddress));
    navigate('/checkout');
  };

  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Detalles de pago</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={styles.card}>
              <h3>Direccion de envío</h3>
              <label>Nombre</label>
              <input
                type="text"
                placeholder="Nombre"
                name="name"
                calue={shippingAddress.name}
                onChange={(e) => handleShipping(e)}
                required
              />

              <label>Dirección 1</label>
              <input
                type="text"
                placeholder="Dirección 1"
                name="line1"
                calue={shippingAddress.line1}
                onChange={(e) => handleShipping(e)}
                required
              />

              <label>Dirección 2</label>
              <input
                type="text"
                placeholder="Dirección 2"
                name="line2"
                calue={shippingAddress.line2}
                onChange={(e) => handleShipping(e)}
              />

              <label>Ciudad</label>
              <input
                type="text"
                placeholder="Ciudad"
                name="city"
                calue={shippingAddress.city}
                onChange={(e) => handleShipping(e)}
              />
              <label>Estado</label>
              <input
                type="text"
                placeholder="Estado"
                name="state"
                calue={shippingAddress.state}
                onChange={(e) => handleShipping(e)}
              />

              <label>Codigo postal</label>
              <input
                type="text"
                placeholder="Codigo postal"
                name="postal_code"
                calue={shippingAddress.postal_code}
                onChange={(e) => handleShipping(e)}
              />

              <CountryDropdown
                valueType="short"
                className={styles.select}
                value={shippingAddress.country}
                onChange={(val) =>
                  handleShipping({
                    target: {
                      name: 'country',
                      value: val,
                    },
                  })
                }
              />

              <label>Telefono</label>
              <input
                type="text"
                placeholder="Telefono"
                name="phone"
                calue={shippingAddress.phone}
                onChange={(e) => handleShipping(e)}
              />
            </Card>
            {/*BILLING ADDRESS*/}
            <Card cardClass={styles.card}>
              <h3>Direccion de facturacion</h3>
              <label>Nombre</label>
              <input
                type="text"
                placeholder="Nombre"
                name="name"
                calue={billingAddress.name}
                onChange={(e) => handleBilling(e)}
                required
              />

              <label>Dirección 1</label>
              <input
                type="text"
                placeholder="Dirección 1"
                name="line1"
                calue={billingAddress.line1}
                onChange={(e) => handleBilling(e)}
                required
              />

              <label>Dirección 2</label>
              <input
                type="text"
                placeholder="Dirección 2"
                name="line2"
                calue={billingAddress.line2}
                onChange={(e) => handleBilling(e)}
              />

              <label>Ciudad</label>
              <input
                type="text"
                placeholder="Ciudad"
                name="city"
                calue={billingAddress.city}
                onChange={(e) => handleBilling(e)}
              />
              <label>Estado</label>
              <input
                type="text"
                placeholder="Estado"
                name="state"
                calue={billingAddress.state}
                onChange={(e) => handleBilling(e)}
              />

              <label>Codigo postal</label>
              <input
                type="text"
                placeholder="Codigo postal"
                name="postal_code"
                calue={billingAddress.postal_code}
                onChange={(e) => handleBilling(e)}
              />

              <CountryDropdown
                valueType="short"
                className={styles.select}
                value={billingAddress.country}
                onChange={(val) =>
                  handleBilling({
                    target: {
                      name: 'country',
                      value: val,
                    },
                  })
                }
              />

              <label>Telefono</label>
              <input
                type="text"
                placeholder="Telefono"
                name="phone"
                calue={billingAddress.phone}
                onChange={(e) => handleShipping(e)}
              />
              <button type="submit" className="--btn --btn-primary">
                Proceder al pago
              </button>
            </Card>
          </div>
          <div>
            <Card cardClass={styles.card}>
              <CheckoutSummary />
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutDetails;
