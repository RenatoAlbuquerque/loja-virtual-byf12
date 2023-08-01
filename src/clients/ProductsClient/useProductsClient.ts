import { useCallback } from 'react'

const useProductsClient = () => {
  const getProducts = async () => {

  }


  return useCallback(
    () => ({
      getProducts
    }),
    [getProducts]
  )
}

export default useProductsClient