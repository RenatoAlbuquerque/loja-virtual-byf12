export interface LocalStorageMethodReturn<V> {
  get(): any | null
  set(value: any): void
  remove(): void
}

export type UserInfoKey = 'user-info'

export interface UserInfo {
  email?: string
  token?: string
}

export type ProductInfoKey = 'product-info'

export interface ProductInfo {
  imagemUrl: string
  nome: string
  preco: number
  quantidade: number
}

export interface ProductsList {
  products: ProductInfo[]
  map: (arg: any) => void
}

export type CartInfoKey = 'cart-info'