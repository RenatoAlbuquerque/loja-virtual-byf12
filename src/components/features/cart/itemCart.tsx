import React, { useState } from 'react'
import Button from '@/components/Atoms/Button'
import Box, { BoxProps } from '@mui/material/Box';
import { Typography, FormControl, MenuItem } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ProductInfo } from 'local-storage/types';
import { formatMoney } from '@/utils/formatMoney';
import cartStorage from 'local-storage/cartStorage';
import { styled } from '@mui/material/styles';

interface IItemCartProps {
  item: ProductInfo
  setItensCart: (arg: ProductInfo[]) => void
  itensCart: ProductInfo[] | []
  setTotal: (arg: number) => void
}

const ItemCart = ({ item, setItensCart, itensCart, setTotal }: IItemCartProps) => {
  const [qtdItem, setQtdItem] = useState(item.quantidadeSelecionada);
  const { set: setCartStorage, get: getCartStorage } = cartStorage.cartInfo();
  const ImageItemCart = styled(Box)<BoxProps>(() => ({
    backgroundImage: `url(${item.imagemUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '150px',
    height: '150px',
    borderRadius: '4px',
    display: "flex",
    border: '2px solid #000'
  }));

  const removeSingleItemFromCart = async () => {
    const updatedCart = itensCart.filter((itemCart: ProductInfo) => itemCart.nome !== item.nome);
    setItensCart(updatedCart);
    setCartStorage(updatedCart);

    const totalSum = updatedCart.reduce((acc: any, item: any) => acc + item.preco * item.quantidadeSelecionada, 0);
    setTotal(totalSum)
  }

  const handleChange = async (event: SelectChangeEvent) => {
    setQtdItem(event.target.value);

    const cartItens = await getCartStorage();

    const itemExist = cartItens.find((itemProduct: ProductInfo) => itemProduct.nome === item.nome)

    if (itemExist) {
      const itemIndex = cartItens.findIndex((itemProduct: ProductInfo) => itemProduct.nome === item.nome);

      const updatedCartItens = [...cartItens];
      updatedCartItens[itemIndex].quantidadeSelecionada = event.target.value;

      setItensCart(updatedCartItens);
      setCartStorage(updatedCartItens);

      const totalSum = cartItens.reduce((acc: any, item: any) => acc + item.preco * item.quantidadeSelecionada, 0);
      setTotal(totalSum)
    }
  };

  const totalPriceItem = () => {
    return item.preco * Number(qtdItem)
  }

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={3}
    >
      <Box
        display="flex"
        alignItems="center"
        height="100%"
        gap="30px"
      >
        <ImageItemCart id="img-item-cart" />
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="space-evenly"
        >
          <Typography variant="h6" id="cart-name-item">{item.nome}</Typography>
          <Typography variant="body1" id="cart-price-item">{formatMoney(item.preco)}</Typography>
          <Button
            id="btn-remove-item"
            color="secondary"
            variant="text"
            size='small'
            style={{ width: '30px' }}
            onClick={removeSingleItemFromCart}
          >
            Remover
          </Button>
        </Box>
      </Box>
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
        alignItems="flex-end">
        <FormControl>
          <Select
            id="select-qtd-itens"
            value={qtdItem}
            onChange={handleChange}
            size='small'
            color="secondary"
            style={{ maxWidth: '60px' }}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
        <Typography textAlign="end" variant="h6" id="total-item-price">
          {formatMoney(totalPriceItem())}
        </Typography>
      </Box>
    </Box>
  )
}

export default ItemCart
