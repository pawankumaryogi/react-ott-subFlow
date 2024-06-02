// HomePage.jsx

import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { signInWithGoogle, signOut } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = ({ user, setUser, packageDetails }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const handleLogin = () => {
    signInWithGoogle()
      .then(user => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      })
      .catch(error => {
        console.error('Error signing in with Google:', error);
      });
  };

  const handleLogout = () => {
    signOut()
      .then(() => {
        localStorage.removeItem('user');
        setUser(null);
      })
      .catch(error => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Welcome to OTT Subscription App</h1>
      {user ? (
        <>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            className={styles.logoutButton}
          >
            Log Out
          </Button>
          <h2>Hello, {user.displayName}</h2>
          {packageDetails ? (
            <div className={styles.subscriptionDetails}>
              <h2>Your Subscription</h2>
              <p>Package: {packageDetails.packageName}</p>
              <p>Duration: {packageDetails.duration} months</p>
              <p>Price: Rs.{packageDetails.finalPrice}/-</p>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/subscribe')}
                className={styles.subscribeButton}
              >
                Change Package
              </Button>
            </div>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/subscribe')}
              className={styles.subscribeButton}
            >
              Subscribe to a Package
            </Button>
          )}
        </>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          className={styles.button}
        >
          Sign In with Google
        </Button>
      )}
    </div>
  );
};

export default HomePage;
