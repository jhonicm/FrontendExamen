import axios from 'axios';

const instanciaAxios = axios.create({
  baseURL: 'https://backend-examen-orcin.vercel.app/api', // Reemplaza con tu dominio de backend en Vercel
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instanciaAxios;
