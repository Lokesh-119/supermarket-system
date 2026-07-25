import axios from "axios";

/**
 * ✅ Central axios instance
 * - Single place to manage baseURL & headers
 * - Prevents duplicate bugs
 */
const API = axios.create({
  baseURL: "/api"
});

/**
 * 🔐 Attach token automatically (if exists)
 */
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * 🛡️ Response interceptor for consistent error handling
 */
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log the error for debugging
    console.error("API Error:", error.response?.data || error.message);

    // Re-throw the error so individual handlers can catch it
    return Promise.reject(error);
  }
);

/* =======================
   📦 PRODUCTS
======================= */

export const getProducts = () => API.get("/products");

export const addProduct = (data) => API.post("/products", data);

export const archiveProduct = async (id) => {
  try {
    const response = await API.put(`/products/archive/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const restoreProduct = async (id) => {
  try {
    const response = await API.put(`/products/restore/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/* =======================
   💰 SALES
======================= */

export const addSale = (data) => API.post("/sales", data);

export const getRecentSales = () => API.get("/sales/recent");

export const getSalesAnalytics = () => API.get("/sales/analytics");

export const getSalesByDateRange = (start, end) =>
  API.get(`/sales/range?startDate=${start}&endDate=${end}`);