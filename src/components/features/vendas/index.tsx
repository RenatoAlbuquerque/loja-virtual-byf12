import React, { useEffect, useState } from 'react'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { SaleInfo } from 'local-storage/types'
import SaleOrder from './SaleOrder'
import saleStorage from 'local-storage/saleStorage'

const VendasTemplate = () => {
  const { get: getSaleStorage } = saleStorage.saleInfo()
  const [salesSummary, setSalesSummary] = useState([])
  const isSM = useMediaQuery('(max-width:680px)');

  useEffect(() => {
    const fetchSale = async () => {
      const salesValues = await getSaleStorage()
      setSalesSummary(salesValues)
    }
    fetchSale()
  }, [])

  return (
    <Box width="100%" mt={2} p={isSM ? 0 : 4}>
      <Box ml={isSM ? 2 : 0}>
        <Typography variant='h4' id="title-summary-sales">Relatório de Vendas</Typography>
      </Box>
      <Box
        my={2}
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        {salesSummary?.map((saleInfo: SaleInfo) => (
          <SaleOrder saleInfo={saleInfo} key={saleInfo.date} />
        ))}
      </Box>
    </Box>
  )
}

export default VendasTemplate