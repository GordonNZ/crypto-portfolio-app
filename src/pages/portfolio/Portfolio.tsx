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
  orderBy,
  query,
} from 'firebase/firestore';
import { PortfolioLayout } from '../../components/portfolioLayout/PortfolioLayout';
import { PortfolioSortBy } from '../../components/portfolioSortBy/PortfolioSortBy';

type Coin = {
  id: string;
  coin: string;
  holding: number;
  icon: string;
  name: string;
  timestamp: number;
};

type Props = {
  currency: string;
};

const Portfolio: React.FC<Props> = ({ currency }: Props) => {
  const [portfoliodb, setPortfoliodb] = useState<Coin[]>([]);
  const [updatedHolding, setUpdatedHolding] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [sortBy, setSortBy] = useState('timestamp');

  const portfolioRef = query(collection(db, 'portfolio'), orderBy(sortBy));

  const getPortfolio = async () => {
    //READ THE DATA FROM THE DATABASE
    //SET THE DATA TO THE PORTFOLIO STATE
    try {
      const data = await getDocs(portfolioRef);
      const portfolioData: Coin[] = data.docs.map((doc) => ({
        id: doc.id,
        coin: doc.data().coin,
        holding: doc.data().holding,
        icon: doc.data().icon,
        name: doc.data().name,
        timestamp: doc.data().timestamp,
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

  const [coinPrice, setCoinPrice] = useState<number[]>([]);
  const [totalSum, setTotalSum] = useState<number>(0);

  const handlePriceUpdate = (price: number) => {
    if (!coinPrice.includes(price)) {
      setCoinPrice([...coinPrice, price]);
      // console.log(coinPrice);
    }
    //empties coinPrice array when prices are updated, which updates total.
    if (coinPrice.length > portfoliodb.length) {
      setCoinPrice([]);
    } else {
      const total = coinPrice?.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
      setTotalSum(total);
    }
  };

  return (
    <div className='portfolio-home home'>
      <main className='portfolio-main'>
        <div className='portfolio-header flex'>
          <h1>Portfolio</h1>
          <h2>
            Total Value: $
            {totalSum.toLocaleString('en-NZ', {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </h2>
          <button
            onClick={() => setShowEdit(!showEdit)}
            className='portfolio-showEditBtn'
          >
            Edit
          </button>
          <PortfolioSortBy sortBy={sortBy} setSortBy={setSortBy} />
        </div>
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
                  showEdit={showEdit}
                  handlePriceUpdate={handlePriceUpdate}
                />
              ))}
            </tbody>
          </table>
        </div>
        <button className='addCoin' onClick={() => setShowModal(true)}>
          Add Transaction
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
