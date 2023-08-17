import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface CoinPriceProps {
  coinName: string;
  currency: string;
  holding: number | null;
}

const FetchCoinPrice: React.FC<CoinPriceProps> = ({
  coinName,
  currency,
  holding = null,
}) => {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error('Error fetching coin price:', error);
    return 0;
  }

  const price =
    data?.data?.market_data?.current_price[currency.toLowerCase()] || 0;

  //returns price if holding is empty, or value if holding is provided
  const calculatedValue = holding === null ? price : price * holding;
  return calculatedValue.toLocaleString('en-NZ', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
  // return price;
};

export default FetchCoinPrice;
