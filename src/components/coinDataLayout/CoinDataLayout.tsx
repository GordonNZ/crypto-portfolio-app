import React from 'react';
import { Link } from 'react-router-dom';

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
type Props = {
  coin: CoinData;
  index: number;
  screenWidth: number;
};

const CoinDataLayout = ({ coin, index, screenWidth }: Props) => {
  // console.log(screenWidth);
  return (
    <Link to={`/coin/${coin.id}`} className='coinLinks'>
      {screenWidth >= 1024 ? (
        <div className='coins' key={index}>
          <p className='coinRank'>{coin?.market_cap_rank}. </p>
          <p className='coinTicker'>{coin.symbol}</p>
          <div className='coinImageNameContainer'>
            <img src={coin.image} alt={coin.name} className='coinImage' />
            <p className='coinName'>{coin.name}</p>
          </div>
          <p className='coinPrice'>
            ${coin?.current_price?.toLocaleString('en-NZ')}
          </p>
          <div className='flex priceChanges'>
            {Number(coin.price_change_percentage_1h_in_currency?.toFixed(1)) >=
            0 ? (
              <p style={{ color: '#3cd656' }} className='coinPercentageChange'>
                {coin.price_change_percentage_1h_in_currency?.toFixed(1)}%
              </p>
            ) : (
              <p style={{ color: '#ff2b2b' }} className='coinPercentageChange'>
                {coin?.price_change_percentage_1h_in_currency?.toFixed(1)}%
              </p>
            )}
            {Number(coin.price_change_percentage_24h_in_currency?.toFixed(1)) >=
            0 ? (
              <p style={{ color: '#3cd656' }} className='coinPercentageChange'>
                {coin.price_change_percentage_24h_in_currency?.toFixed(1)}%
              </p>
            ) : (
              <p style={{ color: '#ff2b2b' }} className='coinPercentageChange'>
                {coin.price_change_percentage_24h_in_currency?.toFixed(2)}%
              </p>
            )}
            {Number(coin.price_change_percentage_7d_in_currency?.toFixed(2)) >=
            0 ? (
              <p style={{ color: '#3cd656' }} className='coinPercentageChange'>
                {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
              </p>
            ) : (
              <p style={{ color: '#ff2b2b' }} className='coinPercentageChange'>
                {coin.price_change_percentage_7d_in_currency?.toFixed(1)}%
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
      ) : (
        <div className='coins small' key={index}>
          <p className='coinRank'>{coin?.market_cap_rank}. </p>
          <div className='coinImageTicker flex'>
            <img src={coin.image} alt={coin.name} className='coinImage' />
            <p className=''>{coin.symbol}</p>
          </div>
          <p className='coinPrice'>
            ${coin?.current_price?.toLocaleString('en-NZ')}
          </p>
          <div className='flex priceChanges'>
            {Number(coin.price_change_percentage_24h_in_currency?.toFixed(1)) >=
            0 ? (
              <p style={{ color: '#3cd656' }} className='coinPercentageChange'>
                {coin.price_change_percentage_24h_in_currency?.toFixed(1)}%
              </p>
            ) : (
              <p style={{ color: '#ff2b2b' }} className='coinPercentageChange'>
                {coin.price_change_percentage_24h_in_currency?.toFixed(2)}%
              </p>
            )}
          </div>
          <p className='coinMarketcap'>
            ${coin?.market_cap?.toLocaleString('en-NZ')}
          </p>
        </div>
      )}
    </Link>
  );
};

export default CoinDataLayout;
