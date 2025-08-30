import axios from "axios"
import { createProductParams } from "../src/components/functions/product_functions"

const API_BASE = "http://localhost:5001"

const axiosClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
})

const CartApi = {
  getAll: () => axiosClient.get("/api/carts"),
  getByUserId: (id) => axiosClient.get(`/api/carts/${id}`),
  create: (data) => axiosClient.post("/api/carts", data),
  update: (id, data) => axiosClient.put(`/api/carts/${id}`, data),
  delete: (id) => axiosClient.delete(`/api/carts/${id}`)
}

const CommentApi = {
  getAll: () => axiosClient.get("/api/comments"),
  getByProductId: (id) => axiosClient.get(`/api/comments/product/${id}`),
  create: (data) => axiosClient.post("/api/comments", data),
  update: (id, data) => axiosClient.put(`/api/comments/${id}`, data),
  delete: (id) => axiosClient.delete(`/api/comments/${id}`)
}

const UserApi = {
  getAll: () => axiosClient.get("/api/users"),
  getById: (id) => axiosClient.get(`/api/users/${id}`),
  create: (data) => axiosClient.post("/api/users", data),
  update: (id, data) => axiosClient.put(`/api/users/${id}`, data),
  delete: (id) => axiosClient.delete(`/api/users/${id}`)
}

const ProductApi = {
  getAll: (params=createProductParams()) => axiosClient.get(`/api/products?${params.toString()}`),
  getPrediction: (input) => axiosClient.get(`/api/products/predict?search=${input}`),
  getById: (id) => axiosClient.get(`/api/products/${id}`),
  create: (data) => axiosClient.post("/api/products", data),
  update: (id, data) => axiosClient.put(`/api/products/${id}`, data),
  delete: (id) => axiosClient.delete(`/api/products/${id}`)
}

const ImageApi = {
  upload: (formData) => axiosClient.post("/api/images/upload", formData),
}

export default {
  UserApi, ProductApi, ImageApi, CommentApi, CartApi
}
