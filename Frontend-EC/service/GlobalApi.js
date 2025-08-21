//const { default: axios } = require("axios");
// Use ES module import syntax
import axios from 'axios';

const API_KEY=import.meta.env.VITE_STRAPI_API_KEY;
const axiosClient=axios.create({
    baseURL: 'http://localhost:1337/api/',
    headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${API_KEY}`
    }
})

export const BASE_URL = 'http://localhost:1337';

// comment
const CommentApi = {
  getAll: () => axiosClient.get('/comments?populate=*'),
  getByProductId: (id) => axiosClient.get(`/comments?filters[product_id][$eq]=${id}&populate=*`),
  create: (data) => axiosClient.post('/comments', data),
  delete: (id) => axiosClient.delete(`/comments/${id}`)
}

// user
const UserApi = {
  getAll: () => axiosClient.get('/my-users?populate=*'),
  getById: (id) => axiosClient.get(`/my-users/${id}?populate=*`),
  getByMail: (mail) => axiosClient.get(`/my-users?filters[mail][$eq]=${mail}&populate=*`),
  create: (data) => axiosClient.post('/my-users', data),
  update: (id, data) => axiosClient.put(`/my-users/${id}`, data),
  delete: (id) => axiosClient.delete(`/my-users/${id}`)
}

// product
const ProductApi = {
  getAll: () => axiosClient.get('/products?populate=*'),
  getById: (id) => axiosClient.get(`/products/${id}?populate=*`),
  create: (data) => axiosClient.post('/products', data),
  update: (id, data) => axiosClient.put(`/products/${id}`, data),
  delete: (id) => axiosClient.delete(`/products/${id}`)
}

// order
const OrderApi = {
  getAll: () => axiosClient.get('/orders?populate=*'),
  getById: (id) => axiosClient.get(`/orders/${id}?populate=*`),
  getByUserId: (id) => axiosClient.get(`/orders?filters[user_id][$eq]=${id}?populate=*`),
  create: (data) => axiosClient.post('/orders', data),
  update: (id, data) => axiosClient.put(`/orders/${id}`, data),
  delete: (id) => axiosClient.delete(`/orders/${id}`)
}

// order_item
const OrderItemApi = {
  getAll: () => axiosClient.get('/order-items?populate=*'),
  getById: (id) => axiosClient.get(`/order-items?filters[order_id][$eq]=${id}&populate=*`),
  create: (data) => axiosClient.post('/order-items', data),
  update: (id, data) => axiosClient.put(`/order-items/${id}`, data),
  delete: (id) => axiosClient.delete(`/order-items/${id}`)
}

// support funcs
const formatDate = (str) => {
  const [date, time] = str.split("T")
  const cleanTime = time.replace(".000Z", "")

  return (date+ ' ' +cleanTime)
}

export default{
    CommentApi,
    UserApi,
    ProductApi,
    OrderApi,
    OrderItemApi,
    formatDate
}