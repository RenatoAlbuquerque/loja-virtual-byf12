import React, { useState } from 'react'
import Button from '@/components/Atoms/Button'
import { Box, BoxProps, Grid, Typography } from '@mui/material'
import { formatMoney } from '@/utils/formatMoney'
import { styled } from '@mui/material/styles';
import cartStorage from "local-storage/cartStorage";
import { ProductInfo } from "local-storage/types";
import { toast } from 'react-toastify';

interface ICardItemListProps {
  item: ProductInfo
  setCartList: (arg: ProductInfo[]) => void
}

const CardItemList = ({ item, setCartList }: ICardItemListProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { set: setLocalStorage, get: getLocalStorage } = cartStorage.cartInfo();

  const ImageProductItem = styled(Box)<BoxProps>(() => ({
    backgroundImage: `url(${item.imagemUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '250px',
    height: '250px',
    borderRadius: '4px',
    position: 'relative',
    display: "flex",
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
  }));

  const LayerProductItem = styled(Box)<BoxProps>(() => ({
    opacity: isHovered ? 1 : 0,
    visibility: isHovered ? 'visible' : 'hidden',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    background: '#ffffff83',
    border: '1px solid #0000007a',
    borderRadius: '4px'
  }));

  const addItemCart = async () => {
    const storageVal = await getLocalStorage();

    if (!storageVal || storageVal.length === 0) {
      setLocalStorage([item]);
      setCartList([item])
    } else {
      const productExists = storageVal.some((product: ProductInfo) => product.nome === item.nome);

      if (!productExists) {
        toast.success('Item Adicionado com sucesso!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        const updatedCart = [...storageVal, item];
        setLocalStorage(updatedCart);
        setCartList(updatedCart)
      } else {
        toast.error('O Item já se encontra no carrinho!', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  }

  return (
    <Grid item container xs={12} sm={6} md={4} lg={3} xl={2} width="100%" display="flex" alignItems="center" mb={3}>
      <Box width="100%" display="flex" flexDirection="column" alignItems="center">
        <Box >
          <ImageProductItem
            mb={1}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <LayerProductItem>
              <Box width="100%" display="flex" justifyContent="center" mb={2}>
                <Button id="add-item-cart" color="secondary" variant="outlined" onClick={addItemCart}>
                  Adicionar ao carrinho
                </Button>
              </Box>
              <Box width="100%" display="flex" justifyContent="flex-end" mr={2} mb={1}>
                <Typography variant="subtitle2" color="secondary">
                  {item.quantidade} Unidades Disponíveis
                </Typography>
              </Box>
            </LayerProductItem>
          </ImageProductItem>
          <Box width="100%" display="flex" justifyContent="flex-start" flexDirection="column">
            <Typography variant='body1'>{item.nome}</Typography>
            <Typography variant='body1'>{formatMoney(item.preco)}</Typography>
          </Box>
        </Box>
      </Box>
    </Grid>
  )
}

export default CardItemList
