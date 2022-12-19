import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import Notiflix from 'notiflix';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db, storage } from '../../../firebase/config';
import Loader from '../../loader/Loader';
import styles from './ViewProducts.module.scss';
import {
  selectProducts,
  STORE_PRODUCTS,
} from '../../../redux/slice/productSlice';
import useFetchCollection from '../../../customHooks/useFetchCollection';
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
} from '../../../redux/slice/filterSlice';
import Search from '../../search/Search';
import Pagination from '../../pagination/Pagination';

const ViewProducts = () => {
  const [search, setSearch] = useState('');
  const { data, isLoading } = useFetchCollection('products');
  const products = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredProducts);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(9);
  //const [products, setProducts] = useState([]);
  //const [isLoading, setIsLoading] = useState(false);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  // useEffect(() => {
  //   getProducts();
  // }, []);

  // const getProducts = () => {
  //   setIsLoading(true);

  //   try {
  //     const productsRef = collection(db, 'products');
  //     const q = query(productsRef, orderBy('createdAt', 'desc'));

  //     onSnapshot(q, (snapshot) => {
  //       const allProducts = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setProducts(allProducts);
  //       setIsLoading(false);
  //       dispatch(
  //         STORE_PRODUCTS({
  //           products: allProducts,
  //         })
  //       );
  //     });
  //   } catch (error) {
  //     setIsLoading(false);
  //     toast.error(error.message);
  //   }
  // };

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      'Eliminar producto',
      'Estas apunto de eliminar un producto!',
      'Eliminar',
      'Cancelar',
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {
        toast.info('Cancelado');
      },
      {
        width: '320px',
        borderRadius: '3px',
        titleColor: 'orangered',
        okButtonBackground: 'orangered',
        cssAnimationStyle: 'zoom',
      }
    );
  };

  const deleteProduct = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, 'products', id));

      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success('Producto eliminado');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>Todos los productos</h2>
        <div className={styles.search}>
          <p>
            <b>{filteredProducts.length}</b> Productos encontrados
          </p>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {filteredProducts.length === 0 ? (
          <p>No se encuentra producto</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Categoria</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => {
                const { id, name, price, imageURL, category } = product;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{ width: '100px' }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{`$${price}`}</td>
                    <td className={styles.icons}>
                      <Link to={`/admin/add-product/${id}`}>
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        size={18}
                        color="red"
                        onClick={() => confirmDelete(id, imageURL)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={productsPerPage}
          totalProducts={filteredProducts.length}
        />
      </div>
    </>
  );
};

export default ViewProducts;
