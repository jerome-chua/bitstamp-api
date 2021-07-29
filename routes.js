import axios from 'axios';

// Users' balances
const userBalances = {
  "user-1": {
    "BTC": "0.5",
    "ETH": "2"
  },
  "user-2": {
    "BTC": "0.1",
  },
  "user-3": {
    "ETH": "5",
  },
}

// Bitstamp API URL
const API = 'https://www.bitstamp.net/api/v2/ticker/';

const getCoinVal = async (currPair) => {
  try {
    const url = `${API}${currPair}`;
    const coinVal = await axios.get(url).then((res)=> res.data);

    return coinVal

  } catch (err) {
    console.log('Error when getting coin value:', err);
  }
}

export default function bindRoutes(app) {
  app.get('/', (req, res) => {
    res.send('testing')
  })

  const currPair = 'btcusd';
  axios.get(`${API}${currPair}`)
    .then((res) => {
      console.log("TICKER ====", res.data);
  })
}


