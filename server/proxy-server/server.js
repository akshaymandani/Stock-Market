// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint to fetch data from NSE India API
app.get('/api/nse', async (req, res) => {
  try {
    const response = await axios.get('https://www.nseindia.com/api/top-corp-info?symbol=NTPC&market=equities', {
        headers: {
            'Cookie': 'bm_sv=84E270BA16FA46D25286D3AAD0E70373~YAAQFv7UF2TSXJqRAQAAT4LDphgnoErm6xU58Fwmpon2u08FXgnjZoMdTY674F/GLwdGlxUxCnHx9esM/fdSgjnH9KZfMdgKpm4qg8HJRppjf9J5XBl54c0gBqCUmLbg6vBB7jwOEHzfRX3lU8dHSc7Mrzt8+i63apxw3q3oxe8xPUYU32FuVk0LS579/neFyCQnfuCcy9TxGfF2RXXwuc/XprDwiumB9bt+IN6WINSsEyEeZlcJLO7VpT9D5m4BpP+9~1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message); // Log detailed error
    res.status(500).send('Error fetching data');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
