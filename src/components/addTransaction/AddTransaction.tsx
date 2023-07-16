import React, { useState } from 'react';
import './AddTransaction.css';
import Search from '../search/Search';

interface Props {
  currency: string;
  portfolio: {
    id: number;
    name: string;
    symbol: string;
    image: string;
    price: number;
    price_change_percentage_24h: number;
    holding: number;
  }[];
}

const AddTransaction: React.FC<Props> = ({ currency, portfolio }: Props) => {
  return (
    <div className='addTxn'>
      <h2>Add Transaction</h2>
      <Search currency={currency} portfolio={portfolio} />
      {/* <table>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Current Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table> */}
    </div>
  );
};

export default AddTransaction;
