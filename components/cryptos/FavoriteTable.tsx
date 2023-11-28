import React, { useEffect, useState } from "react";
import CustomPaginationActionsTable from "./Table";
import { useCryptoService } from "@/services/cryptoService";
import { formatDate } from "@/utils/util";

export const FavoriteTable = () => {
  const { getCoins } = useCryptoService();
  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    getCoins().then((response) => setDataTable(response.cryptoCurrencies));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const titleTableCoins = [
    "Nombre",
    "Símbolo",
    "Máximo de suministro",
    "Fecha de creación",
    "Quitar de favoritos",
  ];

  const createDateCrypto = (
    name: string,
    symbol: string,
    maxSupply: number,
    dateAdded: string
  ) => {
    return {
      name,
      symbol,
      maxSupply,
      dateAdded,
    };
  };

  const rowsTable = dataTable.map((crypto) => {
    const { name, symbol, maxSupply, dateAdded } = crypto;
    return createDateCrypto(
      name,
      symbol,
      maxSupply,
      formatDate(new Date(dateAdded))
    );
  });

  return (
    <CustomPaginationActionsTable
      titleTableCoins={titleTableCoins}
      dataTable={rowsTable}
      isFavorite={true}
      isCustom={true}
    />
  );
};
