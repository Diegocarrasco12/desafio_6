import axios from 'axios';
import { useEffect, useState } from 'react';
import { ENDPOINT } from '../config/constans';

const Profile = () => {
  const [userData, setUserData] = useState(null); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = window.sessionStorage.getItem('token'); 
        if (!token) {
          setError('No se encontró el token. Por favor, inicia sesión.');
          return;
        }
        const response = await axios.get(ENDPOINT.profile, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        if (response.data) {
          setUserData(response.data); 
        } else {
          setError('No se encontraron datos del perfil.');
        }
      } catch (err) {
        console.error('Error al obtener los datos del perfil:', err.message);
        setError('No se pudo cargar la información del perfil.');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!userData) {
    return <div className="spinner-border text-primary">Cargando...</div>;
  }

  return (
    <div className="profile">
      <h1>Bienvenido {userData.email}</h1>
      <p>Rol: {userData.rol}</p>
      <p>Lenguaje preferido: {userData.lenguage}</p>
    </div>
  );
};

export default Profile;
