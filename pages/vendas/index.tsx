import React, { Fragment, useState } from 'react'
import Navbar from '@/components/Molecules/Navbar'
import VendasTemplate from '@/components/features/vendas'
import { ProductInfo } from 'local-storage/types'

const Vendas = () => {
  const [cartList, setCartList] = useState<ProductInfo[]>([])

  return (
    <Fragment>
      <Navbar cartList={cartList} setCartList={setCartList} />
      <VendasTemplate />
    </Fragment>
  )
}

export default Vendas