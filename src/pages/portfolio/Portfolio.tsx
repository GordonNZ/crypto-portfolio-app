import React, { useEffect, useState } from 'react';
import './Portfolio.css';
import AddTransaction from '../../components/addTransaction/AddTransaction';
import { db } from './../../config/firebase';
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { PortfolioLayout } from '../../components/portfolioLayout/PortfolioLayout';

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
  const [updatedHolding, setUpdatedHolding] = useState(0);
  const [showModal, setShowModal] = useState(false);

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

  const updateHolding = async (id: string) => {
    try {
      await updateDoc(doc(db, 'portfolio', id), { holding: updatedHolding });
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
                <PortfolioLayout
                  key={index}
                  coin={coin}
                  currency={currency}
                  updatedHolding={updatedHolding}
                  setUpdatedHolding={setUpdatedHolding}
                  deleteCoin={deleteCoin}
                  updateHolding={updateHolding}
                />
              ))}
            </tbody>
          </table>
        </div>
        <button className='addCoin' onClick={() => setShowModal(true)}>
          + Add Transaction
        </button>
        <AddTransaction
          currency={currency}
          getPortfolio={getPortfolio}
          showModal={showModal}
          onClose={() => setShowModal(false)}
        />
      </main>
    </div>
  );
};

export default Portfolio;
