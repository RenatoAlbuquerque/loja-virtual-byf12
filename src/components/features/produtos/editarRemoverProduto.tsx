import React, { useState } from 'react'
import { Box, TextField, InputAdornment, useMediaQuery } from '@mui/material'
import Button from '@/components/Atoms/Button'
import { toast } from 'react-toastify';
import productsStorage from 'local-storage/productsStorage';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { ProductInfo } from 'local-storage/types';

interface IEditarProdutoProps {
  item: ProductInfo
  setProductsList: (arg: any) => void
}

function EditarProduto({ item, setProductsList }: IEditarProdutoProps) {
  const [urlImage, setUrlImage] = useState<string>(item.imagemUrl)
  const [nameProduct, setNameProduct] = useState<string>(item.nome)
  const [priceProduct, setPriceProduct] = useState<string | number>(item.preco)
  const [qtdProduct, setQtdProduct] = useState<string | number>(item.quantidade)
  const { get: getProductStorage, set: setProductStorage } = productsStorage.productInfo()
  const isSM = useMediaQuery('(max-width:680px)');
  const formatPrice = (price: any) => {
    if (typeof price !== 'string' || !price.includes(',')) {
      return price;
    }

    const priceModify = price.replace(/,/g, '.');
    return priceModify;
  };

  const editProduct = async () => {
    if (!urlImage || !nameProduct || !priceProduct || !qtdProduct) {
      return toast.error('Verifique os campos, todos são obrigatórios', {
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

    const editProduct = {
      imagemUrl: urlImage,
      nome: nameProduct,
      preco: Number(formatPrice(priceProduct)),
      quantidade: Number(qtdProduct)
    }

    const existingProducts = await getProductStorage();

    let indexToEdit = existingProducts.mockProducts.findIndex((item: ProductInfo) => item.nome == editProduct.nome)

    if (indexToEdit === -1) {
      indexToEdit = existingProducts.mockProducts.findIndex((item: ProductInfo) => item.imagemUrl == editProduct.imagemUrl)
    }

    if (indexToEdit !== -1) {
      existingProducts.mockProducts[indexToEdit] = editProduct;

      setProductStorage(existingProducts)
      toast.success('Produto Editado com Sucesso', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error('Produto não encontrado na lista', {
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

  }

  const removeProduct = async () => {
    const prodRemove = {
      imagemUrl: urlImage,
      nome: nameProduct,
      preco: Number(formatPrice(priceProduct)),
      quantidade: Number(qtdProduct)
    }

    const existingProducts = await getProductStorage();

    const updatedProducts = existingProducts.mockProducts.filter(
      (product: ProductInfo) => product.nome !== prodRemove.nome
    );

    setProductStorage({ mockProducts: updatedProducts })

    toast.success('Produto Removido com Sucesso', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });


    setProductsList(updatedProducts)
  }

  const handleUrlImage = (ev: any) => {
    setUrlImage(ev.target.value)
  }

  return (
    <Box
      mb={2}
      width="100%"
      display="flex"
      flexDirection={isSM ? 'column' : 'row'}
      justifyContent="space-around"
      alignItems="center"
      gap="30px"
      border="2px solid black"
      borderRadius="5px"
      p={1}
    >
      <Box style={{
        backgroundColor: 'gray',
        backgroundImage: urlImage ? ` url(${urlImage})` : '',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: isSM ? '220px' : '120px',
        height: isSM ? '220px' : '120px',
        borderRadius: '4px',
      }} />

      <Box
        maxWidth="500px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="20px"
      >
        <TextField
          value={urlImage}
          size="small"
          label="Url da Imagem"
          fullWidth
          color="secondary"
          onChange={handleUrlImage}
        />
        <TextField
          value={nameProduct}
          size="small"
          label="Nome do Produto"
          fullWidth
          color="secondary"
          onChange={(e) => setNameProduct(e.target.value)}
          id="name-edit-product"
        />
      </Box>
      <Box
        maxWidth="500px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="20px"
      >
        <TextField
          value={priceProduct}
          size="small"
          label="Preço"
          color="secondary"
          onChange={(e) => setPriceProduct(e.target.value)}
          type="number"
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">R$</InputAdornment>,
          }}
        />
        <TextField
          value={qtdProduct}
          size="small"
          label="Quantidade"
          fullWidth
          type="number"
          color="secondary"
          onChange={(e) => setQtdProduct(e.target.value)}
        />
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="flex-end" alignItems="center" gap="30px">
        <Button id="btn-edit-product" color="secondary" fullWidth onClick={editProduct} startIcon={<EditOutlinedIcon />}>
          Editar Produto
        </Button>
        <Button id="btn-remove-product" color="error" fullWidth onClick={removeProduct} endIcon={<DeleteForeverOutlinedIcon />}>
          Remover Produto
        </Button>
      </Box>
    </Box>
  )
}

export default EditarProduto