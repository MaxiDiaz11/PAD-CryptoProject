import { cryptoApi } from "@/api";
import { ILoginUser, INewUser } from "@/interfaces";

export const useCryptoService = () => {
  const basePath = "http://localhost:3001/api";

  const getCoins = async () => {
    const response = await cryptoApi.get(basePath + "/Coin/GetCoins");
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

  const getLists = async (UserId: string) => {
    const response = await cryptoApi.get(
      basePath + "/List/GetList" + `?UserId=${UserId}`
    );
    return response.data;
  };

  const createList = async (name: string) => {
    const list = {
      listName: name,
      userId: sessionStorage.getItem("userID"),
    };
    const response = await cryptoApi.post(basePath + "/List/CreateList", list);
    return response.data;
  };

  return {
    getCoins,
    createUser,
    createList,
    login,
    getLists,
  };
};
