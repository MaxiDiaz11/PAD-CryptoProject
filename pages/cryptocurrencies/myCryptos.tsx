import React, { useEffect } from "react";
import { CryptoLayout } from "@/components/layouts";
import { Typography } from "@mui/material";
import { validateUserID } from "@/utils/util";
import { CryptoList } from "@/components/ui";

const MyCryptoPage = () => {
  useEffect(() => {
    validateUserID();
  }, []);

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

      <CryptoList />
    </CryptoLayout>
  );
};

export default MyCryptoPage;
