import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    axios.post('http://localhost:3001/login', { username, password })
      .then(response => {
        console.log('Response Data:', response.data);
        
        // Handle successful login, e.g., redirect or set authentication state
        setLoginSuccess(true);

        // Store userData in localStorage
        localStorage.setItem('userData', JSON.stringify(response.data));

        // Navigate to display
        navigate('/display');
      })
      .catch(error => {
        console.error('Login failed:', error.response.data);
      });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Login</h1>
      <div style={styles.form}>
        <label style={styles.label}>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <label style={styles.label}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>
        {loginSuccess && (
          <p style={styles.successMessage}>Login successful!</p>
        )}
        <p style={styles.registerText}>
          Not registered yet? <Link to="/Register">Click here to register</Link>
        </p>
      </div>
    </div>
  );
};


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
  },
  label: {
    marginBottom: '5px',
  },
  input: {
    padding: '8px',
    marginBottom: '10px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  successMessage: {
    color: 'green',
    marginTop: '10px',
    textAlign: 'center',
  },
  registerText: {
    marginTop: '10px',
    textAlign: 'center',
  },
};

export default Login;

