import React from 'react';
import './Portfolio.css';
import Navbar from '../../components/navbar/Navbar';
import AddTransaction from '../../components/addTransaction/AddTransaction';

type Props = {};

const Portfolio = (props: Props) => {
  const portfolio = [
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      image:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
      price: 30240,
      price_change_percentage_24h: 0.1,
      holding: 0.521,
    },
    {
      id: 1,
      name: 'Ethereum',
      symbol: 'ETH',
      image:
        'https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/ZJZZK5B2ZNF25LYQHMUTBTOMLU.png',
      price: 1950,
      price_change_percentage_24h: 2.1,
      holding: 5.238,
    },
  ];

  const totalValue = portfolio.reduce(
    (total, coin) => total + coin.holding * coin.price,
    0
  );

  return (
    <div className='home'>
      <main className='portfolio-main'>
        <h2>Portfolio</h2>
        <h2>Total Value: ${totalValue.toLocaleString('en-NZ')}</h2>
        <div className='portfolio'>
          <table className='portfolio-table'>
            <thead className='portfolio-table-head'>
              <tr>
                <th>Coin</th>
                <th>Current Price</th>
                <th>24h Price Change</th>
                <th>Holdings</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((coin) => (
                <tr key={coin.id}>
                  <td className='flex'>
                    <img
                      src={coin.image}
                      alt='coin icon'
                      className='portfolio-coin-image'
                    />
                    <p>{coin.name}</p>
                  </td>
                  <td>${coin.price.toLocaleString('en-NZ')}</td>
                  <td>
                    ${coin.price_change_percentage_24h.toLocaleString('en-NZ')}
                  </td>
                  <td>{coin.holding}</td>
                  <td>
                    ${(coin.holding * coin.price).toLocaleString('en-NZ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className='addCoin'>Add Transaction</button>
        <AddTransaction />
      </main>
    </div>
  );
};

export default Portfolio;
