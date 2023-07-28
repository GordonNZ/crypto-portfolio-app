import React, { useEffect, useState } from 'react';
import './Portfolio.css';
import AddTransaction from '../../components/addTransaction/AddTransaction';
import { db } from './../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

type Coin = {
  id: string;
  coin: string;
  holding: number;
};

type Props = {
  currency: string;
};

const Portfolio: React.FC<Props> = ({ currency }: Props) => {
  const [portfoliodb, setPortfoliodb] = useState<Coin[]>([]);

  const portfolioRef = collection(db, 'portfolio');

  useEffect(() => {
    const getPortfolio = async () => {
      //READ THE DATA FROM THE DATABASE
      //SET THE DATA TO THE PORTFOLIO STATE
      try {
        const data = await getDocs(portfolioRef);
        const portfolioData: Coin[] = data.docs.map((doc) => ({
          id: doc.id,
          coin: doc.data().coin,
          holding: doc.data().holding,
        }));
        console.log(portfolioData);
        setPortfoliodb(portfolioData);
      } catch (err) {
        console.log(err);
      }
    };
    getPortfolio();
  }, []);

  //finding the total value of the portfolio
  // let totalValue = portfolio.reduce(
  //   (total, coin) => total + coin.holding * coin.price,
  //   0
  // );

  // const refreshMap = () => {
  //   // Use the setPortfolio function with the current state to trigger a refresh
  //   setPortfolio([...portfolio]);
  // };

  return (
    <div className='portfolio-home home'>
      <main className='portfolio-main'>
        <h2>Portfolio</h2>
        {/* <h2>Total Value: ${totalValue.toLocaleString('en-NZ')}</h2> */}
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
              {portfoliodb.map((coin, index) => (
                <tr key={coin.id}>
                  <td>{coin.coin}</td>
                  <td>{coin.holding}</td>
                </tr>
              ))}
              {/* {portfolio.map((coin) => (
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
              ))} */}
            </tbody>
          </table>
        </div>
        <button className='addCoin'>Add Transaction</button>
        {/* <button className='addCoin' onClick={refreshMap}> */}
        {/* Refresh */}
        {/* </button> */}
        <AddTransaction currency={currency} />
      </main>
    </div>
  );
};

export default Portfolio;
