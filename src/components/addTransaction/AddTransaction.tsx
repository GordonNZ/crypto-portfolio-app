import React, { useState } from 'react';
import './AddTransaction.css';

type Props = {};

const AddTransaction = (props: Props) => {
  const [searchInput, setSearchInput] = useState<string>('');

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  if (searchInput.length > 0) {
    console.log(searchInput);
  }

  return (
    <div className='addTxn'>
      <h2>Add Transaction</h2>
      <input
        type='text'
        placeholder='Search'
        onChange={handleSearchInput}
        value={searchInput}
        className='searchInput'
      />
      <table>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Current Price</th>
          </tr>
        </thead>
        <tbody>
          {/* {coins.map((coin) => (
            <tr key={coin.id}>
              <td>{coin.name}</td>
              <td>{coin.price</td>
              </tr>
              ))} */}
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AddTransaction;
