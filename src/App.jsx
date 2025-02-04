import { useState, useEffect } from 'react';
import instanciaAxios from './components/axios';
import './App.css';

function App() {
  const [producciones, setProducciones] = useState([]);
  const [totalProductividad, setTotalProductividad] = useState(0);
  const [nuevaProduccion, setNuevaProduccion] = useState({
    estacion: 'Estación 1',
    productividad: '',
    nivelProductividad: 'Bueno'
  });
  const [mensajeExito, setMensajeExito] = useState('');

  const estaciones = [
    'Estación 1',
    'Estación 2',
    'Estación 3',
    'Estación 4',
    'Estación 5',
    'Estación 6',
    'Estación 7',
    'Estación 8',
    'Estación 9',
    'Estación 10'
  ];

  const nivelesProductividad = [
    'Deficiente',
    'Bueno',
    'Excelente'
  ];

  useEffect(() => {
    instanciaAxios.get('/producciones')
      .then(response => {
        setProducciones(response.data.producciones);
        setTotalProductividad(response.data.totalProductividad);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaProduccion({
      ...nuevaProduccion,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoId = producciones.length ? producciones[producciones.length - 1].id + 1 : 1;
    const produccionConId = { ...nuevaProduccion, id: nuevoId };
    instanciaAxios.post('/producciones', produccionConId)
      .then(response => {
        setProducciones([...producciones, response.data.nuevaProduccion]);
        setTotalProductividad(response.data.totalProductividad);
        setNuevaProduccion({ estacion: 'Estación 1', productividad: '', nivelProductividad: 'Bueno' });
        setMensajeExito('Ingreso exitoso');
        setTimeout(() => setMensajeExito(''), 3000);
      })
      .catch(error => {
        console.error('Error al agregar los datos:', error);
      });
  };

  return (
    <div className="App">
      <h1>Empresa Examen Jhon</h1>
      <h2>Total Productividad: {totalProductividad}</h2>
      {mensajeExito && <p className="mensaje-exito">{mensajeExito}</p>}
      <form onSubmit={handleSubmit}>
        <select
          name="estacion"
          value={nuevaProduccion.estacion}
          onChange={handleInputChange}
          required
        >
          {estaciones.map(estacion => (
            <option key={estacion} value={estacion}>
              {estacion}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="productividad"
          value={nuevaProduccion.productividad}
          onChange={handleInputChange}
          placeholder="Productividad"
          required
        />
        <select
          name="nivelProductividad"
          value={nuevaProduccion.nivelProductividad}
          onChange={handleInputChange}
          required
        >
          {nivelesProductividad.map(nivel => (
            <option key={nivel} value={nivel}>
              {nivel}
            </option>
          ))}
        </select>
        <button type="submit">Agregar Producción</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Estación</th>
            <th>Productividad</th>
            <th>Nivel de Productividad</th>
          </tr>
        </thead>
        <tbody>
          {producciones.map(produccion => (
            <tr key={produccion.id}>
              <td>{produccion.id}</td>
              <td>{produccion.estacion}</td>
              <td>{produccion.productividad}</td>
              <td>{produccion.nivelProductividad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;