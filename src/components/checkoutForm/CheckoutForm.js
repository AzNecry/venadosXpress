import React, { useEffect, useState } from 'react';
import Card from '../card/Card';
import CheckoutSummary from '../checkoutSummary/CheckoutSummary';
import styles from './CheckoutForm.module.scss';
import spinnerImg from '../../assets/spinner.jpg';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { selectEmail, selectUserID } from '../../redux/slice/authSlice';
import {
  CLEAR_CART,
  selectCartItems,
  selectCartTotalAmount,
} from '../../redux/slice/cartSlice';
import { selectShippingAddress } from '../../redux/slice/checkoutSlice';
import { SAVE_SHIPPING_ADDRESS } from '../../redux/slice/checkoutSlice';

const CheckoutForm = () => {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tarjeta, setTarjeta] = useState('');
  const [tMes, setTMes] = useState('');
  const [tYear, setTYear] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userID = useSelector(selectUserID);
  const userEmail = useSelector(selectEmail);
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const shippingAddress = useSelector(selectShippingAddress);

  var stockActual = 0;

  const cantidadStock = (idStock, stock) => {
    const cantStock = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Cantidad: stock,
      }),
    };
    fetch(
      `https://us-central1-api-firebase-6b9e5.cloudfunctions.net/app/api/actStock/${idStock}`,
      cantStock
    )
      .then((response) => response.json())
      .then((data) => {})
      .catch((err) => {
        console.log(err.message);
      });
  };

  const infoCart = () => {
    let element = '';
    for (let i = 0; i < cartItems.length; i++) {
      element = `${element}${cartItems[i].name},`;
    }
    return element;
  };

  var numeroOrdern;
  var ordenExitosa = true;

  const catCart = () => {
    let itemAlcohol = {};
    let itemRevista = {};
    let itemElectronica = {};
    let itemMusica = {};
    let itemLibro = {};

    for (let i = 0; i < cartItems.length; i++) {
      switch (cartItems[i].category) {
        case 'Alcohol':
          // itemAlcohol[i] = {
          //   id: cartItems[i].id,
          //   nombre: cartItems[i].name,
          //   cantidad: cartItems[i].cartQuantity,
          //   precioUnitario: cartItems[i].price,
          //   montoTotal: cartItems[i].price * cartItems[i].cartQuantity,
          //   descripcion: cartItems[i].desc,
          // };
          stockActual = cartItems[i].brand;
          console.log(stockActual, cartItems[i].cartQuantity);
          if (stockActual < cartItems[i].cartQuantity) {
            toast.error(`No hay suficiente stock de ${cartItems[i].name}`);
            ordenExitosa = false;
          } else {
            const alcoholOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                NoOrd: numeroOrdern,
                MontoTotal: cartItems[i].price * cartItems[i].cartQuantity,
                NoArt: cartItems[i].id,
                CantidadProd: cartItems[i].cartQuantity,
                NoProd: cartItems[i].id,
                NomProd: cartItems[i].name,
                DescProd: cartItems[i].desc,
                NoSerieProd: cartItems[i].id,
                PrecioProd: cartItems[i].price,
              }),
            };
            var cant = cartItems[i].brand - cartItems[i].cartQuantity;
            cantidadStock(cartItems[i].id, cant);

            fetch(
              'https://lacheveriaapi-production.up.railway.app/ventas',
              alcoholOptions
            )
              .then((response) => response.json())
              .then((data) => {})
              .catch((err) => {
                console.log(err.message);
              });
          }

          break;
        case 'Revista':
          // itemRevista[i] = {
          //   id: cartItems[i].id,
          //   nombre: cartItems[i].name,
          //   cantidad: cartItems[i].cartQuantity,
          //   precioUnitario: cartItems[i].price,
          //   montoTotal: cartItems[i].price * cartItems[i].cartQuantity,
          //   descripcion: cartItems[i].desc,
          // };
          stockActual = cartItems[i].brand;
          console.log(stockActual, cartItems[i].cartQuantity);
          if (stockActual < cartItems[i].cartQuantity) {
            toast.error(`No hay suficiente stock de ${cartItems[i].name}`);
            ordenExitosa = false;
          } else {
            const revistaOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                id_ord: numeroOrdern,
                MontoTotal: cartItems[i].price * cartItems[i].cartQuantity,
                NoArt: cartItems[i].id,
                CantidadProd: cartItems[i].cartQuantity,
                NoProd: cartItems[i].id,
                NomProd: cartItems[i].name,
                DescProd: cartItems[i].desc,
                NoSerieProd: cartItems[i].id,
                PrecioProd: cartItems[i].price,
              }),
            };
            cant = cartItems[i].brand - cartItems[i].cartQuantity;
            cantidadStock(cartItems[i].id, cant);
            fetch(
              'https://lacheveriaapi-production.up.railway.app/ventas',
              revistaOptions
            )
              .then((response) => response.json())
              .then((data) => {})
              .catch((err) => {
                console.log(err.message);
              });
          }
          break;
        case 'Electronica':
          // itemElectronica[i] = {
          //   id: cartItems[i].id,
          //   nombre: cartItems[i].name,
          //   cantidad: cartItems[i].cartQuantity,
          //   precioUnitario: cartItems[i].price,
          //   montoTotal: cartItems[i].price * cartItems[i].cartQuantity,
          //   descripcion: cartItems[i].desc,
          // };
          stockActual = cartItems[i].brand;
          console.log(stockActual, cartItems[i].cartQuantity);
          if (stockActual < cartItems[i].cartQuantity) {
            toast.error(`No hay suficiente stock de ${cartItems[i].name}`);
            ordenExitosa = false;
          } else {
            const electronicaOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                idPedidos: numeroOrdern,
                idProducto: cartItems[i].id,
                nomProducto: cartItems[i].name,
                precioUnitario: cartItems[i].price,
                cantidad: cartItems[i].cartQuantity,
                monto: cartItems[i].price * cartItems[i].cartQuantity,
              }),
            };
            cant = cartItems[i].brand - cartItems[i].cartQuantity;
            cantidadStock(cartItems[i].id, cant);
            console.log(electronicaOptions.body);
            fetch(
              'https://nodejs-mysql-restapi-master-production.up.railway.app/api/ORDEN',
              electronicaOptions
            )
              .then((response) => response.json())
              .then((data) => {})
              .catch((err) => {
                console.log(err.message);
              });
          }
          break;
        case 'Musica':
          // itemMusica[i] = {
          //   id: cartItems[i].id,
          //   nombre: cartItems[i].name,
          //   cantidad: cartItems[i].cartQuantity,
          //   precioUnitario: cartItems[i].price,
          //   montoTotal: cartItems[i].price * cartItems[i].cartQuantity,
          //   descripcion: cartItems[i].desc,
          // };
          stockActual = cartItems[i].brand;
          console.log(stockActual, cartItems[i].cartQuantity);
          if (stockActual < cartItems[i].cartQuantity) {
            toast.error(`No hay suficiente stock de ${cartItems[i].name}`);
            ordenExitosa = false;
          } else {
            const musicaOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                NoOrd: numeroOrdern,
                MontoTotal: cartItems[i].price * cartItems[i].cartQuantity,
                NoArt: cartItems[i].id,
                CantidadProd: cartItems[i].cartQuantity,
                NoProd: cartItems[i].id,
                NomProd: cartItems[i].name,
                DescProd: cartItems[i].desc,
                NoSerieProd: cartItems[i].id,
                PrecioProd: cartItems[i].price,
              }),
            };
            cant = cartItems[i].brand - cartItems[i].cartQuantity;
            cantidadStock(cartItems[i].id, cant);
            fetch(
              'https://music-hub.herokuapp.com/api/ventaExterna/create',
              musicaOptions
            )
              .then((response) => response.json())
              .then((data) => {})
              .catch((err) => {
                console.log(err.message);
              });
          }
          break;
        case 'Libro':
          // itemLibro[i] = {
          //   id: cartItems[i].id,
          //   nombre: cartItems[i].name,
          //   cantidad: cartItems[i].cartQuantity,
          //   precioUnitario: cartItems[i].price,
          //   montoTotal: cartItems[i].price * cartItems[i].cartQuantity,
          //   descripcion: cartItems[i].desc,
          // };
          stockActual = cartItems[i].brand;
          console.log(stockActual, cartItems[i].cartQuantity);
          if (stockActual < cartItems[i].cartQuantity) {
            toast.error(`No hay suficiente stock de ${cartItems[i].name}`);
            ordenExitosa = false;
          } else {
            const libroOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                NoOrden: numeroOrdern,
                MontoTotal: cartItems[i].price * cartItems[i].cartQuantity,
                NoArt: cartItems[i].id,
                CantidadProd: cartItems[i].cartQuantity,
                NoProd: 2,
                NomProd: cartItems[i].name,
                DescProd: cartItems[i].desc,
                NoSerieProd: cartItems[i].id,
                PrecioProd: cartItems[i].price,
              }),
            };
            console.log(libroOptions.body);
            cant = cartItems[i].brand - cartItems[i].cartQuantity;
            cantidadStock(cartItems[i].id, cant);
            fetch(
              'https://homeeditorial-production.up.railway.app/api/pedidoVO',
              libroOptions
            )
              .then((response) => response.json())
              .then((data) => {})
              .catch((err) => {
                console.log(err.message);
              });
          }
          break;
        default:
          console.log('No entró ningun producto');
          break;
      }
      if (ordenExitosa === false) {
        break;
      }
    }
    // console.log(itemAlcohol);
    // console.log(itemRevista);
    // console.log(itemElectronica);
    // console.log(itemMusica);
    // console.log(itemLibro);
  };

  const saveOrder = async () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();

    const numeroRef = doc(db, 'contador', 'pedidos');
    var num = await getDoc(numeroRef);
    await updateDoc(numeroRef, {
      numero: Number(num.data().numero) + 1,
    });
    numeroOrdern = Number(num.data().numero);

    catCart();
    console.log(ordenExitosa);
    if (ordenExitosa === false) {
      toast.error('MOVIMIENTOS CANCELADOS!');
    } else {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      };
      fetch(
        `http://www.itbank.somee.com/api/Usuarios/Transferencia/${tarjeta},${tMes}%2F${tYear},${token},8420678435993377,${cartTotalAmount}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
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
            const bancoOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                id: data.response.iD_Movimiento,
                fecha: Timestamp.now().toDate(),
                monto: data.response.monto,
                noTarjeta_dst: data.response.notarjeta_Dst,
                noTarjeta_org: data.response.notarjeta_org,
              }),
            };
            fetch(
              'https://us-central1-api-firebase-6b9e5.cloudfunctions.net/app/api/banco',
              bancoOptions
            )
              .then((response) => response.json())
              .then((data) => {})
              .catch((err) => {
                //console.log(err.message);
              });

            toast.success('Pago exitoso');

            console.log(data.response);
            const registro = doc(
              db,
              'orders',
              Number(num.data().numero).toFixed(0)
            );
            setDoc(registro, orderConfig);

            dispatch(CLEAR_CART());

            const requestTrans = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                numeroVenta: Number(num.data().numero).toFixed(0),
                productos: infoCart(),
                nombreDestinatario: shippingAddress.name,
                direccionDestino: shippingAddress.line1,
                fechaEntrega: 20221220,
                idCliente: 3,
              }),
            };
            fetch(
              'https://transportes-ith-api-production.up.railway.app/api/solicitudes',
              requestTrans
            )
              .then((response) => response.json())
              .then((data) => {})
              .catch((err) => {
                console.log(err.message);
              });
            //console.log(requestTrans);

            toast.success('Orden guardada');
            navigate('/checkout-success');
          } catch (error) {
            toast.error(error.message);
          }
          // Handle data
        })
        .catch((err) => {
          toast.error('Pago rechazado');
          console.log(err.message);
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);
    saveOrder();
    setIsLoading(false);
  };
  function checkNumber(event) {
    var aCode = event.which ? event.which : event.keyCode;

    if (aCode > 31 && (aCode < 48 || aCode > 57)) return false;

    return true;
  }

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
              <h4>Datos de tarjeta</h4>
              <input
                type="text"
                placeholder="0000 0000 0000 0000"
                required
                value={tarjeta}
                maxLength="16"
                onChange={(e) => setTarjeta(e.target.value)}
              />
              <div className="--flex-between">
                <div className="--flex-between">
                  <input
                    className="--m"
                    type="text"
                    placeholder="MM"
                    required
                    value={tMes}
                    maxLength="2"
                    onChange={(e) => setTMes(e.target.value)}
                  />
                  /
                  <input
                    className="--m"
                    type="text"
                    placeholder="YY"
                    required
                    value={tYear}
                    maxLength="2"
                    onChange={(e) => setTYear(e.target.value)}
                  />
                </div>
                <input
                  className="--m"
                  type="text"
                  placeholder="cvv"
                  required
                  value={token}
                  maxLength="3"
                  onChange={(e) => setToken(e.target.value)}
                />
              </div>

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
