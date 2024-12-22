import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ENDPOINT } from '../config/constans';

// Estado inicial del formulario
const initialForm = {
  email: '',
  password: '',
  rol: 'Full Stack Developer',
  lenguage: 'JavaScript',
};

const Register = () => {
  const [user, setUser] = useState(initialForm);
  const [error, setError] = useState(null); // Manejo de errores
  const navigate = useNavigate();

  // Manejar los cambios en los inputs
  const handleUser = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  // Manejar el envío del formulario
  const handleForm = (event) => {
    event.preventDefault();

    // Validar los campos
    if (!user.email.trim() || !user.password.trim()) {
      return setError('El email y la contraseña son obligatorios.');
    }

    axios
      .post(ENDPOINT.register, user)
      .then(({ data }) => {
        if (data?.id) {
          window.alert('Usuario registrado con éxito 😀.');
          navigate('/login'); // Redirigir al login
        } else {
          setError('Ocurrió un error al registrar el usuario.');
        }
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.error || 'Error desconocido al registrar el usuario.';
        setError(errorMessage);
        console.error('Error en el registro:', errorMessage);
      });
  };

  return (
    <form onSubmit={handleForm} className="col-10 col-sm-6 col-md-3 m-auto mt-5">
      <h1>Registrar nuevo usuario</h1>
      <hr />
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="form-group mt-1">
        <label>Email address</label>
        <input
          value={user.email}
          onChange={handleUser}
          type="email"
          name="email"
          className="form-control"
          placeholder="Enter email"
        />
      </div>
      <div className="form-group mt-1">
        <label>Password</label>
        <input
          value={user.password}
          onChange={handleUser}
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
        />
      </div>
      <div className="form-group mt-1">
        <label>Rol</label>
        <select
          value={user.rol}
          onChange={handleUser}
          name="rol"
          className="form-control"
        >
          <option>Full Stack Developer</option>
          <option>Frontend Developer</option>
          <option>Backend Developer</option>
        </select>
      </div>
      <div className="form-group mt-1">
        <label>Language</label>
        <select
          value={user.lenguage}
          onChange={handleUser}
          name="lenguage"
          className="form-control"
        >
          <option>JavaScript</option>
          <option>Python</option>
          <option>Ruby</option>
        </select>
      </div>
      <button type="submit" className="btn btn-light mt-3">
        Registrarme
      </button>
    </form>
  );
};

export default Register;
