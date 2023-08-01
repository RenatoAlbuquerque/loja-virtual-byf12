import React from 'react';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter } from 'next/router';
import { ProductInfo } from 'local-storage/types';

interface IBadgeCustomizeProps {
  cartList?: ProductInfo[]
}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `1px solid #000`,
    padding: '0 4px',
  },
}));

const BadgeCustomize = ({ cartList }: IBadgeCustomizeProps) => {
  const router = useRouter();

  const cartPage = () => {
    router.push('/dashboard')
  }

  return (
    <IconButton aria-label="cart" onClick={cartPage}>
      <StyledBadge badgeContent={cartList ? cartList?.length : null} color="secondary">
        <ShoppingCartIcon fontSize='large' />
      </StyledBadge>
    </IconButton>
  );
}

export default BadgeCustomize
