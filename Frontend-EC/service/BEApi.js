import axios from "axios"

const API_BASE = "http://localhost:5001"

const axiosClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
})

const UserApi = {
  getAll: () => axiosClient.get("/api/users"),
  getById: (id) => axiosClient.get(`/api/users/${id}`),
  create: (data) => axiosClient.post("/api/users", data),
  update: (id, data) => axiosClient.put(`/api/users/${id}`, data),
  delete: (id) => axiosClient.delete(`/api/users/${id}`)
}

const ProductApi = {
  getAll: () => axiosClient.get("/api/productss"),
  getById: (id) => axiosClient.get(`/api/products/${id}`),
  create: (data) => axiosClient.post("/api/products", data),
  update: (id, data) => axiosClient.put(`/api/products/${id}`, data),
  delete: (id) => axiosClient.delete(`/api/products/${id}`)
}

const ImageApi = {
  upload: (formData) => axiosClient.post("/api/images/upload", formData),
}

export default {
  UserApi, ImageApi
}
