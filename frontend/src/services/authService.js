import axios from 'axios';
import Register from '../pages/Register';

// ตั้งค่า URL หลักของ Backend
const API = axios.create({
  baseURL: 'http://localhost:3000/api' 
});

export const login = async (email, password) => {
  try {
    // ยิงไปที่ Path /auth/login ตามที่ตั้งใน Router
    const response = await API.post('/auth/login', { email, password });
    
    // ถ้าสำเร็จ ให้เก็บ Token ลง LocalStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const register = async (username, email, password, consent) => {
  try {
    const response = await API.post('/auth/register', { username, email, password, consent });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
