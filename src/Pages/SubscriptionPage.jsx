

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import styles from './SubscriptionPage.module.css';

const packages = {
  Premium: 500,
  Gold: 300,
  Silver: 200,
};

const SubscriptionPage = ({ setPackageDetails, setUser }) => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [duration, setDuration] = useState(1);
  const [finalPrice, setFinalPrice] = useState(0);
  const [walletBalance, setWalletBalance] = useState(600); 
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [notification, setNotification] = useState({ open: false, message: '' });
  const [showWallet, setShowWallet] = useState(false);

  useEffect(() => {
    if (selectedPackage) {
      calculateFinalPrice(selectedPackage, duration);
    }
  }, [selectedPackage, duration]);

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
    calculateFinalPrice(pkg, duration);
    setNotification({ open: true, message: `${pkg} package selected.` });
  };

  const handleDurationChange = (event) => {
    const newDuration = parseInt(event.target.value);
    setDuration(newDuration);
    calculateFinalPrice(selectedPackage, newDuration);
  };

  const calculateFinalPrice = (pkg, months) => {
    if (!pkg) return;
    const basePrice = packages[pkg] * months;
    let discount = 0;
    if (months === 3 || months === 6) discount = 0.1 * basePrice;
    if (months === 12) discount = 0.12 * basePrice;
    setFinalPrice(basePrice - discount);
    if (discount > 0) {
      setNotification({
        open: true,
        message: `A discount of ${discount.toFixed(2)} has been applied for ${months} months.`,
      });
    }
  };

  const handleConfirm = () => {
    setPackageDetails({ packageName: selectedPackage, duration, finalPrice });
    setWalletBalance(walletBalance - finalPrice);
    setNotification({ open: true, message: 'Package added successfully!' });
    navigate('/');
  };

  const handleRechargeWallet = () => {
    const amount = parseFloat(rechargeAmount);
    if (isNaN(amount) || amount <= 0) {
      setNotification({ open: true, message: 'Invalid recharge amount.' });
      return;
    }
    setWalletBalance(walletBalance + amount);
    setNotification({ open: true, message: `Wallet recharged with Rs.${amount}!` });
    setRechargeAmount('');
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const handleCloseNotification = () => {
    setNotification({ open: false, message: '' });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Subscription Page</h1>
      <div className={styles.buttonHeaderGroup}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          className={styles.headerButton}
        >
          Home
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowWallet(true)}
          className={styles.headerButton}
        >
          Wallet
        </Button>
     
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogout}
          className={styles.headerButton}
        >
          Logout
        </Button>
      </div>
      {showWallet && (
        <div className={styles.walletDetails}>
          <h2>Wallet Balance: Rs.{walletBalance}/-</h2>
          <TextField
            label="Recharge Amount"
            type="number"
            value={rechargeAmount}
            onChange={(e) => setRechargeAmount(e.target.value)}
            className={styles.textField}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleRechargeWallet}
            className={styles.rechargeButton}
          >
            Recharge Wallet
          </Button>
        </div>
      )}
      <h2 className={styles.subHeader}>Select Package</h2>
      <div className={styles.buttonGroup}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleSelectPackage('Premium')}
          className={styles.button}
        >
          Premium
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleSelectPackage('Gold')}
          className={styles.button}
        >
          Gold
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleSelectPackage('Silver')}
          className={styles.button}
        >
          Silver
        </Button>
      </div>

      {selectedPackage && (
        <div className={styles.packageDetails}>
          <h2>{selectedPackage} Package Details</h2>
          <p>Resolution: {selectedPackage === 'Premium' ? '4K' : selectedPackage === 'Gold' ? '1080p' : '720p'}</p>
          <p>AV Quality: {selectedPackage === 'Premium' ? 'Best' : selectedPackage === 'Gold' ? 'Great' : 'Good'}</p>
          <p>No. of Devices Support: {selectedPackage === 'Premium' ? '4' : selectedPackage === 'Gold' ? '2' : '1'}</p>
          <p>Price per month: Rs.{packages[selectedPackage]}/-</p>
          <TextField
            label="Duration (Months)"
            type="number"
            value={duration}
            onChange={handleDurationChange}
            inputProps={{ min: 1, step: 1, list: 'durations' }}
            className={styles.textField}
          />
          <datalist id="durations">
            <option value="1" />
            <option value="3" />
            <option value="6" />
            <option value="12" />
          </datalist>
          <p className={styles.finalPrice}>Final Price: Rs.{finalPrice.toFixed(2)}/-</p>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirm}
            className={styles.confirmButton}
          >
            Confirm Subscription
          </Button>
        </div>
      )}

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert onClose={handleCloseNotification} severity="success" sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SubscriptionPage;
