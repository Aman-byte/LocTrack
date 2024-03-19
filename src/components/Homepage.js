import React from 'react';
import logo from './loctracklogo.png';

const HomePage = () => {
  return (
    <div style={styles.container}>
      <img src={logo} alt="LocTrackLogo" style={styles.logo} />
      
      <div style={styles.section}>
        <h2>Real-Time Location Tracking Made Easy</h2>
        <p>About LocTrack: LocTrack is your go-to solution for seamless and real-time location tracking. Whether you're tracking assets, vehicles, or personnel, our platform provides accurate and reliable location data at your fingertips.</p>
      </div>

      <div style={styles.features}>
        <div style={styles.featureCard}>
          <h3>Register and Login</h3>
          <p>Sign up for a LocTrack account to start tracking your assets or managing your fleet. Our secure authentication ensures your data remains private and accessible only to authorized users.</p>
        </div>
        <div style={styles.featureCard}>
          <h3>Real-Time Tracking</h3>
          <p>With LocTrack, you can monitor the real-time location of your assets or vehicles with precision. Our advanced tracking technology provides accurate data updates, allowing you to make informed decisions quickly.</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2>How LocTrack Works</h2>
        <ol style={styles.content}>
          <li>Create an Account: Sign up for a LocTrack account by providing your details and verifying your email address.</li>
          <li>Add Assets: Add the assets or vehicles you want to track to your account and configure their settings.</li>
          <li>Track in Real-Time: Access the LocTrack dashboard to view the real-time location of your assets and monitor their movements.</li>
          <li>Receive Alerts: Set up alerts for specific events such as unauthorized usage or maintenance reminders to stay proactive.</li>
        </ol>
      </div>

      <div style={styles.section}>
        <h2>Why Choose LocTrack?</h2>
        <ul style={styles.content}>
          <li>Accuracy: LocTrack utilizes advanced GPS technology to provide precise location data in real-time.</li>
          <li>Security: Your data is encrypted and stored securely, ensuring confidentiality and compliance with data protection regulations.</li>
          <li>Customization: Tailor LocTrack to meet your specific tracking needs with customizable features and alerts.</li>
        </ul>
      </div>

      <div style={styles.section}>
        <h2>Get Started Today</h2>
        <div>
          <a href="/Register" style={styles.ctaButton}>Register</a>
          <a href="#" style={styles.ctaButton}>Learn More</a>
        </div>
      </div>

      <div style={styles.section}>
        <h2>Customer Testimonials</h2>
        <div className="testimonials">
          <blockquote>
            <p>"LocTrack has revolutionized how we manage our fleet. With accurate real-time tracking, we can optimize routes, improve efficiency, and ensure timely deliveries." <b>- John, Fleet Manager</b></p>
          </blockquote>
          <blockquote>
            <p>"The intuitive interface and customizable alerts make LocTrack a valuable tool for our business. It helps us stay informed and proactive in managing our assets." <b>- Sarah, Operations Manager</b></p>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    margin: '0 auto',
    maxWidth: '900px',
    padding: '20px',
  },
  logo: {
    display: 'block',
    margin: '0 auto',
    maxWidth: '200px',
  },
  section: {
    marginTop: '20px',
  },
  features: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  featureCard: {
    flex: '0 1 45%',
    backgroundColor: '#f4f4f4',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  content: {
    listStyleType: 'none',
    padding: 0,
  },
  ctaButton: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    marginRight: '10px',
  },
};

export default HomePage;
