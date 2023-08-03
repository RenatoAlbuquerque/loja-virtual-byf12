import React, { useEffect, useState } from 'react'
import { Typography, useMediaQuery } from '@mui/material'
import ItemCart from './itemCart'
import cartStorage from 'local-storage/cartStorage'
import { ProductInfo } from 'local-storage/types'
import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import SummaryPurchase from './summaryPurchase'


const CartTemplate = () => {
  const { get: getCartStorage, set: setCartStorage } = cartStorage.cartInfo();
  const [itensCart, setItensCart] = useState<ProductInfo[]>()
  const [total, setTotal] = useState(0)
  const isMD = useMediaQuery('(max-width:980px)');
  const isSM = useMediaQuery('(max-width:770px)');

  const StyledBoxPaper = styled(Box)<BoxProps>(() => ({
    display: 'flex',
    flexDirection: isSM ? 'column' : 'row',
    width: "100%",
    borderTop: '10px solid #181818',
    borderBottom: '10px solid #181818',
  }));

  useEffect(() => {
    const fetchDataCart = async () => {
      const cartItens = await getCartStorage();

      const cartItensWithQuantidadeSelecionada = cartItens.map((item: ProductInfo) => ({
        ...item,
        quantidadeSelecionada: item.quantidadeSelecionada ? item.quantidadeSelecionada : 1,
      }));

      setItensCart(cartItensWithQuantidadeSelecionada)
      setCartStorage(cartItensWithQuantidadeSelecionada)

      const totalSum = cartItensWithQuantidadeSelecionada.reduce((acc: any, item: any) => acc + item.preco * item.quantidadeSelecionada, 0);
      setTotal(totalSum)
    };

    fetchDataCart();
  }, []);


  return (
    <StyledBoxPaper mt={5}>
      <Box
        id="div-style-black-left"
        display={isMD ? 'none' : 'flex'}
        width="20%"
        style={{ backgroundColor: '#181818' }}
        flexDirection="column"
      />
      <Box
        display="flex"
        flexDirection="column"
        width={isMD ? '100%' : (isSM ? '50%' : '40%')}
        style={{ backgroundColor: '#fff' }}
        id="div-cart-itens"
        p={3}
      >
        <>
          <Box mb={2}>
            <Typography variant="h4">Carrinho </Typography>
          </Box>
          {itensCart?.map((item: ProductInfo) => (
            <ItemCart item={item} key={item.nome} itensCart={itensCart} setItensCart={setItensCart} setTotal={setTotal} />
          ))}
        </>
      </Box>
      <SummaryPurchase total={total} />
    </StyledBoxPaper >
  )
}

export default CartTemplate
