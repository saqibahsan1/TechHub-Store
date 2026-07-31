import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Product API
const ProductAPI = {
  // Get all products
  getProducts: (params: {
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
    sort?: string;
    page?: number;
    limit?: number;
  }) => {
    return api.get('/products', { params });
  },

  // Get product by ID
  getProductById: (id: string) => {
    return api.get(`/products/${id}`);
  },

  // Get all categories
  getCategories: () => {
    return api.get('/categories');
  },

  // Get all brands
  getBrands: () => {
    return api.get('/brands');
  },

  // Create product (Admin only)
  createProduct: (productData: FormData) => {
    return api.post('/products', productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Update product (Admin only)
  updateProduct: (id: string, productData: FormData) => {
    return api.put(`/products/${id}`, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Delete product (Admin only)
  deleteProduct: (id: string) => {
    return api.delete(`/products/${id}`);
  },
};

export default ProductAPI;