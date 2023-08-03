import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Grid, Accordion, AccordionDetails, AccordionSummary, Typography, useMediaQuery } from '@mui/material';
import { SaleInfo } from 'local-storage/types';
import { formatMoney } from '@/utils/formatMoney';

interface ISaleOrderProps {
  saleInfo: SaleInfo
}

const SaleOrder = ({ saleInfo }: ISaleOrderProps) => {
  const isSM = useMediaQuery('(max-width:680px)');
  const qtdSelectedTotal = saleInfo.summaryCart.reduce(
    (total: any, item) => total + item.quantidadeSelecionada,
    0
  );

  return (
    <Accordion style={{ paddingLeft: isSM ? '10px' : '20px', paddingRight: isSM ? '10px' : '20px' }} id="accordion-sale-order">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="btn-expand-accordion"
      >
        <Box mr={isSM ? 2 : 4}>
          <Typography variant='subtitle1' id="order-date-label">Data</Typography>
          <Typography id="order-date-value">{saleInfo.date}</Typography>
        </Box>
        <Box mr={isSM ? 2 : 4}>
          <Typography variant='subtitle1' id="order-qtd-itens-label">Quantidade de itens</Typography>
          <Typography id="order-qtd-itens-value">{qtdSelectedTotal}</Typography>
        </Box>
        <Box mr={isSM ? 2 : 4}>
          <Typography variant='subtitle1' id="order-total-purchase-label" >Valor Total da compra</Typography>
          <Typography id="order-total-purchase-value">{saleInfo.valorTotal}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container display="flex" alignItems="center" justifyContent="space-between" mb={1} >
          <Grid item xs={3}>
            <Typography color="info" variant="body2" id="product-label">Produto</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography color="info" variant="body2" id="product-name">Nome</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography color="info" variant="body2" id="product-price">Preço Unitário</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography color="info" variant="body2" id="product-qtd">Quantidade</Typography>
          </Grid>
        </Grid>
        {saleInfo.summaryCart.map((cartInfo) => (
          <Grid
            container
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            key={cartInfo.nome}
            mb={2}
            borderBottom="2px solid #000"
            borderTop="2px solid #000"
            borderLeft="2px solid #000"
          >
            <Grid item xs={3}>
              <Box style={{
                backgroundColor: 'gray',
                backgroundImage: cartInfo.imagemUrl ? ` url(${cartInfo.imagemUrl})` : '',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100px',
                height: '100px',
              }} />
            </Grid>
            <Grid item xs={4}>
              <Typography>{cartInfo.nome}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>{formatMoney(cartInfo.preco)}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>{cartInfo.quantidadeSelecionada}</Typography>
            </Grid>
          </Grid>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}

export default SaleOrder