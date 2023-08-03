import React, { Fragment, useContext, useState } from 'react'
import Navbar from '@/components/Molecules/Navbar'
import TabsPainel from '@/components/features/produtos/tabsitem'
import { ProductInfo } from 'local-storage/types'
import { UserContext } from '@/context/userContext'
import Page401 from '../401'

const Produtos = () => {
  const [cartList, setCartList] = useState<ProductInfo[]>([])
  const { user }: any = useContext(UserContext);

  return (
    <>
      {user ? (
        <Fragment>
          <Navbar cartList={cartList} setCartList={setCartList} />
          <TabsPainel />
        </Fragment>
      ) : (
        <Page401 />
      )}
    </>
  )
}

export default Produtos