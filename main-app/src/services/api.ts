// src/services/api.ts
import axios from 'axios';
import { Product } from '@/types/products';

const API_URL = 'https://fakestoreapi.com';

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(`${API_URL}/products`);
  return response.data; 
};

export const getProductById = async (id: number): Promise<Product | null> => {
  try {
    const response = await axios.get<Product>(`${API_URL}/products/${id}`);
    console.log("produto",response)
    return response.data; 
    
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return null;
  }
};
