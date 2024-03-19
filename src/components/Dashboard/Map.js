import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ username }) => {
  const [status, setStatus] = useState("");
  const [mapLink, setMapLink] = useState({ href: "", textContent: "" });
  const [mapCenter, setMapCenter] = useState({ latitude: 0, longitude: 0 });
  const [address, setAddress] = useState("");
  const [accuracy, setAccuracy] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [speed, setSpeed] = useState("");
  const [direction, setDirection] = useState("");
  const [altitude, setAltitude] = useState("");
  const [weather, setWeather] = useState("");
  const [uploading, setUploading] = useState(false); // Track if upload is in progress

  const geoFindMe = () => {
    setMapLink({ href: "", textContent: "" });
    setStatus("Locating...");
    navigator.geolocation.getCurrentPosition(success, error);
  };

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const timestamp = new Date(position.timestamp).toLocaleString();

    setMapLink({
      href: `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`,
      textContent: `Latitude: ${latitude.toFixed(6)} °, Longitude: ${longitude.toFixed(6)} °`,
    });
    setMapCenter({ latitude, longitude });

    getAddress(latitude, longitude);
    setAccuracy(position.coords.accuracy);
    setTimestamp(timestamp);
    setSpeed(position.coords.speed || "");
    setDirection(position.coords.heading || "");
    setAltitude(position.coords.altitude || "");

    if (!uploading) {
      // Upload location to the server if not already uploading
      uploadLocation(username, latitude, longitude);
      setUploading(true); // Set uploading to true to prevent further uploads until next button click
    }
  };

  const error = () => {
    setStatus("Unable to retrieve your location");
  };

  const getAddress = async (latitude, longitude) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
      setAddress(response.data.display_name);
    } catch (error) {
      console.error('Error fetching address:', error.message);
    }
  };

  const uploadLocation = async (username, latitude, longitude) => {
    const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

    try {
      await axios.post('http://localhost:3001/upload-location', {
        username,
        latitude,
        longitude,
        timestamp,
      });

      console.log('Location uploaded successfully');
    } catch (error) {
      console.error('Error uploading location:', error.message);
    }
  };

  return (
    <div>
      <button onClick={geoFindMe} style={styles.findmeButton}>Find Me</button>
      <p id="status">{status}</p>
      {mapLink.href && (
        <div>
          <a id="map-link" href={mapLink.href}>
            {mapLink.textContent}
          </a>
          <p>Address: {address}</p>
          <p>Accuracy: {accuracy} meters</p>
          <p>Timestamp: {timestamp}</p>
          {speed && <p>Speed: {speed} m/s</p>}
          {direction && <p>Direction: {direction}°</p>}
          {altitude && <p>Altitude: {altitude} meters</p>}
          {/* Display these on the map using Popup */}
          <MapContainer
            center={[mapCenter.latitude, mapCenter.longitude]}
            zoom={18}
            style={{ width: '300px', height: '300px' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[mapCenter.latitude, mapCenter.longitude]}>
              <Popup>
                <div>
                  <p>{mapLink.textContent}</p>
                  <p>Address: {address}</p>
                  <p>Accuracy: {accuracy} meters</p>
                  <p>Timestamp: {timestamp}</p>
                  {speed && <p>Speed: {speed} m/s</p>}
                  {direction && <p>Direction: {direction}°</p>}
                  {altitude && <p>Altitude: {altitude} meters</p>}
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
      
    </div>
  );
};

const styles ={
  findmeButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  }
}

export default Map;
