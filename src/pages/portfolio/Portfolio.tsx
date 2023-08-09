import React, { useEffect, useState } from 'react';
import './Portfolio.css';
import AddTransaction from '../../components/addTransaction/AddTransaction';
import { db } from './../../config/firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import FetchCoinPrice from '../../components/fetchCoinPrice/FetchCoinPrice';

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
      // console.log(portfolioData);
      setPortfoliodb(portfolioData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPortfolio();
  }, []);

  //deleting coin from firebase database portfolio
  const deleteCoin = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'portfolio', id));
      getPortfolio();
    } catch (err) {
      console.log(err);
    }
  };

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
                  <td>
                    $
                    <FetchCoinPrice
                      coinName={coin.coin}
                      currency={currency}
                      holding={null}
                    />
                  </td>
                  <td>
                    Value: $
                    <FetchCoinPrice
                      coinName={coin.coin}
                      currency={currency}
                      holding={coin.holding}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => deleteCoin(coin.id)}
                      className='portfolio-deleteBtn'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className='addCoin'>Add Transaction</button>
        <AddTransaction currency={currency} getPortfolio={getPortfolio} />
      </main>
    </div>
  );
};

export default Portfolio;
