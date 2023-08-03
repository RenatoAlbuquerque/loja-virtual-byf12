import React, { useContext } from 'react'
import { Box, Typography, useMediaQuery } from '@mui/material'
import Button from '@/components/Atoms/Button'
import { formatMoney } from '@/utils/formatMoney'
import productsStorage from 'local-storage/productsStorage'
import { UserContext } from '@/context/userContext'
import { toast } from 'react-toastify';
import cartStorage from 'local-storage/cartStorage'
import { useRouter } from 'next/router'
import { formatDateHour } from '@/utils/formatMoment'
import saleStorage from 'local-storage/saleStorage'

interface ISummaryPurchaseProps {
  total: number
}

const SummaryPurchase = ({ total }: ISummaryPurchaseProps) => {
  const { get: getProductsStorage, set: setProductsStorage } = productsStorage.productInfo();
  const { get: getCartStorage, remove: removeCartStorage } = cartStorage.cartInfo();
  const { get: getSalesStorage, set: setSalesLocalStorage } = saleStorage.saleInfo();
  const isMD = useMediaQuery('(max-width:980px)');
  const isSM = useMediaQuery('(max-width:770px)');
  const { setOpenModalLogin, user }: any = useContext(UserContext);
  const router = useRouter();

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

    const todosItensValidos = cartItens.every((item: any) => item.quantidadeSelecionada <= item.quantidade);

    if (todosItensValidos) {
      const summaryCart = cartItens.map((item: any) => ({
        ...item,
        quantidade: item.quantidade - item.quantidadeSelecionada,
      }));

      const oldDbProducts = await getProductsStorage()

      const updateDb = oldDbProducts.mockProducts.map((oldDb: any) => {
        const cartFind = summaryCart.find((cart: any) => cart.nome === oldDb.nome);
        return cartFind ? cartFind : oldDb;
      });

      const removeQtdSelecionada = updateDb.map(({ quantidadeSelecionada, ...rest }: { quantidadeSelecionada: any; }) => rest);

      setProductsStorage({ mockProducts: removeQtdSelecionada })

      const sendSaleForDb = {
        summaryCart: cartItens,
        valorTotal: formatMoney(total),
        date: formatDateHour(new Date)
      }

      const oldSaleData = await getSalesStorage();
      if (!oldSaleData) {
        setSalesLocalStorage([sendSaleForDb])
      } else {
        const newSaleData = [...oldSaleData, sendSaleForDb];
        setSalesLocalStorage(newSaleData);
      }

      removeCartStorage()

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

      setTimeout(() => (
        router.push('/')
      ), 1000)

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
      })
    }
  };

  return (
    <Box
      id="div-resume-buy"
      display="flex"
      width={isMD ? '100%' : (isSM ? '50%' : '40%')}
      style={{ backgroundColor: '#F3F4F6', color: '#181818' }}
      p={3}
      flexDirection="column"
    >
      <Typography variant="h4">Resumo das compras</Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" my={3}>
        <Typography variant="h6">Total</Typography>
        <Typography variant="h4">{!isNaN(total) ? formatMoney(total) : 'R$ 0,00'}</Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <Button id="btn-finally-purchase" variant='contained' color="secondary" size="large" onClick={finallyPurchase} >
          Finalizar Compra
        </Button>
      </Box>
    </Box>
  )
}
export default SummaryPurchase
