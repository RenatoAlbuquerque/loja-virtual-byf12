import React, { Fragment, useState } from 'react'
import Navbar from '@/components/Molecules/Navbar'
import TabsPainel from '@/components/features/produtos/tabsitem'
import { ProductInfo } from 'local-storage/types'

const Produtos = () => {
  const [cartList, setCartList] = useState<ProductInfo[]>([])

  return (
    <Fragment>
      <Navbar cartList={cartList} setCartList={setCartList} />
      <TabsPainel />
    </Fragment>
  )
}

export default Produtos