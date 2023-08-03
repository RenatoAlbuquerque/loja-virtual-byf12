import React, { useState } from 'react'
import { Box, TextField, InputAdornment } from '@mui/material'
import Button from '@/components/Atoms/Button'
import { toast } from 'react-toastify';
import productsStorage from 'local-storage/productsStorage';

interface IAdicionarProdutoProps {
  fetchProducts: () => void
}

function AdicionarProduto({ fetchProducts }: IAdicionarProdutoProps) {
  const [urlImage, setUrlImage] = useState<string>('')
  const [nameProduct, setNameProduct] = useState<string>('')
  const [priceProduct, setPriceProduct] = useState<string>('')
  const [qtdProduct, setQtdProduct] = useState<string>('')
  const { get: getProductStorage, set: setProductStorage } = productsStorage.productInfo()

  const formatPrice = (price: any) => {
    const priceModify = price.replace(/,/g, ".")
    return priceModify
  }

  const addProduct = async () => {
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

    const newProduct = {
      imagemUrl: urlImage,
      nome: nameProduct,
      preco: Number(formatPrice(priceProduct)),
      quantidade: Number(qtdProduct)
    }

    const existingProducts = await getProductStorage() || [];

    const mockProducts = [...existingProducts.mockProducts, newProduct];
    setProductStorage({ mockProducts });

    toast.success('Produto Adicionado com Sucesso', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    setUrlImage('')
    setNameProduct('')
    setPriceProduct('')
    setQtdProduct('')
    fetchProducts()
  }

  const handleUrlImage = (ev: any) => {
    setUrlImage(ev.target.value)
  }

  return (
    <Box width="100%" display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap="30px">
      <Box
        id="preview-image-product"
        style={{
          backgroundColor: 'gray',
          backgroundImage: urlImage ? ` url(${urlImage})` : '',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '250px',
          height: '250px',
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
          id="url-image"
          value={urlImage}
          size="small"
          label="Url da Imagem"
          fullWidth
          color="secondary"
          onChange={handleUrlImage}
        />
        <TextField
          id="name-product"
          value={nameProduct}
          size="small"
          label="Nome do Produto"
          fullWidth color="secondary"
          onChange={(e) => setNameProduct(e.target.value)}
        />
        <TextField
          id="price-product"
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
          id="qtd-products"
          value={qtdProduct}
          size="small"
          label="Quantidade"
          fullWidth
          type="number"
          color="secondary"
          onChange={(e) => setQtdProduct(e.target.value)}
        />

        <Button id="btn-add-product" color="secondary" onClick={addProduct}>
          Adicionar Produto
        </Button>
      </Box>
    </Box>
  )
}

export default AdicionarProduto