import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    if (
      email === '' ||
      username === '' ||
      password === '' ||
      firstName === '' ||
      lastName === '' ||
      address === '' ||
      country === '' ||
      phone === ''
    ) {
      setRegistrationStatus('error');
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/register', {
        email,
        username,
        password,
        firstName,
        lastName,
        address,
        country,
        phone,
      });

      setRegistrationStatus('success');
      setErrorMessage('');
      console.log(response.data);
    } catch (error) {
      setRegistrationStatus('error');
      setErrorMessage('Failed to register. Please check your information.');
      console.error('Failed to register:', error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Register</h1>
      <div style={styles.form}>
        <label style={styles.label}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
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
        <label style={styles.label}>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={styles.input}
        />
        <label style={styles.label}>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={styles.input}
        />
        <label style={styles.label}>Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={styles.input}
        />
        <label style={styles.label}>Country:</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          style={styles.input}
        />
        <label style={styles.label}>Phone:</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleRegister} style={styles.button}>
          Register
        </button>
        {registrationStatus === 'success' && (
          <p style={{ color: '#28a745' }}>Registration is Successful!</p>
        )}
        {registrationStatus === 'error' && (
          <p style={{ color: '#dc3545' }}>{errorMessage}</p>
        )}
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
    marginBottom: '10px',
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
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Register;
