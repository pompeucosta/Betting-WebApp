import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Login.css';

const Login = () => {
  return (
    <div className="container-fluid bg-light vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow">
        <h1 className="text-center mb-3">Login</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" name="username" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" required />
          </div>
          <button type="submit" className="w-100 mb-3 login-button">Login</button>
        </form>
        <p className="text-center">Não tem uma conta? <Link to="/register" className="register-link">Registre-se aqui</Link></p>
      </div>
    </div>
  );
};

export default Login;
