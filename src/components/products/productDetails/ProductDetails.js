import { doc, getDoc } from 'firebase/firestore';
import React, { Component, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../../../firebase/config';
import styles from './ProductDetails.module.scss';
import spinnerImg from '../../../assets/spinner.jpg';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from '../../../redux/slice/cartSlice';
import useFetchDocument from '../../../customHooks/useFetchDocument';

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cart = cartItems.find((cart) => cart.id === id);
  const { document } = useFetchDocument('products', id);

  const isCartAdded = cartItems.findIndex((cart) => {
    return cart.id == id;
  });

  // const getProduct = async () => {
  //   const docRef = doc(db, 'products', id);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     const obj = {
  //       id: id,
  //       ...docSnap.data(),
  //     };
  //     setProduct(obj);
  //   } else {
  //     toast.error('Product not found');
  //   }
  // };

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };
  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Detalles de producto</h2>
        <div>
          <Link to="/#products">&larr; Regresar a la tienda</Link>
        </div>
        {product === null ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: '50px' }} />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>{`$${product.price}`}</p>
                <p>
                  <b>Clave</b> {product.id}
                </p>
                <p>
                  <b>Marca</b> {product.brand}
                </p>
                <p>
                  <b>Descripcion</b>
                  <br />
                  <textarea cols="50" rows="10">
                    {product.desc}
                  </textarea>
                </p>
                <div className={styles.count}>
                  {isCartAdded < 0 ? null : (
                    <>
                      <button
                        className="--btn"
                        onClick={() => decreaseCart(product)}
                      >
                        -
                      </button>
                      <p>
                        <b>{cart.cartQuantity}</b>
                      </p>
                      <button
                        className="--btn"
                        onClick={() => addToCart(product)}
                      >
                        +
                      </button>
                    </>
                  )}
                </div>
                <button
                  className="--btn --btn-danger"
                  onClick={() => addToCart(product)}
                >
                  Agregar a carrito
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
