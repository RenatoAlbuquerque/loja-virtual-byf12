import React, { Fragment, useState } from 'react';
import Navbar from '@/components/Molecules/Navbar';
import GridProducts from '@/components/features/home/GridProducts';
import { DemoCarousel } from '@/components/features/home/Carousel';
import { ProductInfo } from 'local-storage/types';

const Home = () => {
  const [cartList, setCartList] = useState<ProductInfo[]>([])

  return (
    <Fragment>
      <Navbar cartList={cartList} />
      <DemoCarousel />
      <GridProducts setCartList={setCartList} />
    </Fragment>
  );
}

export default Home
