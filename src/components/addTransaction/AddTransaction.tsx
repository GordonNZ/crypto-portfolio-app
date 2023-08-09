import React, { useState } from 'react';
import './AddTransaction.css';
import Search from '../search/Search';

interface Props {
  currency: string;
  getPortfolio: () => void;
}

const AddTransaction: React.FC<Props> = ({ currency, getPortfolio }: Props) => {
  return (
    <div className='addTxn'>
      <h2>Add Transaction</h2>
      <Search currency={currency} getPortfolio={getPortfolio} />
    </div>
  );
};

export default AddTransaction;
