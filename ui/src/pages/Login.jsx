import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login({element}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
        setError('Please fill in all fields');
        return;
    } else {
        setError("");

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Email: email,
                Password: password,
                RememberMe : true
            }),
        }).then(data => {
            console.log(data);
            if (data.ok) {
                element(true);
                setError("Login successful");
                navigate('/');
            } else {
              setError("Login failed: " + (data.message ? data.message : 'Unknown error'));
            }
        }).catch(error => {
                console.error('Error:', error);
                setError("Login failed");
        });
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow">
        <h1 className="text-center mb-3">Login</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" name="email" value={email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={password} onChange={handleChange} required />
          </div>
          <button type="submit" onClick={handleSubmit} className="w-100 mb-3 login-button">Login</button>
        </form>
        <p className="text-center">Not a member? <Link to="/register" className="register-link">Register here</Link></p>
      </div>
    </div>
  );
};

export default Login;
