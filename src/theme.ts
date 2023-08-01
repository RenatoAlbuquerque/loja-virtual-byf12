import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#000',
    },
    info: {
      main: '#EFEFEF',
      contrastText: '#000'
    },
    text: {
      primary: '#3C3C3C'
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    body1: {
      fontSize: '16px'
    },
    body2: {
      fontSize: '14px'
    },
    subtitle1: {
      fontSize: '12px'
    },
    subtitle2: {
      fontSize: '10px'
    },
    button: {
      fontWeight: 500
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 1024,
      lg: 1440,
      xl: 1680,
    },
  },
});

export default theme;
