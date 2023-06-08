const express = require('express');
const router = express.Router();

// Importo los routers

const videoRouters = require('./videoRouters');

const genreRouter = require('./genreRouter');

const platformsRouter = require('./platformsRouter');


// Configuro todos los routers


router.use('/videogames', videoRouters);

router.use('/genres', genreRouter );

router.use('/platforms', platformsRouter);

// Handle requests to unknown routes


module.exports = router;
