import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface CoinPriceProps {
  coinName: string;
  currency: string;
}

const FetchCoinData: React.FC<CoinPriceProps> = ({ coinName, currency }) => {
  const options = {
    method: 'GET',
    url: `https://coingecko.p.rapidapi.com/coins/${coinName.toLowerCase()}`,
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

  const { data, isLoading, error } = useQuery(['coinportfolio', coinName], () =>
    axios.request(options)
  );

  const price =
    data?.data?.market_data?.current_price[currency.toLowerCase()] || 0;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error('Error fetching coin price:', error);
    return 0;
  }

  return price;
};

export default FetchCoinData;
