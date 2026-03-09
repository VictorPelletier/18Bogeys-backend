const express = require('express');
const router = express.Router();
const axios = require('axios');
const authMiddleware = require('../middleware/auth');

router.get('/',authMiddleware, async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            lat,
            lon,
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric'
        }
    });
    res.json({
        speed: response.data.wind.speed,
        deg:response.data.wind.deg,
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la météo' });
  }
});

module.exports = router;