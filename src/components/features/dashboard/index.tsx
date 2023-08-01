import React, { Fragment, useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import ItemCart from './itemCart'
import cartStorage from 'local-storage/cartStorage'
import { ProductInfo, ProductsList } from 'local-storage/types'
import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

const StyledBoxPaper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  width: "100%",
  borderTop: '10px solid #181818',
  borderBottom: '10px solid #181818',
}));

const DashboardTemplate = () => {
  const { get: getLocalStorage } = cartStorage.cartInfo();
  const [itensCart, setItensCart] = useState<ProductsList>()

  useEffect(() => {
    async function fetchDataCart() {
      const cartItens = await getLocalStorage()
      setItensCart(cartItens)
    }

    fetchDataCart()
  }, [])

  return (
    <StyledBoxPaper mt={5}>
      <Box
        id="div-style-black-left"
        display="flex"
        width="20%"
        style={{ backgroundColor: '#181818' }}
        flexDirection="column"
      />
      <Box
        display="flex"
        flexDirection="column"
        width="40%"
        style={{ backgroundColor: '#fff' }}
        id="div-cart-itens"
        p={3}
      >
        <>
          <Box mb={2}>
            <Typography variant="h4">Carrinho</Typography>
          </Box>
          {itensCart?.map((item: ProductInfo) => (
            <ItemCart item={item} key={item.nome} setItensCart={setItensCart} />
          ))}
        </>
      </Box>
      <Box
        id="div-resume-buy"
        display="flex"
        width="40%"
        style={{ backgroundColor: '#F3F4F6', color: '#181818' }}
        p={3}
      >
        <Typography variant="h4">Resumo das compras</Typography>
      </Box>
    </StyledBoxPaper >
  )
}

export default DashboardTemplate
