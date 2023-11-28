import React, { useEffect } from "react";
import { CryptoLayout } from "@/components/layouts";
import { Typography } from "@mui/material";
import { FavoriteTable } from "@/components/cryptos";
import { validateUserID } from "@/utils/util";

const FavoritesPage = () => {
  useEffect(() => {
    validateUserID();
  }, []);

  return (
    <CryptoLayout
      title={"PAD - Favorites"}
      pageDescription={"Encuentra tus criptomonedas favoritas aquí"}
    >
      <Typography variant="h1" component={"h1"}>
        PAD-Cryptocurrencies
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }} component={"h2"}>
        Tus criptomonedas favoritas
      </Typography>

      <FavoriteTable />
    </CryptoLayout>
  );
};

export default FavoritesPage;
