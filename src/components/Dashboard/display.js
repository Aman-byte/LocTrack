import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Map from './Map';

const Display = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [locationHistory, setLocationHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    const userData = storedUserData ? JSON.parse(storedUserData) : null;

    if (!userData) {
      navigate('/login');
    } else {
      setUserData(userData);
      fetchLocationHistory(userData.username);
    }
  }, [navigate]);

  const fetchLocationHistory = async (username) => {
    try {
      const response = await axios.get(`http://localhost:3001/location-history/${username}`);
      setLocationHistory(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching location history:', error.message);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.heading}>Welcome To Your Profile</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </header>
      <div style={styles.userData}>
        {userData ? (
          <ul style={styles.userDataList}>
            <li>Username: {userData.username}</li>
            <li>First Name: {userData.first_name}</li>
            <li>Last Name: {userData.last_name}</li>
            <li>Email: {userData.email}</li>
            <li>Address: {userData.address}</li>
            <li>Country: {userData.country}</li>
            <li>Phone: {userData.phone}</li>
          </ul>
        ) : (
          <p>No user data available</p>
        )}
      </div>
      <h2 style={styles.subHeading}>My Live Location</h2>
      <Map username={userData ? userData.username : ''} />

      <h2 style={styles.subHeading}>Location History</h2>
      {loading ? (
        <p>Loading location history...</p>
      ) : locationHistory.length > 0 ? (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
        <thead>
          <tr>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {locationHistory.map((location, index) => (
            <tr key={index} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
              <td style={styles.centered}>{location.latitude}</td>
              <td style={styles.centered}>{location.longitude}</td>
              <td style={styles.centered}>{location.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
      ) : (
        <p>No location history available</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0',
  },
  logoutButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  userData: {
    marginBottom: '20px',
  },
  userDataList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  subHeading: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  tableContainer: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  centered: {
    textAlign: 'center'
  },
  evenRow: {
    backgroundColor: '#f2f2f2',
  },
  oddRow: {
    backgroundColor: '#ffffff',
  },
};

export default Display;
