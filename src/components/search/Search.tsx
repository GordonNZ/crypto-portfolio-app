import React, { useState } from 'react';
import './Search.css';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

type Props = {
  currency: string;
  portfolio: {
    id: number;
    name: string;
    symbol: string;
    image: string;
    price: number;
    price_change_percentage_24h: number;
    holding: number;
  }[];
};

const Search: React.FC<Props> = ({ currency, portfolio }: Props) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [val, setVal] = useState<number>(0);
  // console.log(val);

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

  // const coinList = {
  //   method: 'GET',
  //   url: 'https://coingecko.p.rapidapi.com/coins/list',
  //   headers: {
  //     'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
  //     'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
  //   },
  // };

  // options for the API
  const coinList = {
    method: 'GET',
    url: 'https://coingecko.p.rapidapi.com/coins/markets',
    params: {
      vs_currency: currency,
      order: 'market_cap_desc',
      per_page: '250',
      page: '1',
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
      'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
    },
  };

  const handleClick = () => {
    if (searchInput.length < 1) {
      return;
    } else {
      // manually refetch
      refetch();
      console.log('fetched');
      setSearchInput('');
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

  // React query hook to fetch coin list from coingecko API using axios for datalist
  const coinListData = useQuery(['coinList'], () => axios.request(coinList));
  const totalCoins = coinListData?.data?.data;
  // console.log(totalCoins);

  // validatiing input and adding coin to portfolio
  const handleAdd = () => {
    const validNumberRegex = /^\d+(\.\d+)?$/;
    if (val === 0) {
      alert('Please enter a valid number');
    } else if (!validNumberRegex.test(val.toString())) {
      alert('Entered value is not a number');
      setVal(0);
    } else {
      console.log('added');
      console.log(val, coinId.id);
      portfolio.push({
        id: coinId.id,
        name: coinId.name,
        symbol: coinId.symbol,
        image: coinId.image.large,
        price: coinId.market_data.current_price[currency.toLowerCase()],
        price_change_percentage_24h:
          coinId.market_data.price_change_percentage_24h,
        holding: val,
      });
      //setVal(0);}
      console.log(portfolio);
    }
  };

  return (
    <div className='search'>
      <input
        list='cryptocurrencies'
        type='text'
        placeholder='Search'
        onChange={handleSearchInput}
        value={searchInput}
        className='searchInput'
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleClick();
          }
        }}
      />
      <datalist id='cryptocurrencies'>
        {totalCoins?.map((coin: any) => (
          <option key={coin.id} value={coin.id}>
            {coin.name}
          </option>
        ))}
      </datalist>
      <button onClick={handleClick} className='searchBtn'>
        Search
      </button>
      <div>
        {coinId ? (
          <div>
            <div className='search-coinInfo'>
              <img
                src={coinId?.image?.large}
                alt={coinId?.name}
                className='coinImg'
              />
              <p className='search-coinName'>{coinId?.name}</p>
              <p className='search-coinSymbol'>
                {coinId?.symbol.toUpperCase()}
              </p>
              <p className='search-coinPrice'>
                $
                {coinId?.market_data?.current_price[
                  currency.toLowerCase()
                ].toFixed(2)}
              </p>
              <p className='search-coinRank'>#{coinId?.market_cap_rank}</p>
            </div>
            <div className='search-coinAmountContainer'>
              <input
                type='number'
                inputMode='numeric'
                placeholder='Amount'
                className='search-amountInput'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const sanitizedValue = e.target.value.replace(/[^0-9.]/g, '');
                  setVal(parseFloat(sanitizedValue));
                }}
              />
            </div>
            <button className='search-addBtn' onClick={handleAdd}>
              Add
            </button>
          </div>
        ) : (
          <div className='search-coinInfo'></div>
        )}
      </div>
    </div>
  );
};

export default Search;
