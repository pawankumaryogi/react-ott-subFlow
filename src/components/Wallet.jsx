import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
const Wallet = ({ balance, onRecharge }) => {
  const [amount, setAmount] = useState(0);

  const handleRecharge = () => {
    onRecharge(amount);
    setAmount(0);
  };

  return (
    <div>
      <Typography variant="h6">Wallet Balance: Rs.{balance}</Typography>
      <TextField
        type="number"
        label="Recharge Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button variant="contained" color="secondary" onClick={handleRecharge}>
        Recharge
      </Button>
    </div>
  );
};

export default Wallet;
