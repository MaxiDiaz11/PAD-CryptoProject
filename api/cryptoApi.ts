import axios from "axios";

const cryptoApi = axios.create({
  baseURL: "/api",
});

export default cryptoApi;
