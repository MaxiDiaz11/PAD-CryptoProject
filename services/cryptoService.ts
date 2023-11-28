import { cryptoApi } from "@/api";
import { CryptoCurrency, ILoginUser, INewUser } from "@/interfaces";

export const useCryptoService = () => {
  const basePath = "http://localhost:3001/api";

  const getCoins = async () => {
    const response = await cryptoApi.get<CryptoCurrency>(
      basePath + "/Coin/GetCoins"
    );
    return response.data;
  };

  const createUser = async (user: INewUser) => {
    const response = await cryptoApi.post(basePath + "/User/CreateUser", user);
    return response.data;
  };

  const login = async (user: ILoginUser) => {
    const response = await cryptoApi.post(basePath + "/User/Login", user);
    return response.data;
  };

  const getList = async () => {
    const response = await cryptoApi.get(basePath + "/List/GetList");
    return response.data;
  };

  return {
    getCoins,
    createUser,
    login,
    getList,
  };
};
