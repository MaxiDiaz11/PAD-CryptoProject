import React from "react";
import { ShopLayout } from "@/components/layouts";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const Address = () => {
  return (
    <ShopLayout
      title="Dirección de envío"
      pageDescription={"Confirmar dirección de envio"}
    >
      <Typography variant="h1" component={"h1"}>
        Dirección
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField label="Nombre" variant="filled" fullWidth></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Apellido" variant="filled" fullWidth></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Dirección" variant="filled" fullWidth></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Dirección 2 (Opcional)"
            variant="filled"
            fullWidth
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Código postal"
            variant="filled"
            fullWidth
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Ciudad" variant="filled" fullWidth></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Select variant="filled" label="País" value={1}>
              <MenuItem value={1}>Argentina</MenuItem>
              <MenuItem value={2}>Brasil</MenuItem>
              <MenuItem value={3}>Uruguay</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Teléfono" variant="filled" fullWidth></TextField>
        </Grid>
      </Grid>

      <Box sx={{ mt: 5 }} display={"flex"} justifyContent={"center"}>
        <Button color="secondary" className="circular-btn" size="large">
          Revisar pedido
        </Button>
      </Box>
    </ShopLayout>
  );
};

export default Address;
