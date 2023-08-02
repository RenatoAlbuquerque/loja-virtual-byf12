import React, { useContext, useState } from 'react';
import { Avatar, Box, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material/';
import { AddBusiness, Receipt, Person, Logout } from '@mui/icons-material/';
import userStorage from 'local-storage/userStorage';
import { useRouter } from 'next/router';
import { UserContext } from '@/context/userContext';

const NavAdmin = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const { remove } = userStorage.userInfo()
  const router = useRouter()
  const { setUser }: any = useContext(UserContext);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const LogoutUser = () => {
    setUser()
    remove()
    handleClose()
    if (router.pathname !== '/') {
      router.push('/')
    }
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Painel do Administrador">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 30, height: 30 }}><Person /></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => router.push('/produtos')}>
          <ListItemIcon>
            <AddBusiness fontSize="medium" />
          </ListItemIcon>
          Produtos
        </MenuItem>
        <MenuItem onClick={() => router.push('/vendas')}>
          <ListItemIcon>
            <Receipt fontSize="medium" />
          </ListItemIcon>
          Relatório de vendas
        </MenuItem>
        <MenuItem onClick={LogoutUser}>
          <ListItemIcon>
            <Logout fontSize="medium" />
          </ListItemIcon>
          Sair da conta
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default NavAdmin