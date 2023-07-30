// options for the API

export const globalOptions = {
  method: 'GET',
  url: 'https://coingecko.p.rapidapi.com/global',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
    'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
  },
};

export const coinList = {
  method: 'GET',
  url: 'https://coingecko.p.rapidapi.com/coins/list',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
    'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
  },
};
