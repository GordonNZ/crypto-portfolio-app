import React, { useState } from 'react';
import './AddTransaction.css';
import Search from '../search/Search';

interface Props {
  currency: string;
}

const AddTransaction: React.FC<Props> = ({ currency }: Props) => {
  return (
    <div className='addTxn'>
      <h2>Add Transaction</h2>
      <Search currency={currency} />
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
