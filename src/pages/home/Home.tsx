import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Auth } from '../../components/authentication/auth';

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
}

const Home: React.FC<Props> = ({ currency }: Props) => {
  const [data, setData] = useState<CoinData[]>([]);
  const [totalmarketcap, setTotalmarketcap] = useState<number>(0);
  const [tradingVol, setTradingVol] = useState<number>(0);
  const [trending, setTrending] = useState<TrendingCoins[]>([]);
  const [page, setPage] = useState<number>(1);

  const { pageid } = useParams<{ pageid: string }>();

  // options for the API
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

  const globalOptions = {
    method: 'GET',
    url: 'https://coingecko.p.rapidapi.com/global',
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
      'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
    },
  };

  const coinList = {
    method: 'GET',
    url: 'https://coingecko.p.rapidapi.com/coins/list',
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

  const coins = useQuery(
    ['coins', currency, page],
    () => axios.request(options),
    {
      refetchInterval: 60000,
    }
  );
  // console.log(coins?.data?.data);
  const coinData = coins?.data?.data;
  // console.log(coins?.data);

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
      <Auth />
      <div className='home'>
        <div className='cryptoMarketContainer'>
          <header>
            <div className='flex topHeader'>
              <h1 className='headerH1'>Cryptocurrency Prices by Market Cap</h1>
            </div>
            <p>Stay up to date in the ever changing world of Cryptocurrency!</p>
            <section className='flex marketInfo'>
              <div className='totalMarketInfo'>
                <h4>Total Crypto Marketcap</h4>

                <p>${totalmarketcap?.toLocaleString('en-NZ')}</p>

                <h4>24 hour Trading Volume</h4>
                <p>${tradingVol?.toLocaleString('en-NZ')}</p>
              </div>
              <div className='trendingContainer'>
                <h4>Trending Coins</h4>

                {trendingCoin.data?.data?.coins.map(
                  (coin: TrendingCoins, index: number) => (
                    <Link to={`/coin/${coin.item.id}`} className='coinLinks'>
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
                {/* {trending?.map((coin, index) => (
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
                ))} */}
              </div>
            </section>
          </header>
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

          {coinData &&
            coinData?.map((coin: CoinData, index: number) => (
              <Link to={`/coin/${coin.id}`} className='coinLinks'>
                <div className='coins' key={index}>
                  <p className='coinRank'>{coin?.market_cap_rank}. </p>
                  <p className='coinTicker'>{coin.symbol}</p>
                  <img src={coin.image} alt={coin.name} className='coinImage' />
                  <p className='coinName'>{coin.name}</p>
                  <p className='coinPrice'>
                    ${coin?.current_price?.toLocaleString('en-NZ')}
                  </p>
                  <div className='flex priceChanges'>
                    {Number(
                      coin.price_change_percentage_1h_in_currency?.toFixed(1)
                    ) >= 0 ? (
                      <p
                        style={{ color: '#3cd656' }}
                        className='coinPercentageChange'
                      >
                        {coin.price_change_percentage_1h_in_currency?.toFixed(
                          1
                        )}
                        %
                      </p>
                    ) : (
                      <p
                        style={{ color: '#ff2b2b' }}
                        className='coinPercentageChange'
                      >
                        {coin.price_change_percentage_1h_in_currency?.toFixed(
                          1
                        )}
                        %
                      </p>
                    )}
                    {Number(
                      coin.price_change_percentage_24h_in_currency?.toFixed(1)
                    ) >= 0 ? (
                      <p
                        style={{ color: '#3cd656' }}
                        className='coinPercentageChange'
                      >
                        {coin.price_change_percentage_24h_in_currency?.toFixed(
                          1
                        )}
                        %
                      </p>
                    ) : (
                      <p
                        style={{ color: '#ff2b2b' }}
                        className='coinPercentageChange'
                      >
                        {coin.price_change_percentage_24h_in_currency?.toFixed(
                          1
                        )}
                        %
                      </p>
                    )}
                    {Number(
                      coin.price_change_percentage_7d_in_currency?.toFixed(1)
                    ) >= 0 ? (
                      <p
                        style={{ color: '#3cd656' }}
                        className='coinPercentageChange'
                      >
                        {coin.price_change_percentage_7d_in_currency?.toFixed(
                          1
                        )}
                        %
                      </p>
                    ) : (
                      <p
                        style={{ color: '#ff2b2b' }}
                        className='coinPercentageChange'
                      >
                        {coin.price_change_percentage_7d_in_currency?.toFixed(
                          1
                        )}
                        %
                      </p>
                    )}
                  </div>
                  <p className='coinMarketcap'>
                    ${coin?.market_cap?.toLocaleString('en-NZ')}
                  </p>
                  <p className='coinVolume'>
                    ${coin.total_volume?.toLocaleString('en-NZ')}
                  </p>
                </div>
              </Link>
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
