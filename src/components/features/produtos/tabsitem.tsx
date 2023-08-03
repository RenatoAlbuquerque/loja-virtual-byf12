import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import AdicionarProduto from './adicionarProduto';
import EditarProduto from './editarRemoverProduto';
import productsStorage from 'local-storage/productsStorage';
import { ProductInfo } from 'local-storage/types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabsPainel() {
  const [value, setValue] = React.useState(0);
  const { get: getProductsStorage } = productsStorage.productInfo()
  const [productsList, setProductsList] = useState([])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const fetchProducts = async () => {
    const products = await getProductsStorage()
    setProductsList(products.mockProducts)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <Box mt={10} ml={10} mr={10}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor='secondary'>
          <Tab label="Adicionar Produto" {...a11yProps(0)} />
          <Tab label="Editar ou Remover Produto" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <AdicionarProduto fetchProducts={fetchProducts} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {productsList?.map((item: ProductInfo) => (
          <EditarProduto key={item.nome} item={item} setProductsList={setProductsList} />
        ))}
      </CustomTabPanel>
    </Box>
  );
}