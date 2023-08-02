import {
  LocalStorageMethodReturn,
  SaleInfo,
  SaleInfoKey,
  ProductsList
} from '../types'

function saleInfo(): LocalStorageMethodReturn<SaleInfo> {
  const key: SaleInfoKey = 'sale-info'
  const get = () => {
    const data = localStorage.getItem(key)
    if (data) {
      return JSON.parse(data) as ProductsList[]
    }
    return null
  }

  const set = (value: SaleInfo) => {
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
  saleInfo: saleInfo
}
