import React from "react";
import { CryptoLayout } from "@/components/layouts";
import { Typography } from "@mui/material";
import { CryptoTable } from "@/components/cryptos";

const MyCryptoPage = () => {
  return (
    <CryptoLayout
      title={"PAD - Favorites"}
      pageDescription={"Encuentra tus criptomonedas aquí"}
    >
      <Typography variant="h1" component={"h1"}>
        PAD-Cryptocurrencies
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }} component={"h2"}>
        Criptomonedas
      </Typography>

      <CryptoTable />
    </CryptoLayout>
  );
};

export default MyCryptoPage;
