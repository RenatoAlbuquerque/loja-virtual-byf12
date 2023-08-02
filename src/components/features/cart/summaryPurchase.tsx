import React, { useContext, useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import Button from '@/components/Atoms/Button'
import { ProductInfo, ProductsList } from 'local-storage/types'
import { formatMoney } from '@/utils/formatMoney'
import productsStorage from 'local-storage/productsStorage'
import { UserContext } from '@/context/userContext'
import { toast } from 'react-toastify';
import cartStorage from 'local-storage/cartStorage'
import { useRouter } from 'next/router'
import { formatDateHour } from '@/utils/formatMoment'
import saleStorage from 'local-storage/saleStorage'

interface ISummaryPurchaseProps {
  summaryCart?: ProductInfo
  itensCart?: ProductsList
}

const SummaryPurchase = ({ summaryCart, itensCart }: ISummaryPurchaseProps) => {
  const { get: getLocalStorage, set: setLocalStorage } = productsStorage.productInfo();
  const { get: getCartStorage, remove: removeLocalStorage } = cartStorage.cartInfo();
  const { get: getSalesStorage, set: setSalesLocalStorage } = saleStorage.saleInfo();

  const { setOpenModalLogin, user }: any = useContext(UserContext);
  const [value, setValue] = useState(0)
  const router = useRouter();

  const totalPurchase = (summary: any) => {
    const totalSum = summary?.reduce((acc: any, item: any) => acc + item.preco * item.quantidadeSelecionada, 0);
    setValue(Number(totalSum))
    return totalSum
  }

  useEffect(() => {
    totalPurchase(summaryCart)
  }, [summaryCart])

  useEffect(() => {
    const fetchCart = async () => {
      const value = await getCartStorage()
      totalPurchase(value)
    }
    fetchCart()
  }, [itensCart])


  const finallyPurchase = async () => {
    const cartItens = await getCartStorage()

    if (cartItens.length === 0) {
      return toast.error('Adicione itens no carrinho!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    if (!user) {
      return setOpenModalLogin(true)
    }

    const products = await getLocalStorage();
    const productsCopy = JSON.parse(JSON.stringify(products))

    let quantidadeInvalida = false;

    summaryCart.forEach((products) => {
      const localStorageItem = productsCopy.mockProducts.find((item: ProductInfo) => item.nome === products.nome);
      if (localStorageItem) {
        if (products.quantidadeSelecionada > localStorageItem.quantidade) {
          quantidadeInvalida = true;
          return;
        }
        localStorageItem.quantidade -= products.quantidadeSelecionada;
      }
    });

    if (!quantidadeInvalida) {
      products.mockProducts = productsCopy.mockProducts;

      setLocalStorage(products);
      removeLocalStorage()

      toast.success('Obrigado pela Compra, volte Sempre!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      const sendSaleForDb = {
        summaryCart,
        valorTotal: formatMoney(value),
        date: formatDateHour(new Date)
      }

      const oldSaleData = await getSalesStorage();

      if (!oldSaleData) {
        setSalesLocalStorage([sendSaleForDb])
      } else {
        const newSaleData = [...oldSaleData, sendSaleForDb];
        setSalesLocalStorage(newSaleData);
      }

      setTimeout(() => (
        router.push('/')
      ), 2000)

    } else {
      return toast.error('A quantidade de itens disponiveis para compra é menor do que a quantidade escolhida!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <Box
      id="div-resume-buy"
      display="flex"
      width="40%"
      style={{ backgroundColor: '#F3F4F6', color: '#181818' }}
      p={3}
      flexDirection="column"
    >
      <Typography variant="h4">Resumo das compras</Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" my={3}>
        <Typography variant="h6">Total</Typography>
        <Typography variant="h4">{!isNaN(value) ? formatMoney(value) : 'R$ 0,00'}</Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <Button id="btn-finally-purchase" variant='contained' color="secondary" size="large" onClick={finallyPurchase}>
          Finalizar Compra
        </Button>
      </Box>
    </Box>
  )
}
export default SummaryPurchase
