import React, { useEffect, useState } from 'react';
import './Portfolio.css';
import AddTransaction from '../../components/addTransaction/AddTransaction';
import { db, auth } from './../../config/firebase';
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
import SignInRedirect from '../../components/signInRedirect/SignInRedirect';

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
  userId: string;
  screenWidth: number;
};

const Portfolio: React.FC<Props> = ({
  currency,
  userId,
  screenWidth,
}: Props) => {
  const [portfoliodb, setPortfoliodb] = useState<Coin[]>([]);
  const [updatedHolding, setUpdatedHolding] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('timestamp');
  const [coinPrice, setCoinPrice] = useState<number[]>([]);
  const [totalSum, setTotalSum] = useState<number>(0);

  const getPortfolio = async () => {
    const portfolioRef = collection(db, 'users', userId, 'portfolio');
    const portfolioQuery = query(portfolioRef, orderBy(sortBy)); // Create a query for ordering
    //READ THE DATA FROM THE DATABASE
    //SET THE DATA TO THE PORTFOLIO STATE
    try {
      const data = await getDocs(portfolioQuery);
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
    if (userId.length !== 0) {
      // console.log(`user ID here: ${userId}`);
      getPortfolio();
    }
  }, [sortBy, userId]);

  //deleting coin from firebase database portfolio
  const deleteCoin = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'users', userId, 'portfolio', id));
      getPortfolio();
    } catch (err) {
      console.log(err);
    }
  };
  //updating coin in firebase database portfolio
  const updateHolding = async (id: string) => {
    try {
      await updateDoc(doc(db, 'users', userId, 'portfolio', id), {
        holding: updatedHolding,
      });
      getPortfolio();
    } catch (err) {
      console.log(err);
    }
  };
  //Updating value of coins in the portfolio
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
        <div>
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
          </div>
          <PortfolioSortBy sortBy={sortBy} setSortBy={setSortBy} />
        </div>
        <div className='portfolio'>
          <table className='portfolio-table'>
            <thead className='portfolio-table-head'>
              <tr>
                <th>Coin</th>
                <th>Price</th>
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
                  screenWidth={screenWidth}
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
          userId={userId}
        />
      </main>
      {!userId ? <SignInRedirect /> : ''}
    </div>
  );
};

export default Portfolio;
