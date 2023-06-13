import React from 'react';
import { useParams } from 'react-router-dom';
import './CoinDetail.css';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';

interface CoinInfo {
  id: string;
  symbol: string;
  name: string;
  image: string;
}

const CoinDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

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

  const { data, isLoading, error } = useQuery(['coin'], () =>
    axios.request(coinOptions)
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
      <p className='desc'>{coinId?.description.en}</p>
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
    </div>
  );
};

export default CoinDetail;
