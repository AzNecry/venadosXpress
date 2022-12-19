import React, { useEffect } from 'react';
import AdminOnlyRoute from '../../components/adminOnlyRoute/AdminOnlyRoute';
import Product from '../../components/products/Product';
import Slider from '../../components/slider/Slider';

const Home = () => {
  const url = window.location.href;

  const scrollToProducts = () => {
    if (url.includes('#products')) {
      window.scrollTo({
        top: 500,
        behavior: 'smooth',
      });
      return;
    }
  };

  useEffect(() => {
    scrollToProducts();
  }, []);

  return (
    <div>
      <Slider />
      <Product />
    </div>
  );
};

export default Home;
