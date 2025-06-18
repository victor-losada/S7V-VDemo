import axios from 'axios';
import { API_URL } from './ConfigUrl';

const TokenHeader = axios.create({
  baseURL: API_URL,
});

TokenHeader.interceptors.request.use(async (config) => {
  // Intentamos obtener el token del localStorage primero
  let token = localStorage.getItem('token');
  
  // Si no hay token en localStorage, intentamos obtenerlo de Firebase
  if (!token) {
    const firebaseUser = JSON.parse(localStorage.getItem('firebaseUser'));
    if (firebaseUser?.stsTokenManager?.accessToken) {
      token = firebaseUser.stsTokenManager.accessToken;
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default TokenHeader;
