import React from 'react';
import { Grid, Typography } from '@mui/material';
import Button from '@/components/Atoms/Button';
import Link from '@/components/Atoms/Link';

export default function Page401() {
  return (
    <Grid container item alignItems="center" justifyContent="center" minHeight="100vh" width="100%" bgcolor="white" xs={12}>
      <Grid item xs={12} textAlign="center">
        <Typography variant="h3" component="p" color="primary">
          401
        </Typography>
        <Typography variant="h2" component="h1" mt={2} fontWeight="bold">
          Usuário não autorizado
        </Typography>
        <Typography variant="body1" mt={6} color="text.secondary">
          Desculpe, você não tem autorização para acessar esta página.
        </Typography>
        <Grid container item mt={6} justifyContent="center" spacing={2}>
          <Grid item>
            <Link href="/">
              <Button id="btn-return-home" size='large'>
                Voltar a página principal
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Button id="btn-return-home" variant="text" size='large' color="secondary">
              Contatar o suporte <span aria-hidden="true">&rarr;</span>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid >
  );
}
