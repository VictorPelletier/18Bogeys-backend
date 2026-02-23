const express = require('express');
const router = express.Router();
const axios = require('axios');
const authMiddleware = require('../middleware/auth');


router.get('/search', authMiddleware, async (req, res) => {
  try{
    const searchQuery = req.query.searchQuery;
    const response = await axios.get('https://api.golfcourseapi.com/v1/search',{
        params: {
            search_query: searchQuery
        },
        headers:{
            'Authorization': `Key ${process.env.GOLF_API_KEY}`
        }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la recherche du parcours' });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try{
    const courseId = req.params.id;
    const response = await axios.get(`https://api.golfcourseapi.com/v1/courses/${courseId}`,{
        headers:{
            'Authorization': `Key ${process.env.GOLF_API_KEY}`
        }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du parcours' });
  }
});

module.exports = router;