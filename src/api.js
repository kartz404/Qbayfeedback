import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // adjust based on your backend server
});

export default api;
