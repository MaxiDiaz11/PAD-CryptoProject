import React, { useEffect, useState } from "react";
import CustomPaginationActionsTable from "./Table";
import { useCryptoService } from "@/services/cryptoService";
import { formatDate } from "@/utils/util";

export const AllCryptoTable = () => {
  const { getCoins } = useCryptoService();
  const [dataTable, setDataTable] = useState<
    {
      name: string;
      symbol: string;
      quote: {
        usd: {
          price: number;
          percent_change_24h: number;
          last_updated: string;
        };
      };
      dateAdded: string;
    }[]
  >([] as any);

  useEffect(() => {
    getCoins().then((response) => setDataTable(response.cryptoCurrencies));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const titleTableCoins = [
    "Nombre",
    "Símbolo",
    "Precio en USD",
    "Porcentaje de cambio - 24hs",
    "Última actualización",

    "Agregar a una lista",
  ];

  const createDateCrypto = (
    name: string,
    symbol: string,
    price: number,
    percent_change_24h: number,
    last_updated: string
  ) => {
    return {
      name,
      symbol,
      price,
      percent_change_24h,
      last_updated,
    };
  };

  const rowsTable = dataTable.map((crypto) => {
    const { name, symbol, dateAdded, quote } = crypto;
    const { usd } = quote;
    const { price, percent_change_24h, last_updated } = usd;

    return createDateCrypto(
      name,
      symbol,
      +price.toFixed(2),
      +percent_change_24h.toFixed(2),
      formatDate(new Date(last_updated))
    );
  });

  return (
    <CustomPaginationActionsTable
      titleTableCoins={titleTableCoins}
      dataTable={rowsTable}
      isFavorite={false}
      isCustom={true}
    />
  );
};
