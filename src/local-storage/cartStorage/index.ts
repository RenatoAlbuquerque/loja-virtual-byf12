import {
  LocalStorageMethodReturn,
  ProductInfo,
  CartInfoKey,
  ProductsList
} from '../types'

function cartInfo(): LocalStorageMethodReturn<ProductInfo> {
  const key: CartInfoKey = 'cart-info'
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
  cartInfo: cartInfo
}
