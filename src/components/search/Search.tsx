import React, { useState } from 'react';
import './Search.css';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

type Props = {
  currency: string;
};

const Search: React.FC<Props> = ({ currency }: Props) => {
  const [searchInput, setSearchInput] = useState<string>('');

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  // Options for axios request to coingecko API for individual coin data
  const coinOptions = {
    method: 'GET',
    url: `https://coingecko.p.rapidapi.com/coins/${searchInput.toLowerCase()}`,
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

  const handleClick = () => {
    if (searchInput === '') {
      return;
    } else {
      // manually refetch
      refetch();
    }
  };

  // React query hook to fetch coin data from coingecko API using axios
  const { data, isLoading, error, refetch } = useQuery(
    ['coin'],
    () => axios.request(coinOptions),
    {
      refetchOnWindowFocus: false,
      enabled: false, // disable this query from automatically running
    }
  );
  const coinId = data?.data;
  console.log(coinId);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    console.error(error);
  }

  return (
    <div className='search'>
      <input
        type='text'
        placeholder='Search'
        onChange={handleSearchInput}
        value={searchInput}
        className='searchInput'
      />
      <button onClick={handleClick} className='searchBtn'>
        Search
      </button>
      <div>
        {coinId ? (
          <div className='coinInfo'>
            <img
              src={coinId?.image?.large}
              alt={coinId?.name}
              className='coinImg'
            />
            <h3 className='coinName'>{coinId?.name}</h3>
            <h3 className='coinSymbol'>{coinId?.symbol.toUpperCase()}</h3>
            <h3 className='coinPrice'>
              $
              {coinId?.market_data?.current_price[
                currency.toLowerCase()
              ].toFixed(2)}
            </h3>
            <h3 className='coinRank'>Rank: {coinId?.market_cap_rank}</h3>
          </div>
        ) : (
          <div className='coinInfo'>
            <h3 className='coinName'>Search for a coin</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
