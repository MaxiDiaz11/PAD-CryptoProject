import React from "react";
import { CartList, OrderSummary } from "@/components/cart";
import { ShopLayout } from "@/components/layouts";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";

const OrderPage = () => (
  <ShopLayout
    title={"Resumen de orden 23131"}
    pageDescription={"Resumen de orden"}
  >
    <Typography variant="h1" component={"h1"}>
      Orden: 23131
    </Typography>

    {/* <Chip
          sx={{ my: 2 }}
          label="Pendiente de pago"
          variant="outlined"
          color="error"
          icon={<CreditCardOffOutlined />}
        ></Chip> */}

    <Chip
      sx={{ my: 2 }}
      label="Orden pagada"
      variant="outlined"
      color="success"
      icon={<CreditScoreOutlined />}
    ></Chip>

    <Grid container sx={{ mt: 2 }}>
      <Grid item xs={12} sm={7}>
        {/* Cart List */}
        <CartList></CartList>
      </Grid>
      <Grid item xs={12} sm={5}>
        <Card className="summary-card">
          <CardContent>
            <Typography variant="h2">Resumen (3 productos)</Typography>
            <Divider sx={{ my: 1 }}></Divider>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography variant="subtitle1">Dirección de entrega</Typography>
              <NextLink href={"/checkout/address"} passHref legacyBehavior>
                <Link underline="always">Editar</Link>
              </NextLink>
            </Box>

            <Typography>Maxi Diaz</Typography>
            <Typography>Salta 535</Typography>
            <Typography>3865504088</Typography>

            <Divider sx={{ my: 1 }}></Divider>
            <Box display={"flex"} justifyContent={"end"}>
              <NextLink href={"/cart"} passHref legacyBehavior>
                <Link underline="always">Editar</Link>
              </NextLink>
            </Box>
            {/* order summary */}
            <OrderSummary></OrderSummary>
            <Box sx={{ mt: 3 }}>
              <h1>Pagar</h1>

              <Chip
                sx={{ my: 2 }}
                label="Orden pagada"
                variant="outlined"
                color="success"
                icon={<CreditScoreOutlined />}
              ></Chip>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </ShopLayout>
);

export default OrderPage;
