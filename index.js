import axios from 'axios';
import express from 'express';
const app = express()
const API = 'https://www.bitstamp.net/api/v2/ticker/';

app.use(express.json());

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

app.get('/', (req, res) => {
  res.send('testing')
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})

