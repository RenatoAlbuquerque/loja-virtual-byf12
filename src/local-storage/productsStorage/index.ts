import {
  LocalStorageMethodReturn,
  ProductInfo,
  ProductInfoKey,
  ProductsList
} from '../types'

function productInfo(): LocalStorageMethodReturn<ProductInfo> {
  const key: ProductInfoKey = 'product-info'
  const get = () => {
    const data = localStorage.getItem(key)
    if (data) {
      return JSON.parse(data) as ProductsList[]
    }
    return null
  }

  const set = (value: ProductsList[]) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  const remove = () => {
    localStorage.removeItem(key)
  }

  return {
    get,
    set,
    remove
  }
}

export default {
  productInfo: productInfo
}
