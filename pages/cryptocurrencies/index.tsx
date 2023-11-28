import React from "react";
import { CryptoLayout } from "@/components/layouts";
import { Typography } from "@mui/material";
import { AllCryptoTable } from "@/components/cryptos";

const CryptoPage = () => {
  return (
    <CryptoLayout
      title={"PAD - Cryptos"}
      pageDescription={"Encuentra tus criptomonedas aquí"}
    >
      <Typography variant="h1" component={"h1"}>
        PAD-Cryptocurrencies
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }} component={"h2"}>
        Criptomonedas
      </Typography>

      <AllCryptoTable />
    </CryptoLayout>
  );
};

export default CryptoPage;
