import axios from 'axios';

const instanciaAxios = axios.create({
  baseURL: 'https://backend-examen-orcin.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instanciaAxios;
