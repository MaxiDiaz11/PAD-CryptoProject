import { cryptoApi } from "@/api";

export const useCryptoService = () => {
  const basePath = "http://localhost:3001/api";

  const getCoins = async () => {
    const response = await cryptoApi.get(basePath + "/Coin/GetCoins");
    return response.data;
  };

  return {
    getCoins,
  };
};
