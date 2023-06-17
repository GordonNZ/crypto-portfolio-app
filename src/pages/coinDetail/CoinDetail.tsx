import React from 'react';
import { useParams } from 'react-router-dom';
import './CoinDetail.css';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';

// interface CoinInfo {}

const CoinDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Options for axios request to coingecko API for individual coin data
  const coinOptions = {
    method: 'GET',
    url: `https://coingecko.p.rapidapi.com/coins/${id}`,
    params: {
      sparkline: 'false',
      developer_data: 'true',
      community_data: 'true',
      market_data: 'true',
      tickers: 'true',
      localization: 'true',
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
      'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
    },
  };
  // React query hook to fetch coin data from coingecko API using axios
  const { data, isLoading, error } = useQuery(
    ['coin'],
    () => axios.request(coinOptions),
    { refetchInterval: 30000 }
  );
  const coinId = data?.data;
  console.log(coinId);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
  }

  return (
    <div>
      <Navbar />
      <h1>Crypto:</h1>
      <h1>Market Cap: {coinId.market_cap_rank}</h1>
      <h1>{coinId.name}</h1>
      <img src={coinId?.image?.large} alt={coinId?.name} className='coinImg' />
      <p className='desc'></p>
      {coinId?.description.en}
      <p>genesis: {coinId?.genesis_date}</p>
      <h2>Links:</h2>
      <a
        href={coinId?.links.blockchain_site[0]}
        target='_blank'
        rel='noreferrer'
      >
        {coinId?.links.blockchain_site[0]}
      </a>
      <br />
      {coinId?.links.chat_url[1] === '' ? null : (
        <a href={coinId?.links.chat_url[1]} target='_blank' rel='noreferrer'>
          Discord
        </a>
      )}
      <br />
      <a href={coinId?.links.homepage[0]} target='_blank' rel='noreferrer'>
        Website
      </a>
      <br />
      <a href={coinId?.links.subreddit_url} target='_blank' rel='noreferrer'>
        Subreddit
      </a>
      <br />
      <h2>Market data:</h2>
      <p>
        Current Price: $
        {coinId?.market_data.current_price.usd.toLocaleString('en-NZ')}
      </p>
      <p>
        24 price change:
        {coinId?.market_data.price_change_24h.toLocaleString('en-NZ')}
      </p>
      <p>
        Fully Diluted Value: $
        {coinId?.market_data.fully_diluted_valuation.usd.toLocaleString(
          'en-NZ'
        )}
      </p>
      <p>
        Market Cap: $
        {coinId?.market_data.market_cap.usd.toLocaleString('en-NZ')}
      </p>
      <p>
        Total Supply:
        {coinId?.market_data.total_supply.toLocaleString('en-NZ')}
      </p>
      <p>
        Total Volume: $
        {coinId?.market_data.total_volume.usd.toLocaleString('en-NZ')}
      </p>
    </div>
  );
};

export default CoinDetail;
