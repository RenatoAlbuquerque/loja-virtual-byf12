import React, { Fragment, useState } from 'react';
import Navbar from '@/components/Molecules/Navbar';
import CartTemplate from '@/components/features/cart';
import { ProductInfo } from 'local-storage/types';

const Cart = () => {
  const [cartList, setCartList] = useState<ProductInfo[]>([])

  return (
    <Fragment>
      <Navbar cartList={cartList} setCartList={setCartList} />
      <CartTemplate />
    </Fragment>
  );
}

export default Cart
