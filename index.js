require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const coursesRoutes = require('./routes/courses');
const weatherRoutes = require('./routes/weather');
const elevationRoutes = require('./routes/elevation');
// Active CORS
app.use(cors());

// Permet de lire le JSON dans les requêtes
app.use(express.json());

// Continue ici...
// - Définir le PORT depuis process.env
// - Faire écouter le serveur sur ce PORT
app.use('/courses', coursesRoutes);
app.use('/weather', weatherRoutes);
app.use('/elevation', elevationRoutes);
const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
