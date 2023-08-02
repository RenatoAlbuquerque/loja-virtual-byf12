import React, { useContext, useEffect } from 'react'
import { Box } from '@mui/material';
import { styled } from '@mui/system'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { UserContext } from '@/context/userContext';
import logoEshoes from '../../../assets/logo-eshoes.png'
import Image from 'next/image';
import Badge from '@/components/Atoms/Badge';
import ModalLogin from '../ModalLogin';
import Button from '@/components/Atoms/Button';
import { ProductInfo } from 'local-storage/types';
import cartStorage from 'local-storage/cartStorage';
import NavAdmin from './navAdmin';

const NavbarComponent = styled('div')({
  display: 'flex',
  boxShadow: 'rgba(0,0,0, .15) 0px -2px 10px 0px',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '.5em 2em',
  fontFamily: 'roboto',
  height: '60px',
  background: '#F9FAFB',
  textDecoration: 'none'
});

const navLinksPublic = [
  {
    label: 'home',
    path: '/'
  }
]

const navLinksUser = [
  {
    label: 'home',
    path: '/'
  }
]

interface INavbarProps {
  cartList?: ProductInfo[]
  setCartList: (arg: ProductInfo[]) => void
}

const Navbar = ({ cartList, setCartList }: INavbarProps) => {
  const { openModallogin, setOpenModalLogin, user }: any = useContext(UserContext);
  const { get: getCartStorage } = cartStorage.cartInfo()
  const router = useRouter()

  useEffect(() => {
    const fetch = async () => {
      const cartStorageVal = await getCartStorage()
      setCartList(cartStorageVal)
    }
    fetch()
  }, [])


  const renderNavbarItens = () => {
    if (!user) {
      return navLinksPublic
    } else {
      return navLinksUser
    }
  }

  const handleModallogin = () => {
    if (openModallogin === false) {
      setOpenModalLogin(true)
    }
  }

  const goForHome = () => {
    if (router.pathname !== '/') {
      router.push('/')
    }
  }

  return (
    <NavbarComponent>
      <Box display="flex" alignItems="center" fontWeight="600" pl={2}>
        <Button id="btn-logo-eshoes" onClick={goForHome} variant='text'>
          <Image src={logoEshoes} width={50} height={40} alt="imagem de tenis preto e branco" />
        </Button>
      </Box>
      <Box display="flex" gap="20px">
        {renderNavbarItens().map((item) => (
          <Link href={item.path} key={item.path}>
            <Button
              id="btn-navbar"
              variant="text"
              color="secondary"
            >
              {item.label}
            </Button>
          </Link>
        ))}
        {!user && (
          <Button
            id="btn-open-modal-login"
            variant="text"
            onClick={handleModallogin}
            color="secondary"
          >
            Login
          </Button>
        )}
      </Box>
      <Box display="flex">
        {user && (
          <NavAdmin />
        )}
        <Box display="flex" alignItems="center" fontWeight="600" pr={2}>
          <Badge cartList={cartList} />
        </Box>
      </Box>
      <ModalLogin open={openModallogin} setOpen={setOpenModalLogin} />
    </NavbarComponent>
  )
}

export default Navbar