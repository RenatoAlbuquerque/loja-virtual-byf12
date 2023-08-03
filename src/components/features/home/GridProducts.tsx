import React, { useEffect, useState } from 'react'
import { mockProducts } from '@/constants/mockProducts'
import { Grid } from '@mui/material'
import productsStorage from 'local-storage/productsStorage'
import { ProductInfo } from 'local-storage/types'
import CardItemList from './CardItemList'

interface IGridProductsProps {
  setCartList: (arg: ProductInfo[]) => void
}

const GridProducts = ({ setCartList }: IGridProductsProps) => {
  const { set: setLocalStorage, get: getLocalStorage } = productsStorage.productInfo()
  const [productsList, setProductsList] = useState<ProductInfo[]>([])

  useEffect(() => {
    async function fetchDataFromLocalStorage() {
      const storageVal = await getLocalStorage()

      if (!storageVal) {
        setLocalStorage({ mockProducts })
        const newStorageVal = await getLocalStorage()
        setProductsList(newStorageVal.mockProducts)
      } else {
        setProductsList(storageVal.mockProducts)
      }
    }

    fetchDataFromLocalStorage()
  }, [])

  return (
    <Grid container px={1} width="100%" mt={2} id="grid-products">
      {productsList?.map((item: ProductInfo) => (
        <CardItemList item={item} key={item.nome} setCartList={setCartList} />
      ))}
    </Grid>
  )
}

export default GridProducts
