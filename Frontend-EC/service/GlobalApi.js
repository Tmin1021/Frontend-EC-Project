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


/*
// Follow CRUD
// product
// create
const CreateNewProduct=(data)=>axiosClient.post('/products', data)
// retrieve
const GetProduct=()=>axiosClient.get('/products?populate=*')
//update
const UpdateProductDetail=(id, data)=>axiosClient.put('/products/'+id,data)
//delete
const DeleteProductById=(id)=>axiosClient.delete('/products/'+id)

 // +"?populate=*" --> to select everything
 // else, any composite attribute will not appear
const GetProductById=(id)=>axiosClient.get(`/products/${id}?populate=*`)  */

// user
const UserApi = {
  getAll: () => axiosClient.get('/my-users?populate=*'),
  getById: (id) => axiosClient.get(`/my-users/${id}?populate=*`),
  getByMail: (mail) => axiosClient.get(`/my-users?filters[mail][$eq]=${mail}&populate=*`),
  create: (data) => axiosClient.post('/my-users', data),
  update: (id, data) => axiosClient.put(`/my-users/${id}`, data),
  delete: (id) => axiosClient.delete(`/my-users/${id}`)
}

// user
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

export default{
    UserApi,
    ProductApi,
    OrderApi,
    OrderItemApi
}