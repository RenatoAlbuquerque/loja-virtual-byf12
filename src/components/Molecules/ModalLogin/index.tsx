import React, { useContext, useState } from 'react'
import { Box, Button, Dialog, Grid, TextField, Typography, InputAdornment, IconButton, InputLabel, FormControl, Input } from '@mui/material'
import { Close } from '@mui/icons-material';
import logoEshoes from '@/assets/logo-eshoes.png'
import Image from 'next/image';
import userStorage from 'local-storage/userStorage';
import { UserContext } from '@/context/userContext';
import { toast } from 'react-toastify';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface IModalLoginProps {
  open: boolean
  setOpen: (arg: boolean) => void
}

const ModalLogin = ({ open, setOpen }: IModalLoginProps) => {
  const { set: setUserStorage } = userStorage.userInfo()
  const { setUser }: any = useContext(UserContext);
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleClose = () => {
    setOpen(false)
  }

  const login = () => {
    if (email === 'admin@teste.com' && password === 'teste') {
      setUserStorage({ email: 'admin@teste.com', password: 'teste' })
      setUser({ email: 'admin@teste.com', password: 'teste' })
      handleClose()
    } else {
      return toast.error('Credenciais inválidas!', {
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

  return (
    <Dialog open={open} onClose={handleClose} >
      <Box p={4} maxWidth="400px" id="modal-login">
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
            <Image src={logoEshoes} width={120} height={100} alt="imagem de tenis preto e branco" id="logo-eshoes" />
            <Typography fontWeight={600} id="name-eshoes">
              E-Shoes
            </Typography>
          </Grid>

          <Grid item xs={12} mb={2}>
            <TextField id="textfield-email" onChange={(e) => setEmail(e.target.value)} variant="standard" size="small" label="Email" fullWidth color="secondary" />
          </Grid>

          <Grid item xs={12} mb={2}>
            <FormControl sx={{ width: '100%' }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                id="textfield-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} my={2} display="flex" justifyContent="center">
            <Button id="btn-login-account" variant="contained" color="secondary" fullWidth size="large" onClick={login}>
              Entrar na conta!
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )
}

export default ModalLogin