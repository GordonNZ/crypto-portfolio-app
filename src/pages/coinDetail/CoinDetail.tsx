import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './CoinDetail.css';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import MarketChart from '../../components/marketChart/MarketChart';

// interface CoinInfo {}
interface Props {
  currency: string;
}

const CoinDetail: React.FC<Props> = ({ currency }: Props) => {
  // Get coin id from url params
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
  // console.log(coinId);
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    console.error(error);
  }

  return (
    <div className='home'>
      <div className='coinPage'>
        <Link to='/'>
          <button className='backButton'>Back</button>
        </Link>
        <h3 className='marketCap'>Market Cap: #{coinId.market_cap_rank}</h3>
        <div className='flex title'>
          <img
            src={coinId?.image?.large}
            alt={coinId?.name}
            className='coinImg'
          />
          <h1 className='coinName'>{coinId.name}</h1>
        </div>

        <div className='flex link-desc'>
          <p className='desc'>{coinId?.description.en}</p>
          {/* <p>genesis: {coinId?.genesis_date}</p> */}
          <div className='links'>
            <h2>Links:</h2>
            <a
              href={coinId?.links.blockchain_site[0]}
              target='_blank'
              rel='noreferrer'
            >
              {coinId?.name} Explorer
            </a>
            <br />
            <a
              href={coinId?.links.homepage[0]}
              target='_blank'
              rel='noreferrer'
            >
              Website
            </a>
            <br />
            {coinId?.links.chat_url[1] === '' ? null : (
              <a
                href={coinId?.links.chat_url[1]}
                target='_blank'
                rel='noreferrer'
              >
                Discord
              </a>
            )}

            <br />
            <a
              href={coinId?.links.subreddit_url}
              target='_blank'
              rel='noreferrer'
            >
              Subreddit
            </a>
          </div>
        </div>

        <div className='flex data-chart'>
          <div className='marketData'>
            <h2>Market Data:</h2>
            <div className='dataContainer'>
              <p>{coinId.name} Price:</p>
              <p>
                ${coinId?.market_data.current_price[currency.toLowerCase()]}
              </p>
            </div>
            <div className='dataContainer'>
              <p>24h Price Change:</p>
              <p>${coinId?.market_data.price_change_24h}</p>
            </div>
            <div className='dataContainer'>
              <p>Fully Diluted Value:</p>
              <p>
                $
                {coinId?.market_data.fully_diluted_valuation[
                  currency.toLowerCase()
                ].toLocaleString('en-NZ')}
              </p>
            </div>
            <div className='dataContainer'>
              <p>Market Cap:</p>
              <p>
                $
                {coinId?.market_data.market_cap[
                  currency.toLowerCase()
                ].toLocaleString('en-NZ')}
              </p>
            </div>
            <div className='dataContainer'>
              <p>Total Supply:</p>
              <p>{coinId?.market_data.total_supply.toLocaleString('en-NZ')}</p>
            </div>
            <div className='dataContainer'>
              <p>Total Volume:</p>
              <p>
                $
                {coinId?.market_data.total_volume[
                  currency.toLowerCase()
                ].toLocaleString('en-NZ')}
              </p>
            </div>
          </div>
          <div className='coinChart'>
            <MarketChart currency={currency} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetail;
