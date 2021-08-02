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

export const queryApi = async (url) => {
  const ticker = await axios.get(url).
    then((res)=> {
      return res.data
    }).
    catch((err) => {
      console.log("ERR", err)
    });

  return ticker
}

export const calcCoinVal = async (cryptoCurr) => {
  const USD = 'usd'
  const url = `${API}${cryptoCurr.toLowerCase()}${USD}`;

  try {
    const coinVal = await queryApi(url);

    // Return last crypto pricing
    return Number(coinVal.last)

  } catch (err) {
    console.log('Error when getting coin value:', err);
  }
}

export const getUserCoins = (userId) => {
    if (userBalances.hasOwnProperty(userId)) {
      return userBalances[userId];
  } else {
    return null;
  }
}

export default function bindRoutes(app) {
  app.get('/', (req, res) => {
    res.render('home')
  });

  app.get('/users', async (req, res) => {
    const { userId } = req.query;

    try {
      let userCoins = await getUserCoins(userId);
      let coinNames = Object.keys(userCoins);

      if (!userCoins) {
        throw new Error(404);
      }
    
      let walletBalance = 0;
      for (let i=0; i< coinNames.length; i+=1) { 
        const coin = coinNames[i];
        const lastCoinPrice = await calcCoinVal(coin);
        
        walletBalance += (lastCoinPrice * userCoins[coin])
      }
      // Format to 2 fixed decimals with comma
      walletBalance = walletBalance.toLocaleString(undefined, {minimumFractionDigits: 2});

      res.render('wallet', { userId, walletBalance });
    } catch (err) {
      res.status(404).send("USER DOES NOT EXIST");
      console.log(err);
    } 
  });


  // Test
  const currPair = 'btcusd';
  axios.get(`${API}${currPair}`)
    .then((res) => {
      console.log("TICKER ====", res.data);
  });
}


