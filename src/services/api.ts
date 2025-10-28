import axios from 'axios';
import { Experience, Booking } from '../types';

const API_URL =
  (typeof import.meta !== 'undefined' &&
    // @ts-expect-error - vite client types provide env
    import.meta.env?.VITE_API_URL) ||
  'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Experience APIs
export const getAllExperiences = async (): Promise<Experience[]> => {
  const response = await api.get('/experiences');
  return response.data.data;
};

export const getExperienceById = async (id: string): Promise<Experience> => {
  const response = await api.get(`/experiences/${id}`);
  return response.data.data;
};

// Booking APIs
export const createBooking = async (bookingData: Partial<Booking>): Promise<Booking> => {
  const response = await api.post('/bookings', bookingData);
  return response.data.data;
};

// Promo Code API
export const validatePromoCode = async (code: string, subtotal: number) => {
  const response = await api.post('/promo/validate', { code, subtotal });
  return response.data.data;
};

export default api;
