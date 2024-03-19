import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>&copy; 2024 LocTracker. All rights reserved.</p>
      <p>Have questions or need assistance? Our support team is here to help.</p>
      <p>Email: support@loctrack.com</p>
      <p>Phone: 1-800-123-4567</p>

      <p>Connect with us on social media:</p>
      <a href="#" style={{ marginRight: '10px', color: 'white' }}>Facebook</a>
      <a href="#" style={{ marginRight: '10px', color: 'white' }}>Twitter</a>
      <a href="#" style={{ marginRight: '10px', color: 'white' }}>Instagram</a>
    </footer>
  );
};

const footerStyle = {
  background: '#141414',
  color: '#fff',
  padding: '30px',
  position: 'relative',
  bottom: 0,
};

export default Footer;