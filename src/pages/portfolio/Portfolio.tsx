import React, { useEffect, useState } from 'react';
import './Portfolio.css';
import AddTransaction from '../../components/addTransaction/AddTransaction';
import { db } from './../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
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

  // const getCoinPrice = async (coinName: string): Promise<number> => {
  //   try {
  //     const options = {
  //       method: 'GET',
  //       url: `https://coingecko.p.rapidapi.com/coins/${coinName.toLowerCase()}`,
  //       params: {
  //         sparkline: 'false',
  //         developer_data: 'true',
  //         community_data: 'true',
  //         market_data: 'true',
  //         tickers: 'true',
  //         localization: 'true',
  //       },
  //       headers: {
  //         'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
  //         'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
  //       },
  //     };

  //     // React query hook to fetch coin data from coingecko API using axios
  //     const { data, isLoading, error } = useQuery(
  //       ['coinportfolio'],
  //       () => axios.request(options)
  //       // { refetchInterval: 30000 }
  //     );
  //     const coinId = data?.data;
  //     console.log(coinId);

  //     // const response = await axios.get(
  //     //   `https://api.coingecko.com/api/v3/simple/price?ids=${coinName}&vs_currencies=usd`
  //     // );

  //     const price = coinId?.market_data?.current_price[currency.toLowerCase()];
  //     return price || 0;
  //   } catch (error) {
  //     console.error('Error fetching coin price:', error);
  //     return 0;
  //   }
  // };

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
        // console.log(portfolioData);
        setPortfoliodb(portfolioData);
        // Fetch real-time prices for each coin and update the portfolio
        // const updatedPortfolioData = await Promise.all(
        //   portfolioData.map(async (coin) => ({
        //     ...coin,
        //     price: await FetchCoinData(coin.coin),
        //   }))
        // );

        // setPortfoliodb(updatedPortfolioData);
      } catch (err) {
        console.log(err);
      }
    };
    getPortfolio();
  }, []);

  //finding the total value of the portfolio
  // let totalValue =
  //   <FetchCoinData coinName={coin.coin} currency={currency} /> * coin.holding;

  // const refreshMap = () => {
  //   // Use the setPortfolio function with the current state to trigger a refresh
  //   setPortfolio([...portfolio]);
  // };
  // console.log(<FetchCoinData coinName={'ethereum'} currency={currency} />);

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
        {/* <AddTransaction currency={currency} /> */}
      </main>
    </div>
  );
};

export default Portfolio;
