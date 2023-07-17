import React, { useEffect, useState } from 'react';
import './Portfolio.css';
import AddTransaction from '../../components/addTransaction/AddTransaction';

type Coin = {
  id: number;
  name: string;
  symbol: string;
  image: string;
  price: number;
  price_change_percentage_24h: number;
  holding: number;
};

type Props = {
  currency: string;
};

const Portfolio: React.FC<Props> = ({ currency }: Props) => {
  const [portfolio, setPortfolio] = useState<Coin[]>([
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
  ]);

  //finding the total value of the portfolio
  let totalValue = portfolio.reduce(
    (total, coin) => total + coin.holding * coin.price,
    0
  );

  const refreshMap = () => {
    // Use the setPortfolio function with the current state to trigger a refresh
    setPortfolio([...portfolio]);
  };

  return (
    <div className='portfolio-home home'>
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
                  <td>${coin.price_change_percentage_24h.toFixed(2)}</td>
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
        <button className='addCoin' onClick={refreshMap}>
          Refresh
        </button>
        <AddTransaction currency={currency} portfolio={portfolio} />
      </main>
    </div>
  );
};

export default Portfolio;
