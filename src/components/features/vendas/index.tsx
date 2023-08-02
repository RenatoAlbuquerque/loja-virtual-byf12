import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { SaleInfo } from 'local-storage/types'
import SaleOrder from './SaleOrder'
import saleStorage from 'local-storage/saleStorage'

const VendasTemplate = () => {
  const { get: getSaleStorage } = saleStorage.saleInfo()
  const [salesSummary, setSalesSummary] = useState([])

  useEffect(() => {
    const fetchSale = async () => {
      const salesValues = await getSaleStorage()
      setSalesSummary(salesValues)
    }
    fetchSale()
  }, [])

  return (
    <Box width="100%" mt={2} p={4}>
      <Box>
        <Typography variant='h4'>Relatório de Vendas</Typography>
      </Box>
      <Box
        my={2}
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        {salesSummary.length > 0 && salesSummary.map((saleInfo: SaleInfo) => (
          <SaleOrder saleInfo={saleInfo} key={saleInfo.date} />
        ))}
      </Box>
    </Box>
  )
}

export default VendasTemplate