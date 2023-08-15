import React, { useState } from 'react';
import './Search.css';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { db, auth } from './../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

type Props = {
  currency: string;
  getPortfolio: () => void;
  onClose: () => void;
};

const Search: React.FC<Props> = ({
  currency,
  getPortfolio,
  onClose,
}: Props) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [val, setVal] = useState<number>(0);

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

  const portfolioRef = collection(db, 'portfolio');

  //adding coin to firebase database portfolio
  const onSubmitAdd = async () => {
    if (val === 0) {
      alert('Please enter a valid number');
    } else {
      try {
        await addDoc(portfolioRef, {
          coin: coinId.id,
          holding: val,
          userId: auth?.currentUser?.uid,
        });
        getPortfolio();
        setSearchInput('');
        setVal(0);
        onClose();
      } catch (err) {
        console.log(`caught an error: ${err}}`);
      }
    }
  };

  return (
    <div className='search'>
      <input
        list='cryptocurrencies'
        type='text'
        placeholder='Search'
        onChange={(e) => setSearchInput(e.target.value)}
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
            <button className='search-addBtn' onClick={onSubmitAdd}>
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
