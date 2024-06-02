let user = {
    balance: 600
  };
  
  export const getUser = () => {
    return user;
  };
  
  export const deductBalance = (amount) => {
    user.balance -= amount;
  };
  
  export const rechargeWallet = (amount) => {
    user.balance += amount;
  };
  