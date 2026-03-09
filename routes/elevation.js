const express = require('express');
const router = express.Router();
const axios = require('axios');
const authMiddleware = require('../middleware/auth');

router.get('/',authMiddleware, async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const response = await axios.get('https://api.open-elevation.com/api/v1/lookup', {
          params: {
        locations: `${lat},${lon}`
    }
    });
    res.json({
        elevation: response.data.results[0].elevation
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'élévation' });
  }
});

module.exports = router;