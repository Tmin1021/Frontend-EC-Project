import axios from 'axios';

const API_BASE = 'http://localhost:8080'; 

export const getProducts = async () => {
  const response = await axios.get(`${API_BASE}/products`);
  return response.data; 
};