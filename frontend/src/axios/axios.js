import axios from "axios";

const userToken = localStorage.getItem("token");

const instance = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    Authorization: `Bearer ${userToken}`,
  },
});

export default instance;
