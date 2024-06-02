import React from 'react';

const HeaderComponent = ({ balance }) => {
  return (
    <header>
      <h1>React OTT App</h1>
      <div>Wallet Balance: Rs.{balance}</div>
    </header>
  );
};

export default HeaderComponent;
