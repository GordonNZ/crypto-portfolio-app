import React, { useState, useEffect } from 'react';
import './MarketChart.css';
import { Line } from 'react-chartjs-2';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'chart.js/auto';

type Props = {
  currency: string;
};

// interface ChartData {
//   labels: string;
//   datasets: {
//     label: string;
//     data: number[];
//     borderColor: string;
//     tension: number;
//   }[];
// }
// interface Scales {
//   x: {
//     type: string;
//   };
//   y: {
//     beginAtZero: boolean;
//   };
// }
// interface ChartOptions {
//   scales: Scales;
// }

const MarketChart: React.FC<Props> = ({ currency }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [days, setDays] = useState<number>(1);
  const [marketPrices, setMarketPrices] = useState<any[]>([]);
  const [marketTime, setMarketTime] = useState<any[]>([]);
  // const [formattedDate, setFormattedDate] = useState<any[]>([]);

  // get coin market chart
  const marketOptions = {
    method: 'GET',
    url: `https://coingecko.p.rapidapi.com/coins/${id}/market_chart`,
    params: {
      days: days,
      vs_currency: currency,
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
      'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
    },
  };
  const { data: market } = useQuery(
    ['market'],
    () => axios.request(marketOptions),
    { refetchInterval: 30000 }
  );
  //   console.log(market?.data);

  useEffect(() => {
    setMarketPrices(market?.data?.prices.map((price: any) => price[1]));
    setMarketTime(market?.data?.prices.map((price: any) => price[0]));
    console.log(marketPrices);

    // marketTime?.forEach((time: any) => {
    //   const date = new Date(time);
    //   // console.log('Date', date);
    //   setFormattedDate((formattedDate) => [...formattedDate, date]);
    // const formattedTime = date?.toLocaleTimeString();
    // const formattedDate = date?.toLocaleDateString();
    // console.log('Time', formattedTime);
    // console.log('Date', formattedDate);
    // });
  }, [market?.data?.prices]);
  // console.log('Formatted Date', marketTime);
  // const marketDate = new Date(marketTime[]);
  // const formattedTime = marketDate?.toLocaleTimeString();
  // const formattedDate = marketDate?.toLocaleDateString();

  // console.log('Time', formattedTime);
  // console.log('Date', formattedDate);

  const formattedTimes = marketTime?.map((timestamp) => {
    const date = new Date(timestamp);
    return `${date.toDateString()}, ${date.toLocaleTimeString()}`; // Convert timestamp to readable time
  });

  // Define the chart data
  const chartData: any = {
    labels: formattedTimes,
    datasets: [
      {
        label: 'Market Prices',
        data: marketPrices,
        tension: 0.1,
        borderColor: '#2fd64b',
        fill: true,
        backgroundColor: 'rgb(47, 214, 75,0.2)',
        borderJoinStyle: 'minter',
        // pointRadius: 2,
        pointStyle: false,
        borderWidth: 2,
        pointHitRadius: 3,
      },
    ],
  };
  const chartOptions: any = {
    scales: {
      x: {
        type: 'category',
        display: false,
        // ticks: {
        //   color: '#fff',
        //   callback: function (value: string) {
        //     return value;
        //   },
        // },
        grid: {
          color: 'rgb(255, 255, 255, 0.25)',
        },
      },
      y: {
        ticks: {
          color: '#fff',
          // Include a dollar sign in the ticks
          callback: function (value: number) {
            return '$' + value;
          },
        },
        grid: {
          color: 'rgb(255, 255, 255, 0.25)',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      <h2 className='price-chart-h2'>Price Chart</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default MarketChart;
