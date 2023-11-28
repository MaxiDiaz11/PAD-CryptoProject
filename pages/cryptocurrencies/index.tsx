import React, { useEffect } from "react";
import { CryptoLayout } from "@/components/layouts";
import { Typography } from "@mui/material";
import { AllCryptoTable } from "@/components/cryptos";
import { validateUserID } from "@/utils/util";
import FormDialog from "@/components/ui/Dialog";

const CryptoPage = () => {
  useEffect(() => {
    validateUserID();
  }, []);

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

      <FormDialog />

      <AllCryptoTable />
    </CryptoLayout>
  );
};

export default CryptoPage;
