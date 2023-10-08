import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import { coinList, globalOptions } from '../../config/API_Options';
import CoinDataLayout from '../../components/coinDataLayout/CoinDataLayout';
import Loading from '../../components/loading/Loading';

// interface for the data from the API
interface CoinData {
  market_cap_rank: number;
  symbol: string;
  image: string;
  name: string;
  current_price: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  market_cap: number;
  total_volume: number;
  id: string;
}
interface TrendingItem {
  market_cap_rank: number;
  name: string;
  small: string;
  id: string;
}

interface TrendingCoins {
  item: TrendingItem;
}

interface Props {
  currency: string;
  screenWidth: number;
}

const Home: React.FC<Props> = ({ currency, screenWidth }: Props) => {
  const [totalmarketcap, setTotalmarketcap] = useState<number>(0);
  const [tradingVol, setTradingVol] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [coinData, setCoinData] = useState<CoinData[]>([]);

  // const { pageid } = useParams<{ pageid: string }>();

  const options = {
    method: 'GET',
    url: 'https://coingecko.p.rapidapi.com/coins/markets',
    params: {
      vs_currency: currency,
      order: 'market_cap_desc',
      per_page: '100',
      page: page,
      price_change_percentage: '1h,24h,7d',
      sparkline: 'true',
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
      'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
    },
  };

  const coinListData = useQuery(['coinList'], () => axios.request(coinList));
  const totalCoins = coinListData?.data?.data;
  const marketPages = Math.ceil(totalCoins?.length / 100);

  const trendingCoin = useQuery(
    ['trending'],
    () => axios.get('https://api.coingecko.com/api/v3/search/trending'),
    { refetchInterval: 60000 }
  );
  // console.log(trendingCoin.data?.data?.coins);

  const {
    data: coins,
    isLoading,
    error,
  } = useQuery(['coins', currency, page], () => axios.request(options), {
    refetchInterval: 60000,
  });

  // const coinData = coins?.data;
  // console.log(coinData);

  useEffect(() => {
    if (coins) {
      setCoinData(coins?.data);
      console.log(coinData);
    }
    if (error) {
      console.log(`Found an error: ${error}`);
    }
    if (isLoading) {
      // console.log(`Loading ${isLoading}`);
    }
  }, [coins, currency]);

  const global = useQuery(
    ['global', currency],
    () => axios.request(globalOptions),
    {
      refetchInterval: 60000,
    }
  );

  useEffect(() => {
    if (global?.data?.data?.data) {
      setTotalmarketcap(
        global.data.data.data.total_market_cap[currency.toLowerCase()]
      );
      setTradingVol(global.data.data.data.total_volume[currency.toLowerCase()]);
    }
  }, [global, currency]);

  //pages component to diplay which pages show
  const buttonArray = [];
  const maxPages = 4;

  const startPage = Math.max(page - Math.floor(maxPages / 2), 1);
  const endPage = Math.min(startPage + maxPages - 1, marketPages);

  for (let i = startPage; i <= endPage; i++) {
    buttonArray.push(
      <button
        key={i}
        onClick={() => setPage(i)}
        className={i === page ? 'pageButton active' : 'pageButton'}
      >
        {i}
      </button>
    );
  }

  return (
    <main>
      <div className='home'>
        <div className='cryptoMarketContainer'>
          <header>
            <div className='flex topHeader'>
              <h1 className='headerH1'>Cryptocurrency Prices by Market Cap</h1>
            </div>
            <p>
              Stay up to date in the ever changing world of cryptocurrency and
              track your crypto portfolio!
            </p>
            <section className='flex marketInfo'>
              <div className='totalMarketInfo'>
                <h4>Total Crypto Market Capitalization </h4>

                <p>${totalmarketcap?.toLocaleString('en-NZ')}</p>

                <h4>24 hour Trading Volume</h4>
                <p>${tradingVol?.toLocaleString('en-NZ')}</p>

                <img
                  src='/assets/image.svg'
                  alt='man with wheelbarrow full of bitcoin'
                  className='marketImg flex'
                />
              </div>
              {/* TRENDING CONTAINER */}
              <div className='trendingContainer'>
                <h4>Trending Coins</h4>
                {trendingCoin.data?.data?.coins.map(
                  (coin: TrendingCoins, index: number) => (
                    <Link
                      to={`/coin/${coin.item.id}`}
                      key={index}
                      className='coinLinks'
                    >
                      <div key={index} className='trending'>
                        <div className='flex'>
                          <img
                            src={coin.item.small}
                            alt={coin.item.name}
                            className='img'
                          />
                          <p className='name'>{coin.item.name}</p>
                        </div>
                        <p>#{coin.item.market_cap_rank}</p>
                      </div>
                    </Link>
                  )
                )}
              </div>
            </section>
          </header>
          <div>
            {screenWidth >= 1024 ? (
              <div className='coinsHeader'>
                <p>#</p>
                <p>Ticker</p>
                <p>Coin</p>
                <p>Price</p>
                <p>1h</p>
                <p>24h</p>
                <p>7d</p>
                <p>Market Cap</p>
                <p>24h Volume</p>
              </div>
            ) : (
              <div className='coinsHeaderSmall'>
                <p>#</p>
                <p>Coin</p>
                <p>Price</p>
                <p>24h</p>
                <p>Market Cap</p>
              </div>
            )}
          </div>
          {/* Coin table */}
          {coinData &&
            coinData?.map((coin: CoinData, index: number) => (
              <CoinDataLayout
                coin={coin}
                index={index}
                screenWidth={screenWidth}
                key={index}
              />
            ))}
          <div className='pages'>
            <button className='pageButton' onClick={() => setPage(page - 1)}>
              ❮
            </button>

            {buttonArray}

            <button className='pageButton'>...</button>
            <button className='pageButton' onClick={() => setPage(100)}>
              100
            </button>
            <button className='pageButton' onClick={() => setPage(page + 1)}>
              ❯
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
