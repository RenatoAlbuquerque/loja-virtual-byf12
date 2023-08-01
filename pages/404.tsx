import React from 'react';
import { Grid, Typography } from '@mui/material';

export default function Page404() {
  return (
    <Grid container item alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="white" px={6} py={24} sm={32} lg={8}>
      <Grid item xs={12} textAlign="center">
        <Typography variant="h2" component="p" color="primary">
          404
        </Typography>
        <Typography variant="h5" component="p" color="primary">
          Página não existe
        </Typography>
      </Grid>
    </Grid>
  );
}
