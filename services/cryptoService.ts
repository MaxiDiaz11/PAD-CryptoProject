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

  const createItem = async (
    coinId: string,
    coinName: string,
    listId: string
  ) => {
    const item = {
      listId,
      coinId,
      coinName,
    };
    const response = await cryptoApi.put(
      basePath + "/List/AddItemsToList",
      item
    );
    return response.data;
  };

  const deleteList = async (listId: string) => {
    const response = await cryptoApi.delete(
      basePath + "/List/DeleteList" + `?ListId=${listId}`
    );
    return response.data;
  };

  const deleteItem = async (itemId: string) => {
    const response = await cryptoApi.delete(
      basePath + "/List/DeleteItemToList" + `?Id=${itemId}`
    );
    return response.data;
  };

  return {
    createItem,
    createList,
    createUser,
    deleteItem,
    deleteList,
    getCoins,
    getLists,
    login,
  };
};
