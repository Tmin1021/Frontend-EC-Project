import axios from "axios";

const API_BASE = "http://localhost:8080/products";

const axiosClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// get all vases
export const getVases = () => axiosClient.get("/vase");

// get all products
export const getProducts = () => axiosClient.get("/");

// get single product
export const getProductById = (id) => axiosClient.get(`/${id}`);
