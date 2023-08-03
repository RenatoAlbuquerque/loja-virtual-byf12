import React, { Fragment, useContext, useState } from 'react'
import Navbar from '@/components/Molecules/Navbar'
import VendasTemplate from '@/components/features/vendas'
import { ProductInfo } from 'local-storage/types'
import { UserContext } from '@/context/userContext'
import Page401 from '../401'

const Vendas = () => {
  const [cartList, setCartList] = useState<ProductInfo[]>([])
  const { user }: any = useContext(UserContext);

  return (
    <>
      {user ? (
        <Fragment>
          <Navbar cartList={cartList} setCartList={setCartList} />
          <VendasTemplate />
        </Fragment>
      ) : (
        <Page401 />
      )}
    </>
  )
}

export default Vendas