import React from 'react'
import { Box, Button, Dialog, Grid, TextField, Typography } from '@mui/material'
import { Close } from '@mui/icons-material';
import logoEshoes from '@/assets/logo-eshoes.png'
import Image from 'next/image';

interface IModalLoginProps {
  open: boolean
  setOpen: (arg: boolean) => void
}

export default function ModalLogin({ open, setOpen }: IModalLoginProps) {
  const handleClose = () => {
    setOpen(false)
  }


  return (
    <Dialog open={open} onClose={handleClose}>
      <Box p={4} width="400px">
        <Grid container>
          <Grid item xs={12} display="flex" mb={2} justifyContent="space-between" alignItems="center">
            <Typography variant='h5' fontWeight={500}>Acesse a sua conta!</Typography>
            <Button
              onClick={handleClose}
              variant="outlined"
              style={{ borderRadius: '50%', width: '30px', height: '30px', minWidth: '20px', minHeight: '20px' }}
              color="secondary"
            >
              <Close />
            </Button>
          </Grid>
          <Grid item display="flex" justifyContent="center" xs={12} my={1} flexDirection="column" alignItems="center">
            <Image src={logoEshoes} width={120} height={100} alt="imagem de tenis preto e branco" />
            <Typography fontWeight={600}>
              E-Shoes
            </Typography>
          </Grid>

          <Grid item xs={12} mb={2}>
            <TextField variant="standard" size="small" label="Email" fullWidth color="secondary" />
          </Grid>

          <Grid item xs={12} mb={2}>
            <TextField variant="standard" size="small" label="Senha" fullWidth color="secondary" />
          </Grid>

          <Grid item xs={12} my={2} display="flex" justifyContent="center">
            <Button variant="contained" color="secondary" fullWidth size="large">
              Entrar na conta!
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )
}
